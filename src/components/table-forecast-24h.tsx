import { useForecastContext } from '@context/store'
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
    <div className="flex overflow-x-auto rounded-md border border-slate-400 px-2 select-none">
      <Table
        title="متغیرهای آب و هوایی 24 ساعت آینده"
        hourlyWeatherTitle={hourlyWeatherTitle}
        convertedHourlyWeather={convertedHourlyWeather}
      />
    </div>
  )
}
