'use client'

import { useEffect, useState } from 'react'
import tealbase from '../../utils/tealbase'

// realtime subscriptions need to be set up client-side
// this component takes initial posts as props and automatically
// updates when new posts are inserted into Tealbase's `posts` table
export default function RealtimePosts({ serverPosts }: { serverPosts: any }) {
  const [posts, setPosts] = useState(serverPosts)

  useEffect(() => {
    // this overwrites `posts` any time the `serverPosts` prop changes
    // this happens when the parent Server Component is re-rendered
    setPosts(serverPosts)
  }, [serverPosts])

  useEffect(() => {
    // ensure you have enabled replication on the `posts` table
    // https://tealbase.com/dashboard/project/_/database/replication
    const channel = tealbase
      .channel('*')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, (payload) =>
        setPosts((posts: any) => [...posts, payload.new])
      )
      .subscribe()

    return () => {
      tealbase.removeChannel(channel)
    }
  }, [serverPosts])

  return <pre>{JSON.stringify(posts, null, 2)}</pre>
}
