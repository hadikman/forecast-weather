export async function fetchData(url: string) {
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
