import { useForecastContext } from '@context/store'
import Frame from './ui/frame'
import Title from './ui/title'
import Unit from './ui/unit'
import { currentPropsInPersian, currentUnitsInPersian } from '@lib/dictionary'

import type { City, ForecastData } from '@lib/types/forecast-data'

export default function WeatherCurrent() {
  const { storage } = useForecastContext<ForecastData, City>()

  if (!storage) return

  const { current } = storage
  const currentWeather = Object.entries(current)

  return (
    <Frame className="grid overflow-x-auto select-none md:flex-3/4 md:border-0 md:p-0">
      <div className="flex min-w-3xl divide-x divide-slate-400 rounded-md border border-slate-400">
        <div className="flex bg-slate-950 py-1 text-center text-slate-100">
          <h3 className="font-semibold" style={{ writingMode: 'sideways-lr' }}>
            وضعیت فعلی
          </h3>
        </div>
        {currentWeather.map(([item, value]) => {
          const title =
            currentPropsInPersian[item as keyof typeof currentPropsInPersian]
          const unit =
            currentUnitsInPersian[item as keyof typeof currentUnitsInPersian]

          return title ? (
            <div
              key={title}
              className="grid flex-1/4 grow content-center py-3 text-center sm:py-0"
            >
              <div className="mb-2 sm:mb-4">
                <Title children={title} />
                <Unit children={unit} />
              </div>
              <div className="text-lg leading-4">{value}</div>
            </div>
          ) : null
        })}
      </div>
    </Frame>
  )
}
