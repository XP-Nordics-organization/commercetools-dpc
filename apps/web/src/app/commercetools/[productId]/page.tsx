import Product from 'containers/ClientComponent/Product'
import AlgoliaProduct from 'containers/ServerComponent/AlgoliaProduct'

export default async function Page({ params }) {
  const { productId } = params

  const baseUrl = String(process.env.COMMERCETOOLS_BASE_URL)
  const projectKey = String(process.env.COMMERCETOOLS_PROJECT_KEY)
  const bearerToken = String(process.env.COMMERCETOOLS_TOKEN)
  const url = `${baseUrl}/${projectKey}/products/${productId}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok)
    throw Error(
      "Couldn't fetch commercetools product " +
        response.status +
        ' ' +
        response.statusText,
    )

  const json = await response.json()
  const product = json.masterData.current
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  })

  const productProperties = {
    name: String(product.name.en || 'Unknown'),
    price: formatter.format(
      product.masterVariant.prices[0].value.centAmount / 100,
    ),
    imageUrl: String(product.masterVariant.images[0].url),
    description: String(product.metaDescription?.en || ''),
    designer: String(
      product.masterVariant.attributes.find((a) => a.name === 'designer').value
        .label,
    ),
    rating: Math.floor(Math.random() * 5) + 1,
  }

  return <Product {...productProperties} />
}
