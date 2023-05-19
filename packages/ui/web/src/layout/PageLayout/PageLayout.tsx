import React from 'react'

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full min-h-screen h-full  bg-white">{children}</div>
}
