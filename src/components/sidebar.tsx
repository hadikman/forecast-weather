import { NavLink } from 'react-router'
import Separator from './ui/separator'
import Logo from '@/assets/logo.svg?react'
import { MapPinPlus, Blocks } from 'lucide-react'

import type { NavLinkProps } from 'react-router'

// To disable an item just to:'none'
const items = [
  { label: 'افزودن شهر', to: 'none', icon: MapPinPlus },
  { label: 'مقایسه شهرها', to: '/comparison', icon: Blocks },
]

export default function Sidebar() {
  return (
    <div className="border-l border-l-slate-400 [--item-size:--spacing(5)]">
      <div className="flex p-4">
        <Item
          label="صفحه اصلی"
          Icon={Logo}
          withTooltip
          NavLinkProps={{ to: '/', end: true }}
        />
      </div>
      <Separator />
      <div className="flex flex-col gap-5 p-4">
        {items.map(({ label, to, icon }) => (
          <Item
            key={to}
            label={label}
            Icon={icon}
            withTooltip
            disabled={to === 'none'}
            NavLinkProps={{ to }}
          />
        ))}
      </div>
    </div>
  )
}

type ItemProps = {
  label: string
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  disabled?: boolean
  withTooltip?: boolean
  NavLinkProps: NavLinkProps
}
function Item({ label, Icon, disabled, withTooltip, NavLinkProps }: ItemProps) {
  return (
    <button
      className="group/btn size-(--item-size) not-[:disabled]:cursor-pointer disabled:pointer-events-none"
      disabled={disabled}
    >
      <NavLink
        {...NavLinkProps}
        className="relative isolate block size-full cursor-[inherit] transition-[color] group-disabled/btn:text-black/30 group-[:not(:disabled)]/btn:text-black/85 [&.active]:text-white"
      >
        {!disabled && withTooltip && (
          <span
            aria-hidden="true"
            className="absolute top-1/2 right-full z-[999] mr-4 h-(--btn-size) -translate-y-1/2 rounded-sm bg-black px-2.5 py-1.5 text-xs text-nowrap text-white opacity-0 transition-[opacity] group-hover/btn:opacity-100 group-[:not(:hover)]/btn:delay-100 before:absolute before:top-1/2 before:left-full before:-ml-1.5 before:size-2.5 before:-translate-y-1/2 before:rotate-45 before:rounded-[1px] before:bg-black before:content-['']"
          >
            {label}
          </span>
        )}
        <span className="absolute -inset-1.5 -z-[1] rounded-md transition-[background-color] group-hover/btn:bg-black/10 group-has-[.active]/btn:bg-black/85" />
        <Icon className="size-(--item-size)" />
      </NavLink>
    </button>
  )
}
