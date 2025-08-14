import React from 'react'
import Button from './button'
import { wait } from '@lib/utils'

import type { ForecastData, City } from '@lib/types/forecast-data'

type Props = {
  url: string
  updateKey: City
  onUpdate: (value: ForecastData, key: City) => void
}

export default function UpdateForecast({ url, updateKey, onUpdate }: Props) {
  const [state, setState] = React.useState<'idle' | 'loading' | 'success'>(
    'idle',
  )

  async function handleClickUpdate() {
    setState('loading')

    const result = await fetch(url).then(res => res.json())

    onUpdate(result, updateKey)

    setState('success')
    await wait(2000)
    setState('idle')
  }

  return (
    <Button children="بروزرسانی" state={state} onClick={handleClickUpdate} />
  )
}
