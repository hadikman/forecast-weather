import { useForecastContext } from '@context/store'
import Frame from './ui/frame'
import Table from './ui/table'
import { hourlyDataToTableData, fetchData, wrapPromise } from '@lib/utils'
import { citiesInEnglish } from '@lib/dictionary'

import type { City, ForecastData } from '@lib/types/forecast-data'

const cache = new Map()

const fetchResult = (city: string) => {
  if (cache.has(city)) {
    return cache.get(city)
  }

  const result = wrapPromise<{ data: ForecastData['hourly'] }>(
    fetchData('/api?queryType=get-data&sheetName=' + city),
  )
  cache.set(city, result)

  return result
}

export default function TablePast24H() {
  const { key } = useForecastContext<ForecastData, City>()
  const forecastResult = fetchResult(citiesInEnglish[key])
  const forecast = forecastResult.read()

  const hourlyForecast = forecast.data

  const { hourlyWeatherTitle, convertedHourlyWeather } =
    hourlyDataToTableData<ForecastData['hourly']>(hourlyForecast)

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
