import CommercetoolsProductList from 'containers/ServerComponent/CommercetoolsProductList'

export default async function Page() {
  return (
    <div className={'flex flex-col gap-4'}>
      <CommercetoolsProductList />
    </div>
  )
}
