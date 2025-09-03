import React from 'react'
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary'
import Main from '@/components/main'
import ErrorFallbackMessage from '@/components/error-fallback-message'
import Frame from '@/components/ui/frame'
import DatePicker from '@/components/ui/date-picker'
import Select from 'react-select'
import Button from '@/components/ui/button'
import Table from '@/components/ui/table'
import { fetchData, formatDate, hourlyDataToTableData, wait } from '@lib/utils'
import { citySelection } from '@lib/constant'
import { citiesInEnglish } from '@lib/dictionary'
import { ChevronDown } from 'lucide-react'

import type { MultiValue } from 'react-select'
import type { CitySelection, ForecastData } from '@lib/types/forecast-data'
import type { FetchState } from '@lib/types/shared'

type ComparisonStateType = {
  selectedCities: MultiValue<CitySelection>
  selectedDate: Date
  hourly: ForecastData['hourly'][]
}
export default function Comparison() {
  const [comparisonData, setComparisonData] =
    React.useState<ComparisonStateType>({
      selectedCities: [],
      selectedDate: new Date(),
      hourly: [],
    })

  const { selectedCities, hourly: hourlyArray } = comparisonData
  const citiesName = selectedCities.map(c => c.value)

  return (
    <Main>
      <div className="h-max space-y-4 overflow-x-hidden text-sm">
        <ErrorBoundary FallbackComponent={ErrorFallbackMessage}>
          <Frame>
            <ComparisonForm
              setComparisonData={setComparisonData}
              renderCache={
                <DisplayCache
                  data={comparisonData}
                  setData={setComparisonData}
                />
              }
            />
          </Frame>
        </ErrorBoundary>

        <Frame className="space-y-4">
          {hourlyArray && hourlyArray?.length > 0 ? (
            hourlyArray?.map((hourly, idx) => {
              const { hourlyWeatherTitle, convertedHourlyWeather } =
                hourlyDataToTableData<ForecastData['hourly']>(hourly)

              return (
                <Frame key={idx} className="overflow-x-auto select-none">
                  <Table
                    title={'متغیرهای آب و هوایی ' + citiesName[idx]}
                    hourlyWeatherTitle={hourlyWeatherTitle}
                    convertedHourlyWeather={convertedHourlyWeather}
                  />
                </Frame>
              )
            })
          ) : (
            <div className="mx-auto w-1/2 text-center">
              <h1 className="mb-4 text-lg font-bold">جدول مقایسه خالی است</h1>
              <p className="text-xs text-zinc-600">
                برای مشاهده جدول‌ها برای مقایسه، تاریخ و شهرهای موردنظر را از
                منوی بالا انتخاب نمایید.
              </p>
            </div>
          )}
        </Frame>
      </div>
    </Main>
  )
}

type ComparisonFormProps = {
  renderCache: React.ReactNode
  setComparisonData: React.Dispatch<React.SetStateAction<ComparisonStateType>>
}
function ComparisonForm({
  renderCache,
  setComparisonData,
}: ComparisonFormProps) {
  const { showBoundary } = useErrorBoundary()
  const [selectedDate, setSelectDate] = React.useState<Date>()
  const [selectedCities, setSelectedCities] = React.useState<
    MultiValue<CitySelection>
  >([])
  const [state, setState] = React.useState<FetchState>('idle')

  const isEmptyInputs = !selectedDate || selectedCities.length === 0

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const apiPath = '/api'
    const searchParams = new URLSearchParams([['queryType', 'comparison']])

    if (!selectedDate) return

    const timestamp = selectedDate.getTime().toString()
    searchParams.set('date', timestamp)

    selectedCities.forEach(({ value }) =>
      searchParams.append('sheetNames', citiesInEnglish[value]),
    )

    const apiUrl = `${apiPath}?${searchParams.toString()}`

    setState('loading')

    const result = await fetchData<{ data: ForecastData['hourly'][] }>(
      apiUrl,
    ).then(
      res => res,
      error => showBoundary(error),
    )

    if (result?.data && result.data.length > 0) {
      const { data } = result
      setComparisonData({ selectedCities, selectedDate, hourly: data })

      setState('success')
      await wait(2000)
    }

    setState('idle')
  }

  return (
    <form
      className="flex h-max flex-col gap-10 p-4 sm:flex-row"
      onSubmit={handleSubmit}
    >
      <div>
        <h2 className="mb-6 text-2xl">انتخاب روز</h2>
        <DatePicker selected={selectedDate} setSelect={setSelectDate} />
      </div>
      <div className="flex grow-0 flex-col gap-10 select-none sm:grow md:max-w-80">
        <div>
          <h2 className="mb-6 text-2xl">انتخاب شهرها</h2>
          <Select
            isMulti
            closeMenuOnScroll
            options={citySelection}
            onChange={setSelectedCities}
            placeholder="انتخاب چند شهر"
          />
        </div>

        <div className="grow">{renderCache}</div>

        <Button
          className="mt-auto w-max self-end"
          type="submit"
          disabled={isEmptyInputs}
          state={state}
        >
          مقایسه
        </Button>
      </div>
    </form>
  )
}

type DisplayCacheProps = {
  data: ComparisonStateType
  setData: React.Dispatch<React.SetStateAction<ComparisonStateType>>
}
function DisplayCache({ data, setData }: DisplayCacheProps) {
  const [cache, setCache] = React.useState<Record<string, ComparisonStateType>>(
    {},
  )
  const key = [
    ...data.selectedCities.map(c => c.value),
    data.selectedDate.getTime(),
  ].sort()
  const cacheKey = JSON.stringify(key)

  React.useEffect(() => {
    const { selectedCities } = data

    if (selectedCities.length === 0) return

    setCache(prev => ({ ...prev, [cacheKey]: data }))
  }, [data, cacheKey])

  if (Object.keys(cache).length === 0)
    return <h3 className="text-zinc-500">آخرین مقایسه‌ها</h3>

  const cacheEntries = Object.entries(cache).reverse()
  const cacheData = cacheEntries.map(([key, values]) => {
    const [date, ...cities] = JSON.parse(key)
    const isActive = key === cacheKey

    return [date, cities, values, isActive]
  })

  return (
    <div className="group flex h-full flex-col">
      <div className="flex items-center">
        <h3 className="text-lg">آخرین مقایسه‌ها</h3>
        <label
          htmlFor="toggle-list"
          className="mr-auto ml-2 rounded-sm p-1 transition-[background] hover:bg-zinc-200 sm:hidden sm:cursor-pointer"
        >
          <input
            className="peer hidden"
            id="toggle-list"
            type="checkbox"
            aria-hidden
          />
          <ChevronDown className="size-4 -rotate-90 transition-transform peer-checked:rotate-0" />
        </label>
      </div>
      <ul className="h-0 grow divide-y divide-dashed divide-blue-500 overflow-y-auto opacity-0 transition-[height,opacity,margin] delay-[150ms,100ms] duration-[300ms,200ms] group-[:has(input:checked)]:mt-6 group-[:has(input:checked)]:h-48 group-[:has(input:checked)]:opacity-100 group-[:has(input:checked)]:delay-[150ms,250ms] group-[:has(input:checked)]:duration-[250ms,100ms] sm:h-1 sm:opacity-100">
        {cacheData.map(([date, cities, values, isActive]) => (
          <li
            key={date + cities.join('_')}
            className="py-1"
            onClick={() => setData(values)}
          >
            <div
              className={`cursor-pointer rounded-md border border-transparent px-2.5 py-1.5 transition-all not-[&.active]:hover:border-zinc-900 [&.active]:border [&.active]:border-zinc-900 [&.active]:pr-3 [&.active]:font-bold ${isActive && 'active'}`}
            >
              <span className="text-xs text-zinc-500">
                {formatDate(new Date(date) as unknown as string, {
                  dateStyle: 'long',
                })}
              </span>
              <span> — </span>
              <span>{cities.join('_')}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
