import React from 'react'
import { useForecastContext } from '@context/store'
import MainLayout from '@/components/main-layout'
import NotReady from '@/components/not-ready'
import WeatherCurrent from '@/components/weather-current'
import UpdateForecast from '@/components/update-forecast'
import TableForecast24H from '@/components/table-forecast-24h'
import TablePast24H from '@/components/table-past-24h'
import SkeletonTable from '@/components/skeleton/skeleton-table'
import { fetchData } from '@lib/utils'
import { coordinates, FORECAST_URL } from '@lib/constant'

import type { City, ForecastData } from '@lib/types/forecast-data'

export default function App() {
  const {
    key: city,
    storage,
    setStorage,
  } = useForecastContext<ForecastData, City>()

  React.useEffect(() => {
    async function run() {
      const [lat, long] = coordinates[city]
      const result = await fetchData(
        FORECAST_URL + '&latitude=' + lat + '&longitude=' + long,
      )

      setStorage(city, result)
    }

    if (!storage) run()
  }, [city, setStorage, storage])

  if (!storage) return <NotReady />

  return (
    <MainLayout>
      <div className="flex flex-col space-y-4 overflow-hidden p-4 text-sm">
        <div className="flex flex-wrap gap-4">
          <UpdateForecast />
          <WeatherCurrent />
        </div>

        <TableForecast24H />
        <React.Suspense fallback={<SkeletonTable />}>
          <TablePast24H />
        </React.Suspense>
      </div>
    </MainLayout>
  )
}
