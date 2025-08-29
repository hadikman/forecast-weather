import React from 'react'
import { useForecastContext } from '@context/store'
import Frame from './ui/frame'
import Table from './ui/table'
import { hourlyDataToTableData, fetchData } from '@lib/utils'
import { citiesInEnglish } from '@lib/dictionary'

import type { City, ForecastData } from '@lib/types/forecast-data'

const cache = new Map()

const fetchResult = <T,>(city: string): Promise<{ data: T }> => {
  if (cache.has(city)) {
    return cache.get(city)
  }

  const result = fetchData<{ data: T }>(
    '/api?queryType=get-data&sheetName=' + city,
  )

  cache.set(city, result)

  return result
}

export default function TablePast24H() {
  const { key } = useForecastContext<ForecastData, City>()
  const forecast = React.use(
    fetchResult<ForecastData['hourly']>(citiesInEnglish[key]),
  )

  const hourlyData = forecast.data

  const { hourlyWeatherTitle, convertedHourlyWeather } =
    hourlyDataToTableData<ForecastData['hourly']>(hourlyData)

  return (
    <Frame className="overflow-x-auto select-none">
      <Table
        title="متغیرهای آب و هوایی 24 ساعت قبل"
        hourlyWeatherTitle={hourlyWeatherTitle}
        convertedHourlyWeather={convertedHourlyWeather}
      />
    </Frame>
  )
}
