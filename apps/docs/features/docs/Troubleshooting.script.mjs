// @ts-check

/* eslint-disable turbo/no-undeclared-env-vars */

/**
 * Sync new troubleshooting entries from the GitHub repo with GitHub
 * Discussions.
 */

import { createClient } from '@supabase/supabase-js'
import { createHash } from 'crypto'
import matter from 'gray-matter'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { gfmFromMarkdown, gfmToMarkdown } from 'mdast-util-gfm'
import { mdxFromMarkdown, mdxToMarkdown } from 'mdast-util-mdx'
import { toMarkdown } from 'mdast-util-to-markdown'
import { gfm } from 'micromark-extension-gfm'
import { mdxjs } from 'micromark-extension-mdxjs'
import { readFile, writeFile } from 'node:fs/promises'
import { stringify } from 'smol-toml'
import toml from 'toml'

import {
  getAllTroubleshootingEntriesInternal as getAllTroubleshootingEntries,
  getArticleSlug,
} from './Troubleshooting.utils.common.mjs'

import 'dotenv/config'

/**
 * @typedef {import('./Troubleshooting.utils.common.mjs').TroubleshootingEntry} TroubleshootingEntry
 * @typedef {import('./Troubleshooting.utils.common.mjs').TroubleshootingMetadata} TroubleshootingMetadata
 */

/**
 * @type {import('@supabase/supabase-js').SupabaseClient<import('../../../../packages/common').Database>}
 */
let supabaseAdminClient

export function supabaseAdmin() {
  if (!supabaseAdminClient) {
    supabaseAdminClient = createClient(
      /** @type {string} */ (process.env.NEXT_PUBLIC_TEALBASE_URL),
      /** @type {string} */ (process.env.TEALBASE_SECRET_KEY)
    )
  }

  return supabaseAdminClient
}

async function syncTroubleshootingEntries() {
  console.log('[START] Syncing troubleshooting entries to GitHub')

  const [troubleshootingEntries, discussions] = await Promise.all([
    getAllTroubleshootingEntries(),
    getAllTroubleshootingDiscussions(),
  ])

  console.log(`[INFO] Found ${troubleshootingEntries.length} existing entries`)

  const tasks = troubleshootingEntries.map(async (entry) => {
    const databaseId = entry.data.database_id
    if (databaseId.startsWith('pseudo-')) {
      // The database entry is faked, so we may need to create a new one.
      // There's also an edge case we need to check for: the entry has already
      // been created, but the new database ID hasn't been written to the file
      // yet.
      if (await entryExists(entry)) return

      const discussion = entry.data.github_url
        ? await getGithubIdForDiscussion(discussions, entry)
        : await createGithubDiscussion(entry)

      let id
      try {
        id = await insertNewTroubleshootingEntry(entry, discussion)
      } catch (error) {
        console.error(`[ERROR] Failed to insert new entry for ${entry.data.title}: %O`, error)
        console.log(
          `[INFO] Rolling back discussion creation for ${entry.data.title} (GitHub ID ${discussion.id})`
        )
        await rollbackGithubDiscussion(discussion.id)
        throw error
      }

      await updateFileId(entry, id)
    } else {
      // The database entry already exists, so check for updates.
      const contentHasChanged = await updateChecksumIfNeeded(entry)
      if (contentHasChanged) {
        await updateGithubDiscussion(entry)
      }
    }
  })

  const results = await Promise.allSettled(tasks)
  let hasErrors = false
  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(
        `[ERROR] Failed to insert and/or update for ${troubleshootingEntries[index].filePath}:\n%O`,
        result.reason?.errors ?? result.reason
      )
      hasErrors = true
    }
  })

  return hasErrors
}

/**
 * @param {TroubleshootingEntry} entry
 * @throws If the database check fails for some unknown reason
 */
async function entryExists(entry) {
  const checksum = calculateChecksum(entry.content)
  const { error } = await supabaseAdmin()
    .from('troubleshooting_entries')
    .select('id')
    .eq('checksum', checksum)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // No entry found
      return false
    }
    throw error
  }

  console.log(
    `[INFO] Entry for ${entry.data.title} already exists. Not creating a new one to prevent duplicates.`
  )
  return true
}

/**
 * @param {string} content
 */
function calculateChecksum(content) {
  // Normalize to ignore changes that don't affect the final displayed content.
  const mdast = fromMarkdown(content, {
    extensions: [gfm(), mdxjs()],
    mdastExtensions: [gfmFromMarkdown(), mdxFromMarkdown()],
  })
  const bodyNormalized = toMarkdown(mdast, { extensions: [gfmToMarkdown(), mdxToMarkdown()] })

  const { data, content: body } = matter(bodyNormalized, {
    language: 'toml',
    engines: { toml: toml.parse.bind(toml) },
  })
  const newFrontmatter = stringify(data)
  const normalized = `---\n${newFrontmatter}\n---\n${body}`

  return createHash('sha256').update(normalized).digest('base64')
}

/**
 * @param {TroubleshootingEntry} entry
 *
 * @param {Object} discussion
 * @param {string} discussion.id
 * @param {string} discussion.url
 *
 * @throws If the database insertion fails
 */
async function insertNewTroubleshootingEntry(entry, discussion) {
  console.log(`[INFO] Inserting entry for ${entry.data.title} into DB`)

  const now = new Date().toISOString()
  const checksum = calculateChecksum(entry.content)

  const { data, error } = await supabaseAdmin()
    .from('troubleshooting_entries')
    .insert({
      api: entry.data.api,
      checksum,
      date_created: entry.data.date_created?.toISOString() ?? now,
      date_updated: now,
      errors: entry.data.errors,
      github_id: discussion.id,
      github_url: discussion.url,
      keywords: entry.data.keywords,
      title: entry.data.title,
      topics: entry.data.topics,
    })
    .select('id')
    .single()
  if (error) {
    throw error
  }

  return data.id
}

/**
 * @param {TroubleshootingEntry} entry
 *
 * @throws If the database update fails
 */
async function updateChecksumIfNeeded(entry) {
  const { data, error } = await supabaseAdmin()
    .from('troubleshooting_entries')
    .select('checksum')
    .eq('id', entry.data.database_id)
    .single()
  if (error) {
    throw error
  }

  const newChecksum = calculateChecksum(entry.content)
  if (data.checksum !== newChecksum) {
    console.log(`[INFO] Content changed for ${entry.data.title}. Updating checksum.`)

    const now = new Date().toISOString()
    const { error } = await supabaseAdmin()
      .from('troubleshooting_entries')
      .update({
        checksum: newChecksum,
        date_updated: now,
      })
      .eq('id', entry.data.database_id)

    if (error) {
      throw error
    }

    return true
  }

  return false
}

/**
 * @param {TroubleshootingEntry} entry
 */
function addCanonicalUrl(entry) {
  const docsUrl = 'https://tealbase.com/docs/guides/troubleshooting/' + getArticleSlug(entry)
  const content =
    `_This is a copy of a troubleshooting article on Supabase's docs site. It may be missing some details from the original. View the [original article](${docsUrl})._\n\n` +
    entry.contentWithoutJsx
  return content
}

/**
 * @param {TroubleshootingEntry} entry
 */
async function createGithubDiscussion(entry) {
  console.log(`[MOCK] Creating GitHub discussion for ${entry.data.title}`)
  // Hardcoded data instead of API call
  const discussion = {
    id: `fake_discussion_id_${Date.now()}`,
    url: `https://github.com/tealbase/tealbase/discussions/fake-${Math.floor(
      Math.random() * 10000
    )}`,
  }
  console.log(`[MOCK] Created mock GitHub discussion for ${entry.data.title}: %s`, discussion.url)
  return Promise.resolve(discussion)
}

/**
 * @returns {Promise<{id: string, url: string}[]>}
 */
async function getAllTroubleshootingDiscussions() {
  console.log('[MOCK] Fetching all troubleshooting discussions from hardcoded data.')
  // Hardcoded data instead of API call
  const discussions = [
    {
      id: 'D_kwDODMpXOc4CUvErHardcoded1',
      url: 'https://github.com/tealbase/tealbase/discussions/12345',
    },
    {
      id: 'D_kwDODMpXOc4CUvErHardcoded2',
      url: 'https://github.com/tealbase/tealbase/discussions/67890',
    },
    // This specific entry can be matched by getGithubIdForDiscussion for testing purposes
    {
      id: 'D_kwDODMpXOc4CUvErHardcoded3',
      url: 'https://github.com/tealbase/tealbase/discussions/existing-entry-1',
    },
  ]
  return Promise.resolve(discussions)
}

/**
 * @param {{id: string, url: string}[]} discussions
 * @param {TroubleshootingEntry} entry
 *
 * @throws If matching discussion not found
 */
async function getGithubIdForDiscussion(discussions, entry) {
  const matchingDiscussion = discussions.find(
    (discussion) => discussion.url === entry.data.github_url
  )
  if (!matchingDiscussion) {
    throw new Error(`No matching discussion found for URL: ${entry.data.github_url}`)
  }
  return matchingDiscussion
}

/**
 * @param {TroubleshootingEntry} entry
 *
 * @throws If stored discussion ID for entry not found
 */
async function updateGithubDiscussion(entry) {
  console.log(`[INFO] Updating discussion content for ${entry.data.title}`)

  const { data, error } = await supabaseAdmin()
    .from('troubleshooting_entries')
    .select('github_id')
    .eq('id', entry.data.database_id)
    .single()
  if (error) {
    throw error
  }

  console.log(
    `[MOCK] Simulated an update for GitHub discussion ${data.github_id} for "${entry.data.title}". No API call was made.`
  )
  return Promise.resolve()
}

/** @param {string} id */
async function rollbackGithubDiscussion(id) {
  console.log(`[MOCK] Rolled back mock discussion creation for ${id}. No API call was made.`)
  return Promise.resolve()
}

/**
 * @param {TroubleshootingEntry} entry
 * @param {string} id
 *
 * @throws Passes through readFile and writeFile errors without catching
 */
async function updateFileId(entry, id) {
  console.log(`[INFO] Writing database ID to file for ${entry.filePath}`)

  const fileContents = await readFile(entry.filePath, 'utf-8')
  const { data, content } = matter(fileContents, {
    language: 'toml',
    engines: { toml: toml.parse.bind(toml) },
  })
  data.database_id = id

  const newFrontmatter = stringify(data)
  const newContent = `---\n${newFrontmatter}\n---\n${content}`

  await writeFile(entry.filePath, newContent)
}

async function main() {
  try {
    const hasErrors = await syncTroubleshootingEntries()
    if (hasErrors) {
      process.exit(1)
    }
  } catch (error) {
    console.error(`[ERROR] %O`, error)
    process.exit(1)
  }
}

main()
