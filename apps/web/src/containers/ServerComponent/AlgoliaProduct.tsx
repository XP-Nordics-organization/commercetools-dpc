import { Product } from '@commercetools-dpc/web-ui'

export interface AlgoliaProductProps {
  objectId: string
}

const AlgoliaProduct = async (props: AlgoliaProductProps) => {
  const { objectId } = props

  const algoliaAppId = String(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID)
  const algoliaApiKey = String(process.env.NEXT_PUBLIC_ALGOLIA_API_KEY)
  const algoliaIndexName = String(process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME)
  const algoliaUrl = `https://${algoliaAppId}-dsn.algolia.net/1/indexes/${algoliaIndexName}/${objectId}`

  const algoliaResponse = await fetch(`${algoliaUrl}`, {
    method: 'GET',
    headers: {
      'X-Algolia-API-Key': algoliaApiKey,
      'X-Algolia-Application-Id': algoliaAppId,
      'Content-Type': 'application/json',
    },
  })
  if (!algoliaResponse.ok)
    throw Error('Could not fetch algolia search results ' + algoliaResponse)

  const product = await algoliaResponse.json()

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  })

  const price = formatter.format(
    product.prices.EUR.customerGroups[2].price / 100,
  )

  const colorVariant = product.searchableAttributes.color

  const color = {
    key: colorVariant.key,
    label: {
      en: colorVariant.label.en,
    },
  }

  const designer = product.searchableAttributes.designer.label
  const imageUrl = product.images[0]
  const name = product.name.en
  const rating = Math.floor(Math.random() * 5) + 1
  const productProperties = {
    name,
    price,
    imageUrl,
    description:
      product.description?.en ||
      'Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia ' +
        'microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. ' +
        'Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, ' +
        'neutra jean shorts keytar banjo tattooed umami cardigan',
    designer,
    rating,
  }

  return <Product {...productProperties} />
}

export default AlgoliaProduct as unknown as (
  props: AlgoliaProductProps,
) => JSX.Element
