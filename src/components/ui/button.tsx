import React from 'react'
import clsx from 'clsx/lite'
import { RefreshCw, CloudDownload, CloudCheck } from 'lucide-react'

import type { FetchState } from '@lib/types/shared'

export default function Button({
  className,
  type,
  onClick,
  children,
  state,
  disabled,
  ...props
}: React.ComponentProps<'button'> & {
  state?: FetchState
}) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  return (
    <button
      className={clsx(
        'cursor-pointer rounded-sm bg-black px-4.5 py-2.5 text-white transition-[background] hover:bg-black/80 focus:outline-2 focus:outline-offset-2 disabled:pointer-events-none disabled:bg-black/30 sm:py-2 [&_svg]:ms-2 [&_svg]:inline-block',
        className,
        state === 'loading' && 'animate-pulse',
      )}
      type={type || 'button'}
      disabled={disabled || state === 'loading'}
      onClick={handleClick}
      {...props}
    >
      {state ? (
        state === 'loading' ? (
          <>
            {children}
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
        )
      ) : (
        children
      )}
    </button>
  )
}
