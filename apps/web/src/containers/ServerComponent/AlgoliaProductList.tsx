import { Card } from '@commercetools-dpc/web-ui'
import { useProducts } from 'contexts/ProductsContext'
import Link from 'next/link'

const AlgoliaProductList = () => {
  const { state } = useProducts()

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  })

  const algoliaHits: Array<{
    id: string
    name: string
    slug: string
    categories: Record<string, string>
    image: string
    price: string
    isInStock: boolean
    rating: number
  }> = state.data.hits?.map((hit) => {
    const randomRating = Math.floor(Math.random() * 5) + 1

    return {
      id: hit.objectID,
      name: hit.name.en,
      slug: hit.slug.en,
      categories: hit.categories.en,
      image: hit.images[0],
      price: formatter.format(hit.prices.EUR.customerGroups[2].price / 100),
      isInStock: hit.isInStock,
      rating: randomRating,
    }
  })

  // algoliaHits?.sort((a, b) => {
  //   const aN = Number(a.price.replace(/[^0-9.-]+/g, ''))
  //   const bN = Number(b.price.replace(/[^0-9.-]+/g, ''))

  //   return aN - bN
  // })

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 justify-items-center gap-x-5 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
        {algoliaHits?.map((hit) => (
          <Card
            key={hit.id}
            imageUrl={hit.image}
            id={hit.id}
            name={hit.name}
            price={hit.price}
            rating={hit.rating}
            renderProps={() => (
              <Link href={`/algolia/${hit.id}`}>
                <img
                  className="w-full cursor-pointer rounded-t-lg p-8"
                  src={hit.image}
                  alt={hit.name}
                />
              </Link>
            )}
          />
        ))}
      </div>
    </div>
  )
}

export default AlgoliaProductList as unknown as () => JSX.Element
