import { LocalizedString, ProductsResponse } from '@commercetools-dpc/types'
import { Card } from '@commercetools-dpc/web-ui'

export interface Product {
  id: string
  name: LocalizedString
  price: number
  imageUrl: string
  description: LocalizedString
}

const EcommercetoolsProductList = async () => {
  const bearerToken = String(process.env.TOKEN)
  // const bearerToken = 'nQVnDM4MsTLKN5GT9CYxrGwWwBpSb6oP'
  const url =
    'https://api.europe-west1.gcp.commercetools.com/myprojectkey/products'

  const result = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
  })

  const json: ProductsResponse = await result.json()

  const products = json.results.map((result) => {
    const currentData = result.masterData.current
    const masterVariant = currentData.masterVariant

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
    })
    const price = formatter.format(
      masterVariant.prices[0].value.centAmount / 100,
    )
    const imageUrl = masterVariant.images[0].url

    const randomRating = Math.floor(Math.random() * 5) + 1

    const product = {
      id: result.id,
      name: currentData.name.en || 'No name',
      price,
      imageUrl,
      description:
        currentData.metaDescription?.en ||
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, ' +
          'nisl eget aliquam ultricies, nunc nisl aliquet nunc, eget aliquam nisl nunc sit amet nisl.',
      rating: randomRating,
    }

    return product
  })

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10 justify-items-center">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}

export default EcommercetoolsProductList as unknown as () => JSX.Element
