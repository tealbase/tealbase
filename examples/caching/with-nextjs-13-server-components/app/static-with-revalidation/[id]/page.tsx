import tealbase from '../../../utils/tealbase'
import { notFound } from 'next/navigation'

// cache this page for 1 minute
export const revalidate = 60

export async function generateStaticParams() {
  const { data: posts } = await tealbase.from('posts').select('id')

  return posts?.map(({ id }) => ({
    id,
  }))
}

export default async function Post({ params: { id } }: { params: { id: string } }) {
  const { data: post } = await tealbase.from('posts').select().match({ id }).single()

  if (!post) {
    notFound()
  }

  return <pre>{JSON.stringify(post, null, 2)}</pre>
}
