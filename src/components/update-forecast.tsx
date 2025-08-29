import { useForecastContext } from '@context/store'
import { useErrorBoundary } from 'react-error-boundary'
import Select from 'react-select'
import Frame from './ui/frame'
import UpdateButton from './update-button'
import { fetchData, formatDate, generateCitySelection } from '@lib/utils'
import { citySelection, coordinates, FORECAST_URL } from '@lib/constant'

import type { SingleValue } from 'react-select'
import type {
  City,
  CitySelection,
  ForecastData,
} from '@lib/types/forecast-data'

export default function UpdateForecast() {
  const {
    key: city,
    setKey,
    storage,
    getStorage,
    setStorage,
    refreshStorage,
  } = useForecastContext<ForecastData, City>()
  const { showBoundary } = useErrorBoundary()

  if (!storage) return

  const { current } = storage

  async function handleSelectCity(e: SingleValue<CitySelection>) {
    const selectedCity = e?.value as City
    const storedCity = getStorage(selectedCity)

    if (!storedCity) {
      const [lat, long] = coordinates[selectedCity]
      const result = await fetchData<ForecastData>(
        FORECAST_URL + '&latitude=' + lat + '&longitude=' + long,
      ).then(
        res => res,
        error => showBoundary(error),
      )

      if (result) {
        setStorage(selectedCity, result)
        setKey(selectedCity)
      }
    } else {
      refreshStorage(selectedCity)
      setKey(selectedCity)
    }
  }

  return (
    <Frame className="flex grow flex-wrap items-center gap-2 sm:w-64 sm:gap-0">
      <div className="flex w-full flex-col gap-2 sm:flex-1/2">
        <Select
          options={citySelection}
          autoFocus
          closeMenuOnScroll
          onChange={handleSelectCity}
          value={generateCitySelection(city)}
          placeholder="انتخاب شهر"
        />
        <UpdateButton />
      </div>

      <div className="w-full shrink-0 space-y-2 text-center sm:flex-1/2">
        <h3 className="text-slate-400">آخرین بروزرسانی</h3>
        <h3 className="text-lg">{formatDate(current.time)}</h3>
      </div>
    </Frame>
  )
}
