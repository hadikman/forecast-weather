import clsx from 'clsx/lite'

export default function Main({
  children,
  className,
}: React.ComponentProps<'main'>) {
  return (
    <main className={clsx('grid h-svh grow overflow-x-hidden p-3', className)}>
      {children}
    </main>
  )
}
