import AlgoliaProduct from 'containers/ServerComponent/AlgoliaProduct'

export default async function Page({ params }) {
  const { objectId } = params

  return <AlgoliaProduct objectId={objectId} />
}
