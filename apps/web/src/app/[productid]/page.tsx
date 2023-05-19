import Product from 'containers/ClientComponent/Product'

export default async function Page({ params }) {
  const bearerToken = String(process.env.TOKEN)
  // const bearerToken = 'nQVnDM4MsTLKN5GT9CYxrGwWwBpSb6oP'
  const url = `https://api.europe-west1.gcp.commercetools.com/myprojectkey/products/${params.productid}`

  const result = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
  })

  if (!result.ok) throw Error('Could not fetch product', { cause: result.body })

  const data = await result.json()

  const product = data.masterData.current

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  })

  const price = formatter.format(
    data.masterData.current.masterVariant.prices[0].value.centAmount / 100,
  )

  const colorVariant = product.masterVariant.attributes.find(
    (a) => a.name === 'color',
  )
  const color = {
    key: colorVariant.value.key,
    label: {
      en: colorVariant.value.label.en,
    },
  }

  const designer = product.masterVariant.attributes.find(
    (a) => a.name === 'designer',
  ).value.label

  const randomRating = Math.floor(Math.random() * 5) + 1

  return (
    <Product
      name={product.name.en}
      description={product.metaDescription?.en || ''}
      imageUrl={product.masterVariant.images[0].url}
      price={price}
      designer={designer}
      color={color}
      rating={randomRating}
    />
  )
}
