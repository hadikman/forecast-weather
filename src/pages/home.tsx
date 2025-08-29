import React from 'react'
import { useForecastContext } from '@context/store'
import {
  ErrorBoundary,
  useErrorBoundary,
  withErrorBoundary,
} from 'react-error-boundary'
import NotReady from '@/components/not-ready'
import ErrorFallbackMessage from '@/components/error-fallback-message'
import Main from '@/components/main'
import WeatherCurrent from '@/components/weather-current'
import UpdateForecast from '@/components/update-forecast'
import TableForecast24H from '@/components/table-forecast-24h'
import TablePast24H from '@/components/table-past-24h'
import SkeletonTable from '@/components/skeleton/skeleton-table'
import { fetchData } from '@lib/utils'
import { coordinates, FORECAST_URL } from '@lib/constant'

import type { City, ForecastData } from '@lib/types/forecast-data'

function HomePage() {
  const {
    key: city,
    storage,
    setStorage,
  } = useForecastContext<ForecastData, City>()
  const { showBoundary } = useErrorBoundary()

  React.useEffect(() => {
    async function run() {
      const [lat, long] = coordinates[city]
      const result = await fetchData<ForecastData>(
        FORECAST_URL + '&latitude=' + lat + '&longitude=' + long,
      ).then(
        res => res,
        error => showBoundary(error),
      )

      if (result) {
        setStorage(city, result)
      }
    }

    if (!storage) run()
  }, [city, setStorage, storage, showBoundary])

  if (!storage) return <NotReady />

  return (
    <Main>
      <div className="flex h-max flex-col space-y-4 overflow-x-hidden text-sm">
        <div className="flex flex-wrap gap-4">
          <ErrorBoundary FallbackComponent={ErrorFallbackMessage}>
            <UpdateForecast />
          </ErrorBoundary>
          <WeatherCurrent />
        </div>

        <TableForecast24H />

        <ErrorBoundary FallbackComponent={ErrorFallbackMessage}>
          <React.Suspense fallback={<SkeletonTable />}>
            <TablePast24H />
          </React.Suspense>
        </ErrorBoundary>
      </div>
    </Main>
  )
}

const HomePageWithErrorBoundary = withErrorBoundary(HomePage, {
  FallbackComponent: ErrorFallbackMessage,
})

export default HomePageWithErrorBoundary
