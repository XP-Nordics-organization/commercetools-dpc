import { Text } from '@commercetools-dpc/web-ui'
import { ClientComponent } from 'containers/ClientComponent/ClientComponent'

export const ServerComponent = async () => {
  const result = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const json = await result.json()

  return (
    <div className={'flex flex-col gap-4 border border-blue-500 p-4'}>
      <Text>
        This is an async Server Component. It can fetch data asynchronously.
      </Text>

      <Text>{JSON.stringify(json)}</Text>
      <Text>
        It can be passed to a client component as props. But you cannot import a
        server component from a client component.
      </Text>
      <ClientComponent />
    </div>
  )
}

export default ServerComponent as unknown as () => JSX.Element
