import type { City, CitySelection } from '@lib/types/forecast-data'
import { generateCitySelection } from './utils'

export const FORECAST_URL =
  'https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,uv_index,uv_index_clear_sky,precipitation,evapotranspiration,wind_speed_10m,soil_temperature_0cm,soil_temperature_6cm,soil_temperature_18cm,soil_temperature_54cm,soil_moisture_0_to_1cm,soil_moisture_3_to_9cm,soil_moisture_9_to_27cm,soil_moisture_27_to_81cm,direct_normal_irradiance,direct_radiation,direct_normal_irradiance_instant,diffuse_radiation_instant,global_tilted_irradiance_instant,global_tilted_irradiance,terrestrial_radiation,diffuse_radiation,shortwave_radiation,shortwave_radiation_instant,direct_radiation_instant,terrestrial_radiation_instant,temperature_1000hPa,temperature_975hPa,relative_humidity_1000hPa,relative_humidity_975hPa,cloud_cover_1000hPa,wind_speed_1000hPa,wind_speed_975hPa,wind_direction_1000hPa,wind_direction_975hPa,geopotential_height_1000hPa&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,wind_direction_10m&timezone=auto&tilt=36&azimuth=36&%3Flatitude=37.1875&forecast_hours=24'

const cities: City[] = [
  'لاهیجان',
  'املش',
  'شفت',
  'فومن',
  'شیرگاه',
  'توتکابن',
  'رستم آباد',
  'سیاهکل',
]
export const citySelection: CitySelection[] = cities.map(c =>
  generateCitySelection(c),
)

export const coordinates: Record<City, [number, number]> = {
  لاهیجان: [37.1875, 50],
  شفت: [37.1875, 49.4375],
  املش: [37.125, 50.1875],
  فومن: [37.25, 49.3125],
  شیرگاه: [36.3125, 52.875],
  توتکابن: [36.8928, 49.5277],
  'رستم آباد': [36.8993, 49.4932],
  سیاهکل: [37.1522, 49.8716],
}
