'use client'

import { useTealbaseClient } from '@/hooks/useTealbaseClient'
import { useEffect, useState } from 'react'

export function ReadData() {
  const tealbase = useTealbaseClient()
  const [data, setData] = useState<Array<unknown>>([])

  useEffect(() => {
    tealbase
      .from('secured_table')
      .select('*')
      .then(({ data, error }) => {
        if (error) {
          console.error(error)
        } else {
          setData(data)
        }
      })
  }, [tealbase])

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
