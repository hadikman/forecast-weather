import React from 'react'
import { useForecastContext } from '@context/store'
import Main from '@/components/main'
import NotReady from '@/components/not-ready'
import WeatherCurrent from '@/components/weather-current'
import UpdateForecast from '@/components/update-forecast'
import TableForecast24H from '@/components/table-forecast-24h'
import TablePast24H from '@/components/table-past-24h'
import SkeletonTable from '@/components/skeleton/skeleton-table'
import { fetchData } from '@lib/utils'
import { coordinates, FORECAST_URL } from '@lib/constant'

import type { City, ForecastData } from '@lib/types/forecast-data'

export default function HomePage() {
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
    <Main>
      <div className="flex h-max flex-col space-y-4 overflow-x-hidden text-sm">
        <div className="flex flex-wrap gap-4">
          <UpdateForecast />
          <WeatherCurrent />
        </div>

        <TableForecast24H />
        <React.Suspense fallback={<SkeletonTable />}>
          <TablePast24H />
        </React.Suspense>
      </div>
    </Main>
  )
}
