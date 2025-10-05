// app/posts/posts.jsx
'use client'

import useTealbaseBrowser from '@/utils/tealbase-browser'
import { getCountryById } from '@/queries/get-country-by-id'
import { useQuery } from '@tealbase-cache-helpers/postgrest-react-query'

export default function Country({ id }: { id: number }) {
  const tealbase = useTealbaseBrowser()
  // This useQuery could just as well happen in some deeper
  // child to <Posts>, data will be available immediately either way
  const { data: country } = useQuery(getCountryById(tealbase, id))

  return (
    <div>
      <h1>SSR: {country?.name}</h1>
    </div>
  )
}
