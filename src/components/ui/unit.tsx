import clsx from 'clsx/lite'

export default function Unit({
  children,
  className,
}: React.ComponentProps<'span'>) {
  return (
    <span className={clsx('text-xs font-light text-slate-500', className)}>
      {children}
    </span>
  )
}
