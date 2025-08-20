import Title from './title'
import Unit from './unit'
import { hourlyUnitsInPersian, hourlyPropsInPersian } from '@lib/dictionary'

type Props = {
  title: string
  hourlyWeatherTitle: string[]
  convertedHourlyWeather: (string | number)[][]
}
export default function Table({
  title,
  hourlyWeatherTitle,
  convertedHourlyWeather,
}: Props) {
  return (
    <table className="border-collapse [&_td,&_th]:border [&_td,&_th]:border-blue-200">
      <caption className="caption-top py-2 text-lg text-slate-500 underline underline-offset-8">
        {title}
      </caption>
      <thead className="[&_th]:px-2 [&_th]:py-4">
        <tr>
          {hourlyWeatherTitle.map((item, i) => {
            const unit =
              hourlyUnitsInPersian[item as keyof typeof hourlyUnitsInPersian]
            const title =
              hourlyPropsInPersian[item as keyof typeof hourlyPropsInPersian]

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
  )
}
