import algoliaSearch from 'algoliasearch'
import type { AlgoliaSearchOptions, SearchClient } from 'algoliasearch'

export function algoliaClient(
  appId: string,
  apiKey: string,
  options?: AlgoliaSearchOptions,
): SearchClient {
  return algoliaSearch(appId, apiKey, options)
}
