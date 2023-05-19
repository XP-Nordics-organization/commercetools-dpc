'use client'
import { Card } from '@commercetools-dpc/web-ui'
import { useProducts } from 'containers/ClientComponent/contexts/ProductsContext'

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
      id: hit.productID,
      name: hit.name.en,
      slug: hit.slug.en,
      categories: hit.categories.en,
      image: hit.images[0],
      price: formatter.format(hit.prices.EUR.customerGroups[2].price / 100),
      isInStock: hit.isInStock,
      rating: randomRating,
    }
  })

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10 justify-items-center">
        {algoliaHits?.map((hit) => (
          <Card
            key={hit.id}
            imageUrl={hit.image}
            id={hit.id}
            name={hit.name}
            price={hit.price}
            rating={hit.rating}
          />
        ))}
      </div>
    </div>
  )
}

export default AlgoliaProductList as unknown as () => JSX.Element
