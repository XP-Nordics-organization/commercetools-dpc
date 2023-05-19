'use client'

import { ReactNode, useState } from 'react'
import { Button, Text } from '@commercetools-dpc/web-ui'

export function ClientComponent({ children }: { children?: ReactNode }) {
  const [count, setCount] = useState(0)

  return (
    <div className={'flex flex-col gap-4 border border-red-500 p-4'}>
      <Text type={'body'}>This is the client component</Text>
      <div>
        <Button onClick={() => setCount(count + 1)}>
          <>Clicks: {count}</>
        </Button>
      </div>
      {children && (
        <>
          <Text>Children:</Text>
          {children && <div>{children}</div>}
        </>
      )}
    </div>
  )
}
