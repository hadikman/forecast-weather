import { useForecastContext } from '@context/store'
import Frame from './ui/frame'
import Table from './ui/table'
import { hourlyDataToTableData } from '@lib/utils'

import type { City, ForecastData } from '@lib/types/forecast-data'

export default function TableForecast24H() {
  const { storage } = useForecastContext<ForecastData, City>()

  if (!storage) return

  const { hourly } = storage

  const { hourlyWeatherTitle, convertedHourlyWeather } =
    hourlyDataToTableData<ForecastData['hourly']>(hourly)

  return (
    <Frame className="overflow-x-auto select-none">
      <Table
        title="متغیرهای آب و هوایی 24 ساعت آینده"
        hourlyWeatherTitle={hourlyWeatherTitle}
        convertedHourlyWeather={convertedHourlyWeather}
      />
    </Frame>
  )
}
