export async function fetchData<T>(url: string): Promise<T> {
  return fetch(url).then(data => data.json())
}

export function formatDate(
  date: string,
  options: Intl.DateTimeFormatOptions = {
    timeStyle: 'short',
    dateStyle: 'short',
  },
) {
  return new Date(date).toLocaleString('FA-ir', options)
}

export function formatNumber(e: number) {
  return Intl.NumberFormat('FA-ir').format(e)
}

export function generateCitySelection<T>(city: T) {
  return { label: city, value: city }
}

export async function wait(ms: number = 500) {
  return await new Promise(res => setTimeout(res, ms))
}

export function hourlyDataToTableData<
  T extends Record<string, (string | number)[]>,
>(hourlyForecast: T) {
  const hourlyWeather = Object.entries(hourlyForecast)
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

  return { hourlyWeatherTitle, convertedHourlyWeather }
}
