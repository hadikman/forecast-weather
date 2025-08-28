import Main from './main'

export default function NotReady() {
  return (
    <Main className="h-svh w-screen content-center justify-items-center">
      <h1 className="mb-3 text-2xl sm:mb-6 sm:text-4xl">در حال دریافت داده</h1>
      <div className="flex gap-1">
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="size-1.5 animate-bounce rounded-full bg-blue-900 sm:size-3"
            style={{ animationDelay: i * 130 + 'ms' }}
          />
        ))}
      </div>
    </Main>
  )
}
