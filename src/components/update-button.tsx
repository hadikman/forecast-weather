import React from 'react'
import { useForecastContext } from '@context/store'
import Button from './ui/button'
import { fetchData, wait } from '@lib/utils'
import { coordinates, FORECAST_URL } from '@lib/constant'

import type { ForecastData, City } from '@lib/types/forecast-data'

export default function UpdateButton() {
  const { key, setStorage } = useForecastContext<ForecastData, City>()
  const [state, setState] = React.useState<'idle' | 'loading' | 'success'>(
    'idle',
  )

  async function handleClickUpdate() {
    const city = key
    const [lat, long] = coordinates[city]

    setState('loading')

    const result = await fetchData(
      FORECAST_URL + '&latitude=' + lat + '&longitude=' + long,
    )

    setStorage(city, result)

    setState('success')
    await wait(2000)
    setState('idle')
  }

  return (
    <Button children="بروزرسانی" state={state} onClick={handleClickUpdate} />
  )
}
