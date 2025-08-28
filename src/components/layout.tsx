import { Outlet } from 'react-router'
import Sidebar from './sidebar'

export default function Layout() {
  return (
    <div className="font-persian flex h-svh w-svw">
      <Sidebar />
      <Outlet />
    </div>
  )
}
