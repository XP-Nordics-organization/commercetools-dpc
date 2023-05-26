'use client'

import { LoadMoreButton } from '@commercetools-dpc/web-ui'
import AlgoliaProductList from 'containers/ServerComponent/AlgoliaProductList'
import { useProducts } from 'contexts/ProductsContext'
import { useState } from 'react'

export const AlgoliaProductListContainer = () => {
  const [fetchStatus, setFetchStatus] = useState({
    isLoading: false,
    shouldLoadMore: true,
  })
  const { state, dispatch } = useProducts()

  const handleLoadMore = async () => {
    if (state.data.nbHits <= state.data.hits.length) {
      setFetchStatus({ isLoading: false, shouldLoadMore: false })
      return
    }

    setFetchStatus((prev) => ({ ...prev, isLoading: true }))

    const params = new URLSearchParams({
      hitsPerPage: String(state.data.hitsPerPage + 10 ?? ''),
      query: String(state.data.query ?? ''),
    })

    const algoliaAppId = String(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID)
    const algoliaApiKey = String(process.env.NEXT_PUBLIC_ALGOLIA_API_KEY)
    const algoliaIndexName = String(process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME)
    const algoliaUrl = `https://${algoliaAppId}-dsn.algolia.net/1/indexes/${algoliaIndexName}?${params.toString()}`

    const algoliaResponse = await fetch(`${algoliaUrl}`, {
      method: 'GET',
      headers: {
        'X-Algolia-API-Key': algoliaApiKey,
        'X-Algolia-Application-Id': algoliaAppId,
        'Content-Type': 'application/json',
      },
    })
    if (!algoliaResponse.ok) {
      setFetchStatus((prev) => ({ ...prev, isLoading: false }))
      throw Error('Could not fetch algolia search results ' + algoliaResponse)
    }

    const json = await algoliaResponse.json()

    setFetchStatus((prev) => ({ ...prev, isLoading: false }))
    dispatch({ type: 'populate', payload: json })
  }

  return (
    <div className="mb-10 flex flex-col items-center gap-4">
      <AlgoliaProductList />
      <LoadMoreButton
        isLoading={fetchStatus.isLoading}
        onClick={handleLoadMore}
        shouldLoadMore={fetchStatus.shouldLoadMore}
      />
    </div>
  )
}
