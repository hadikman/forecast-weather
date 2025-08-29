import type { FallbackProps } from 'react-error-boundary'
import Frame from './ui/frame'
import Button from './ui/button'

export default function ErrorFallbackMessage({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <Frame className="h-max border-2 border-red-600! bg-red-100 p-5 text-red-950">
      <h2 className="mb-4 text-xl font-bold">خطا در نمایش</h2>
      <div className="pr-2">
        <div className="mb-8">
          <h4 className="mb-2 font-bold">علت/پیام خطا:</h4>
          <p>
            {error.message
              ? error.message
              : '.پیامی برای نمایش علت خطا وجود ندارد'}
          </p>
        </div>
        <Button onClick={resetErrorBoundary}>تلاش دوباره</Button>
      </div>
    </Frame>
  )
}
