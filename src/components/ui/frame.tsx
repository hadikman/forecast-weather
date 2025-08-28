import clsx from 'clsx/lite'

type Props = {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}
export default function Frame({ children, className }: Props) {
  return (
    <div className={clsx(className, 'rounded-md border border-slate-400 p-2')}>
      {children}
    </div>
  )
}
