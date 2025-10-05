import { TypedTealbaseClient } from '@/utils/types'

export function getCountryById(client: TypedTealbaseClient, countryId: number) {
  return client
    .from('countries')
    .select(
      `
      id,
      name
    `
    )
    .eq('id', countryId)
    .throwOnError()
    .single()
}
