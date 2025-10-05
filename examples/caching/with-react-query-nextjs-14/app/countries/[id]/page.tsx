'use client'

import useTealbaseBrowser from '@/utils/tealbase-browser'
import { getCountryById } from '@/queries/get-country-by-id'
import { useQuery } from '@tealbase-cache-helpers/postgrest-react-query'

export default function CountryPage({ params }: { params: { id: number } }) {
  const tealbase = useTealbaseBrowser()
  const {
    data: country,
    isLoading,
    isError,
  } = useQuery(getCountryById(tealbase, params.id))

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError || !country) {
    return <div>Error</div>
  }

  return (
    <div>
      <h1>{country.name}</h1>
    </div>
  )
}
