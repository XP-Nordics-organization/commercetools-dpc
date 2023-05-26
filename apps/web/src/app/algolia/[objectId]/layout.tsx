import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="container px-5 py-24 mx-auto">{children}</div>
}
