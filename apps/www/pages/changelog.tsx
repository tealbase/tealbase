import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/outline'
import { createAppAuth } from '@octokit/auth-app'
import { Octokit } from '@octokit/core'
import { paginateGraphql } from '@octokit/plugin-paginate-graphql'
import { Octokit as OctokitRest } from '@octokit/rest'
import dayjs from 'dayjs'
import { GitCommit } from 'lucide-react'
import { GetServerSideProps } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import CTABanner from '~/components/CTABanner'
import DefaultLayout from '~/components/Layouts/Default'
import { deletedDiscussions } from '~/lib/changelog.utils'
import mdxComponents from '~/lib/mdx/mdxComponents'
import { mdxSerialize } from '~/lib/mdx/mdxSerialize'

// --- MOCK DATA ---
const hardcodedDiscussions = [
  {
    id: 'D_kwDODMpXOc4CAFUr',
    createdAt: '2025-09-10T10:00:00Z',
    url: 'https://github.com/tealbase/tealbase/discussions/1',
    title: 'Announcing TealBase Edge Functions v2',
    body: '## Major Performance Improvements\n\nWe are excited to release the latest version of our Edge Functions with significant performance upgrades and new features.',
  },
  {
    id: 'D_kwDODMpXOc4CAFUs',
    createdAt: '2025-08-25T14:30:00Z',
    url: 'https://github.com/tealbase/tealbase/discussions/2',
    title: 'New Storage v3 with Resumable Uploads',
    body: '### Resumable Uploads are Here!\n\nYou can now resume large file uploads without starting over. This has been a highly requested feature.',
  },
]

const hardcodedReleases = [
  {
    id: 40981345,
    created_at: '2021-08-15T18:00:00Z',
    name: 'August 2021 Release',
    html_url: 'https://github.com/tealbase/tealbase/releases/tag/v0.1',
    body: 'This is a legacy release note from our early days. We introduced the first version of the Table Editor.',
  },
]

const mockPageInfo = {
  hasPreviousPage: false,
  hasNextPage: true,
  startCursor: 'Y3Vyc29yOjE=',
  endCursor: 'Y3Vyc29yOjI=',
}
// --- END MOCK DATA ---

export type Discussion = {
  id: string
  updatedAt: string
  url: string
  title: string
  body: string
}

type Entry = {
  id: string
  title: string
  url: string
  created_at: string
  source: MDXRemoteSerializeResult
  type: string
}

export type DiscussionsResponse = {
  repository: {
    discussions: {
      totalCount: number
      nodes: Discussion[]
      pageInfo: any
    }
  }
}

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {
  // refresh every 15 minutes
  res.setHeader('Cache-Control', 'public, max-age=900, stale-while-revalidate=900')

  // --- FUNCTIONS PRESERVED BUT NOT CALLED ---
  async function fetchGitHubReleases(restPage: number) {
    const octokitRest = new OctokitRest({
      auth: process.env.GITHUB_CHANGELOG_APP_REST_KEY,
    })
    try {
      const response = await octokitRest.repos.listReleases({
        owner: 'tealbase',
        repo: 'tealbase',
        per_page: 10,
        page: restPage,
      })
      return response.data || []
    } catch (error) {
      console.error(error)
      return []
    }
  }

  async function fetchDiscussions(owner: string, repo: string, categoryId: string, cursor: string) {
    const ExtendedOctokit = Octokit.plugin(paginateGraphql)
    const octokit = new ExtendedOctokit({
      authStrategy: createAppAuth,
      auth: {
        appId: process.env.GITHUB_CHANGELOG_APP_ID,
        installationId: process.env.GITHUB_CHANGELOG_APP_INSTALLATION_ID,
        privateKey: process.env.GITHUB_CHANGELOG_APP_PRIVATE_KEY,
      },
    })
    const queryTxt = `...` // GraphQL query text
    const queryVars = { owner, repo, categoryId, cursor }
    const {
      repository: {
        discussions: { nodes: discussions, pageInfo },
      },
    } = await octokit.graphql<DiscussionsResponse>(queryTxt, queryVars)
    return { discussions, pageInfo }
  }
  // --- END OF PRESERVED FUNCTIONS ---

  // --- API CALLS BYPASSED WITH HARDCODED DATA ---
  const { discussions, pageInfo } = { discussions: hardcodedDiscussions, pageInfo: mockPageInfo }
  const releases = hardcodedReleases
  // const releases = await fetchGitHubReleases(restPage); // Original call
  // const { discussions, pageInfo } = await fetchDiscussions(...) // Original call
  // --- END OF BYPASS ---

  // Process discussions
  const formattedDiscussions = await Promise.all(
    discussions.map(async (item: any): Promise<any> => {
      try {
        const discussionsMdxSource: MDXRemoteSerializeResult = await mdxSerialize(item.body)
        return {
          ...item,
          source: discussionsMdxSource,
          type: 'discussion',
          created_at: item.createdAt, // Note: field name difference
          url: item.url,
        }
      } catch (err) {
        console.error(`Problem processing discussion MDX: ${err}`)
      }
    })
  )

  // Process releases
  const formattedReleases = await Promise.all(
    releases.map(async (item: any): Promise<any> => {
      try {
        const releasesMdxSource: MDXRemoteSerializeResult = await mdxSerialize(item.body)
        return {
          ...item,
          source: releasesMdxSource,
          type: 'release',
          created_at: item.created_at,
          title: item.name ?? '',
          url: item.html_url ?? '',
        }
      } catch (err) {
        console.error(`Problem processing release MDX: ${err}`)
      }
    })
  )

  // Combine discussions and releases into a single array of entries
  const combinedEntries = formattedDiscussions.concat(formattedReleases).filter(Boolean)

  const sortedCombinedEntries = combinedEntries.sort((a, b) => {
    const dateA = dayjs(a.created_at)
    const dateB = dayjs(b.created_at)
    return dateB.diff(dateA)
  })

  return {
    props: {
      changelog: sortedCombinedEntries,
      pageInfo: pageInfo,
      restPage: 2, // Mocking the page number
    },
  }
}

interface ChangelogPageProps {
  changelog: Entry[]
  pageInfo: any
  restPage: number
}

function ChangelogPage({ changelog, pageInfo, restPage }: ChangelogPageProps) {
  const { endCursor: end, hasNextPage, hasPreviousPage } = pageInfo

  const TITLE = 'Changelog'
  const DESCRIPTION = 'New updates and improvements to TealBase'
  return (
    <>
      <NextSeo
        title={TITLE}
        openGraph={{
          title: TITLE,
          description: DESCRIPTION,
          url: `https://tealbase.com/changelog`,
          type: 'article',
        }}
      />
      <DefaultLayout>
        <div
          className="
            container mx-auto flex flex-col
            gap-20
            px-4 py-10 sm:px-16
            xl:px-20
          "
        >
          <div className="py-10">
            <h1 className="h1">Changelog</h1>
            <p className="text-foreground-lighter text-lg">New updates and product improvements</p>
          </div>

          {/* Content */}
          <div className="grid gap-12 lg:gap-36">
            {changelog.length > 0 &&
              changelog
                .filter((entry: Entry) => !entry.title.includes('[d]'))
                .map((entry: Entry, i: number) => {
                  return (
                    <div key={i} className="border-muted grid border-l lg:grid-cols-12 lg:gap-8">
                      <div
                        className="col-span-12 mb-8 self-start lg:sticky lg:top-0 lg:col-span-4 lg:-mt-32 lg:pt-32
                "
                      >
                        <div className="flex w-full items-baseline gap-6">
                          <div className="bg-border border-muted text-foreground-lighter -ml-2.5 flex h-5 w-5 items-center justify-center rounded border drop-shadow-sm">
                            <GitCommit size={14} strokeWidth={1.5} />
                          </div>
                          <div className="flex w-full flex-col gap-1">
                            {entry.title && (
                              <Link href={entry.url}>
                                <h3 className="text-foreground text-2xl">{entry.title}</h3>{' '}
                              </Link>
                            )}
                            <p className="text-muted text-lg">
                              {dayjs(entry.created_at).format('MMM D, YYYY')}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-8 ml-8 lg:ml-0 max-w-[calc(100vw-80px)]">
                        <article className="prose prose-docs max-w-none">
                          <MDXRemote {...entry.source} components={mdxComponents('blog')} />
                        </article>
                      </div>
                    </div>
                  )
                })}
          </div>
          <div className="my-8 flex items-center gap-4">
            {hasPreviousPage && (
              <Link href={`/changelog`} className="flex items-center gap-2">
                <ArrowLeftIcon width={14} /> Previous
              </Link>
            )}
            {hasNextPage && (
              <Link
                href={`/changelog?next=${end}&restPage=${restPage + 1}`}
                className="flex items-center gap-2"
              >
                Next <ArrowRightIcon width={14} />
              </Link>
            )}
          </div>
        </div>

        <CTABanner />
      </DefaultLayout>
    </>
  )
}

export default ChangelogPage


