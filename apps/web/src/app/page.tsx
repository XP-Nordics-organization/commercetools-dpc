import { headers } from 'next/headers'

// import { ITodo } from '@commercetools-dpc/types'
import EcommercetoolsProductList from 'containers/ServerComponent/EcommercetoolsProductList'
import AlgoliaProductList from 'containers/ServerComponent/AlgoliaProductList'

export default async function Page() {
  const headersList = headers()

  const host = headersList.get('host') || ''
  const protocol = headersList.get('x-forwarded-proto') || ''
  const apiUrl = protocol + '://' + host + '/api/todos'

  const protocol2 = headersList.get('referer')?.split('://')[0] || 'https'

  // ISR example
  // const result = await fetch(apiUrl, {
  //   next: { revalidate: 60, tags: ['todos'] },
  // })
  // const todos: ITodo[] = await result.json()

  return (
    <div className={'flex flex-col gap-4'}>
      {/* <EcommercetoolsProductList /> */}
      <AlgoliaProductList />
    </div>
  )
}
