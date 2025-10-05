import Link from 'next/link'
import tealbase from '../../utils/tealbase'

// cache this page for 1 minute
export const revalidate = 60

export default async function Posts() {
  const { data: posts } = await tealbase.from('posts').select('id, title')

  if (!posts) {
    return <p>No posts found.</p>
  }

  return posts.map((post) => (
    <p key={post.id}>
      <Link href={`/static/${post.id}`}>{post.title}</Link>
    </p>
  ))
}
