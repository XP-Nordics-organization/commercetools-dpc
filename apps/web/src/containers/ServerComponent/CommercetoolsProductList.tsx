import { LocalizedString, ProductsResponse } from '@commercetools-dpc/types'
import { Card } from '@commercetools-dpc/web-ui'
import Link from 'next/link'

export interface Product {
  id: string
  name: LocalizedString
  price: number
  imageUrl: string
  description: LocalizedString
}

const CommercetoolsProductList = async () => {
  const baseUrl = String(process.env.COMMERCETOOLS_BASE_URL)
  const projectKey = String(process.env.COMMERCETOOLS_PROJECT_KEY)
  const bearerToken = String(process.env.COMMERCETOOLS_TOKEN)

  // const url =
  //   'https://api.europe-west1.gcp.commercetools.com/myprojectkey/products'
  const url = `${baseUrl}/${projectKey}/products`

  const result = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
  })

  if (!result.ok)
    throw Error(
      "Couldn't fetch commercetools products " +
        result.status +
        ' ' +
        result.statusText,
    )

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
          <Card
            key={product.id}
            {...product}
            renderProps={() => {
              return (
                <Link href={`/commercetools/${product.id}`}>
                  <img
                    className="p-8 rounded-t-lg cursor-pointer w-full"
                    src={product.imageUrl}
                    alt={product.name}
                  />
                </Link>
              )
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default CommercetoolsProductList as unknown as () => JSX.Element
