import React from 'react'

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-full min-h-screen w-full  bg-white">{children}</div>
}
