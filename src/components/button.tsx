import React from 'react'
import clsx from 'clsx/lite'
import { RefreshCw, CloudDownload, CloudCheck } from 'lucide-react'

export default function Button({
  className,
  type,
  onClick,
  children,
  state,
  ...props
}: React.ComponentProps<'button'> & { state: 'idle' | 'loading' | 'success' }) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  return (
    <button
      className={clsx(
        'cursor-pointer rounded-sm bg-black py-2.5 text-white transition-[background] hover:bg-black/80 focus:outline-2 focus:outline-offset-2 disabled:pointer-events-none disabled:bg-black/30 sm:py-2 [&_svg]:ms-2 [&_svg]:inline-block',
        className,
      )}
      type={type || 'button'}
      disabled={state === 'loading'}
      onClick={handleClick}
      {...props}
    >
      {state === 'loading' ? (
        <>
          {children} ...
          <CloudDownload className="size-3.5" />
        </>
      ) : state === 'success' ? (
        <>
          {children}
          <CloudCheck className="size-3.5" />
        </>
      ) : (
        <>
          {children}
          <RefreshCw className="size-3.5" />
        </>
      )}
    </button>
  )
}
