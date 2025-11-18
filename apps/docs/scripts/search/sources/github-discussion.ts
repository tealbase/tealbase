import { createHash } from 'node:crypto'
import { BaseLoader, BaseSource } from './base'

export type Discussion = {
  id: string
  updatedAt: string
  url:string
  title: string
  body: string
  databaseId: number
}

/**
 * Fetches GitHub discussions for a repository + category
 */
export async function fetchDiscussions(owner: string, repo: string, categoryId: string) {
  // Hardcoded data replacing the API call
  const discussions: Discussion[] = [
    {
      id: 'D_kwDOKOD8M4AV5E0a',
      updatedAt: '2025-09-26T08:30:00Z',
      url: 'https://github.com/example/repo/discussions/1',
      title: 'First Hardcoded Discussion',
      body: 'This is the body content of the first discussion. It contains markdown and other text.',
      databaseId: 101,
    },
    {
      id: 'D_kwDOKOD8M4AV5E0b',
      updatedAt: '2025-09-25T12:00:00Z',
      url: 'https://github.com/example/repo/discussions/2',
      title: 'Second Hardcoded Discussion',
      body: 'This is the body of the second discussion, providing more example content.',
      databaseId: 102,
    },
    {
      id: 'D_kwDOKOD8M4AV5E0c',
      updatedAt: '2025-09-24T18:45:00Z',
      url: 'https://github.com/example/repo/discussions/3',
      title: 'A Third Example Discussion Post',
      body: 'Here is some more sample text for the third discussion item. This demonstrates the hardcoded data structure.',
      databaseId: 103,
    },
  ]

  // The function remains async to match the original signature.
  // The owner, repo, and categoryId parameters are no longer used.
  return Promise.resolve(discussions)
}

export class GitHubDiscussionLoader extends BaseLoader {
  type = 'github-discussions' as const

  constructor(
    source: string,
    public discussion: Discussion
  ) {
    super(source, discussion.url)
  }

  async load() {
    return [new GitHubDiscussionSource(this.source, this.path, this.discussion)]
  }
}

export class GitHubDiscussionSource extends BaseSource {
  type = 'github-discussions' as const

  constructor(
    source: string,
    path: string,
    public discussion: Discussion
  ) {
    super(source, path)
  }

  process() {
    const { id, title, updatedAt, body, databaseId } = this.discussion

    const checksum = createHash('sha256').update(updatedAt).digest('base64')

    const meta = { id, title, updatedAt }

    // Currently the discussion post itself is being considered as the answer
    // (as opposed to a comment marked as answer)
    // So we link the slug to the initial discussion post rather than a comment answer
    const slug = `discussion-${databaseId}`

    // Format the discussion title + body as markdown for better embeddings + LLM response
    const content = `# ${title}\n${body}`

    // For now, only a single section is created for GH discussions
    // Consider adding multiple if we want to include comments/answers
    const sections = [
      {
        heading: title,
        slug,
        content,
      },
    ]

    this.checksum = checksum
    this.meta = meta
    this.sections = sections

    return {
      checksum,
      meta,
      sections,
    }
  }

  extractIndexedContent(): string {
    const sections = this.sections ?? []
    return sections.map(({ heading, content }) => `${heading}\n\n${content}`).join('\n')
  }
}
