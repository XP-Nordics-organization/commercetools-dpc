'use client'

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react'

type Action =
  | { type: 'populate'; payload: Record<string, any> }
  | { type: 'queryString'; payload: string }

type Dispatch = (action: Action) => void
type State = {
  data: Record<string, any>
  query: string
}
type ProductsProviderProps = { children: ReactNode }

const ProductsStateContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined)

function productsReducer(state: State, action: Action) {
  switch (action.type) {
    case 'populate': {
      return {
        ...state,
        data: action.payload,
      }
    }
    case 'queryString':
      return {
        ...state,
        query: action.payload,
      }
    // default: {
    //   throw new Error(`Unhandled action type: ${action.type}`)
    // }
  }
}

function ProductsProvider({ children }: ProductsProviderProps) {
  const [state, dispatch] = useReducer(productsReducer, { data: {}, query: '' })

  const value = { state, dispatch }

  useEffect(() => {
    const algoliaAppId = String(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID)
    const algoliaApiKey = String(process.env.NEXT_PUBLIC_ALGOLIA_API_KEY)
    const algoliaIndexName = String(process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME)
    const algoliaUrl = `https://${algoliaAppId}-dsn.algolia.net/1/indexes/${algoliaIndexName}`

    const initProducts = async () => {
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

      const json = await algoliaResponse.json()

      return json
    }

    initProducts().then((data) => dispatch({ type: 'populate', payload: data }))
  }, [])

  return (
    <ProductsStateContext.Provider value={value}>
      {children}
    </ProductsStateContext.Provider>
  )
}

function useProducts() {
  const context = useContext(ProductsStateContext)

  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }
  return context
}

export { ProductsProvider, useProducts }
