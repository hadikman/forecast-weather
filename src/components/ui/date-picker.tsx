import React from 'react'
import clsx from 'clsx/lite'
import { DayPicker } from 'react-day-picker/persian'
import { Undo2 } from 'lucide-react'

import 'react-day-picker/style.css'
import { getDefaultClassNames } from 'react-day-picker'

type Props = {
  selected: Date | undefined
  setSelect: React.Dispatch<React.SetStateAction<Date | undefined>>
}
export default function DatePicker({ selected, setSelect }: Props) {
  const [month, setMonth] = React.useState<Date>(new Date())
  const defaultClassNames = getDefaultClassNames()
  const pastDay = new Date()

  const isCurrentMonth = new Date().getMonth() === month?.getMonth()

  pastDay.setDate(pastDay.getDate() - 1)

  return (
    <DayPicker
      className="h-89"
      classNames={{
        day_button: `${defaultClassNames.day_button} size-9! sm:size-auto`,
      }}
      month={month}
      onMonthChange={setMonth}
      selected={selected}
      onSelect={setSelect}
      mode="single"
      captionLayout="dropdown"
      navLayout="around"
      required
      animate
      disabled={{ before: new Date('2025 08 17'), after: pastDay }}
      footer={
        <div className="mt-8 flex items-center px-3">
          <span
            className={clsx(
              !selected && 'text-xs text-zinc-500',
              selected && 'text-zinc-900',
            )}
          >
            {selected ? (
              <>
                <span className="ml-2 text-xs">روز انتخاب شده:</span>
                <span>{selected.toLocaleDateString('fa-IR')}</span>
              </>
            ) : (
              'هنوز روزی انتخاب نشده'
            )}
          </span>
          {!isCurrentMonth && (
            <span
              className="rounded-p-1 mr-auto cursor-pointer"
              onClick={() => setMonth(new Date())}
            >
              <Undo2 />
            </span>
          )}
        </div>
      }
    />
  )
}
