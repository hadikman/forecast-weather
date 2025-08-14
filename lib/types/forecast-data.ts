export type City =
  | 'لاهیجان'
  | 'شفت'
  | 'املش'
  | 'فومن'
  | 'شیرگاه'
  | 'توتکابن'
  | 'رستم آباد'
  | 'سیاهکل'
export type CitySelection = { label: City; value: City }

export type ForecastData = {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_units: {
    time: string
    interval: string
    temperature_2m: string
    relative_humidity_2m: string
    apparent_temperature: string
    surface_pressure: string
    wind_speed_10m: string
    wind_direction_10m: string
  }
  current: {
    time: string
    interval: number
    temperature_2m: number
    relative_humidity_2m: number
    apparent_temperature: number
    surface_pressure: number
    wind_speed_10m: number
    wind_direction_10m: number
  }
  hourly_units: {
    [key: string]: string
  }
  hourly: {
    [key: string]: string[] | number[]
  }
}

export type HourlyProps = {
  time: string
  temperature_2m: string
  relative_humidity_2m: string
  dew_point_2m: string
  apparent_temperature: string
  uv_index: string
  uv_index_clear_sky: string
  precipitation: string
  evapotranspiration: string
  wind_speed_10m: string
  soil_temperature_0cm: string
  soil_temperature_6cm: string
  soil_temperature_18cm: string
  soil_temperature_54cm: string
  soil_moisture_0_to_1cm: string
  soil_moisture_3_to_9cm: string
  soil_moisture_9_to_27cm: string
  soil_moisture_27_to_81cm: string
  direct_normal_irradiance: string
  direct_radiation: string
  direct_normal_irradiance_instant: string
  diffuse_radiation_instant: string
  global_tilted_irradiance_instant: string
  global_tilted_irradiance: string
  terrestrial_radiation: string
  diffuse_radiation: string
  shortwave_radiation: string
  shortwave_radiation_instant: string
  direct_radiation_instant: string
  terrestrial_radiation_instant: string
  temperature_1000hPa: string
  temperature_975hPa: string
  relative_humidity_1000hPa: string
  relative_humidity_975hPa: string
  cloud_cover_1000hPa: string
  wind_speed_1000hPa: string
  wind_speed_975hPa: string
  wind_direction_1000hPa: string
  wind_direction_975hPa: string
  geopotential_height_1000hPa: string
}

export type CurrentUnitsProps = Omit<
  ForecastData['current_units'],
  'time' | 'interval'
>
