import clsx from 'clsx/lite'

export default function MainLayout({
  children,
  className,
}: React.ComponentProps<'main'>) {
  return (
    <main className={clsx('font-persian grid', className)}>{children}</main>
  )
}
