import AlgoliaProduct from 'containers/ServerComponent/AlgoliaProduct'

export default async function Page({ params }) {
  const { productid } = params

  return <AlgoliaProduct objectId={productid} />
}
