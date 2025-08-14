import React from 'react'
import Select from 'react-select'
import MainLayout from '@/components/main-layout'
import NotReady from '@/components/not-ready'
import Title from '@/components/title'
import Unit from '@/components/unit'
import useLocalStorage from '@lib/hooks/useLocalStorage'
import {
  fetchData,
  formatDate,
  formatNumber,
  generateCitySelection,
} from '@lib/utils'
import {
  currentPropsInPersian,
  currentUnitsInPersian,
  hourlyPropsInPersian,
  hourlyUnitsInPersian,
} from '@lib/dictionary'
import { citySelection, coordinates, FORECAST_URL } from '@lib/constant'

import type { SingleValue } from 'react-select'
import type {
  City,
  CitySelection,
  ForecastData,
} from '@lib/types/forecast-data'
import UpdateForecast from './components/update-forecast'

export default function App() {
  const [city, setCity] = React.useState<City>('لاهیجان')

  const { storage, getStorage, setStorage } =
    useLocalStorage<ForecastData>(city)

  React.useEffect(() => {
    async function run() {
      const [lat, long] = coordinates[city]
      const result = await fetchData(
        FORECAST_URL + '&latitude=' + lat + '&longitude=' + long,
      )

      setStorage(result, city)
    }

    if (!storage) run()
  }, [city, setStorage, storage])

  if (!storage) return <NotReady />

  const { current, hourly } = storage

  const currentWeather = Object.entries(current)
  const hourlyWeather = Object.entries(hourly)

  const hourlyWeatherTitle: string[] = []
  const convertedHourlyWeather: (string | number)[][] = []
  hourlyWeather.forEach(item => {
    const [key, arrayValues] = item

    hourlyWeatherTitle.push(key)

    arrayValues.forEach((value, i) => {
      if (!Array.isArray(convertedHourlyWeather[i])) {
        convertedHourlyWeather[i] = []
      }
      convertedHourlyWeather[i] = [
        ...convertedHourlyWeather[i],
        typeof value === 'string'
          ? formatDate(value as string, { timeStyle: 'short' })
          : formatNumber(value),
      ]
    })
  })

  async function handleSelectCities(e: SingleValue<CitySelection>) {
    const selectedCity = e?.value as City
    const storedCity = getStorage(selectedCity)

    if (!storedCity) {
      const [lat, long] = coordinates[selectedCity]
      const result = await fetchData(
        FORECAST_URL + '&latitude=' + lat + '&longitude=' + long,
      )

      setStorage(result, selectedCity)
      setCity(selectedCity)
    }

    setCity(selectedCity)
  }

  return (
    <MainLayout>
      <div className="flex flex-col space-y-4 overflow-hidden p-4 text-sm">
        <div className="flex flex-wrap gap-4">
          <div className="flex grow flex-wrap items-center gap-2 rounded-md border border-slate-400 p-2 sm:w-64 sm:gap-0">
            <div className="flex w-full flex-col gap-2 sm:flex-1/2">
              <Select
                options={citySelection}
                autoFocus
                closeMenuOnScroll
                onChange={handleSelectCities}
                value={generateCitySelection(city)}
                placeholder="انتخاب شهر"
              />
              <UpdateForecast
                url={
                  FORECAST_URL +
                  '&latitude=' +
                  coordinates[city][0] +
                  '&longitude=' +
                  coordinates[city][1]
                }
                updateKey={city}
                onUpdate={setStorage}
              />
            </div>

            <div className="w-full shrink-0 space-y-2 text-center sm:flex-1/2">
              <h3 className="text-slate-400">آخرین بروزرسانی</h3>
              <h3 className="text-lg">
                {formatDate(currentWeather[0][1] as string)}
              </h3>
            </div>
          </div>

          <div className="grid overflow-x-auto rounded-md border border-slate-400 p-2 select-none md:flex-3/4 md:border-0 md:p-0">
            <div className="flex min-w-3xl divide-x divide-slate-400 rounded-md border border-slate-400">
              <div className="flex bg-slate-950 py-1 text-center text-slate-100">
                <h3
                  className="font-semibold"
                  style={{ writingMode: 'sideways-lr' }}
                >
                  وضعیت فعلی
                </h3>
              </div>
              {currentWeather.map(([item, value]) => {
                const title =
                  currentPropsInPersian[
                    item as keyof typeof currentPropsInPersian
                  ]
                const unit =
                  currentUnitsInPersian[
                    item as keyof typeof currentUnitsInPersian
                  ]

                return title ? (
                  <div
                    key={title}
                    className="grid flex-1/4 grow items-center text-center"
                  >
                    <div>
                      <Title children={title} />
                      <Unit children={unit} />
                    </div>
                    <div className="text-lg">{value}</div>
                  </div>
                ) : null
              })}
            </div>
          </div>
        </div>

        <div className="flex overflow-x-auto rounded-md border border-slate-400 px-2 select-none">
          <table className="border-collapse [&_td,&_th]:border [&_td,&_th]:border-blue-200">
            <caption className="caption-top py-2 text-lg text-slate-500 underline underline-offset-8">
              جدول متغیرهای آب و هوایی برای 24 ساعت
            </caption>
            <thead className="[&_th]:px-2 [&_th]:py-4">
              <tr>
                {hourlyWeatherTitle.map((item, i) => {
                  const unit =
                    hourlyUnitsInPersian[
                      item as keyof typeof hourlyUnitsInPersian
                    ]
                  const title =
                    hourlyPropsInPersian[
                      item as keyof typeof hourlyPropsInPersian
                    ]

                  return (
                    <th
                      key={i}
                      className="group relative"
                      data-temp="before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:bg- before:text-xs before:text-slate-500 hover:before:[content:attr(data-unit)] active:before:[content:attr(data-unit)]"
                      data-unit={unit}
                    >
                      <Title children={title} />
                      {unit && (
                        <Unit
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-sm bg-slate-800 p-1 text-nowrap text-slate-100! opacity-0 transition-opacity group-hover:opacity-100 group-active:opacity-100"
                          children={unit}
                        />
                      )}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody className="[&_td]:text-center [&_tr:nth-child(odd)]:bg-blue-100">
              {convertedHourlyWeather.map((item, i) => (
                <tr key={i}>
                  {item.map((value, j) => (
                    <td key={`${i}+${j}`} className="tabular-nums">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  )
}
