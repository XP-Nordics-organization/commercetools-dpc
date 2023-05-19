export interface LocalizedString {
  [language: string]: string
}

export interface ProductsResponse {
  results: Array<{
    id: string
    masterData: MasterData
    key: string
  }>
}

export interface MasterData {
  current: Current
  published: boolean
  hasStagedChanges: boolean
}

export interface Current {
  name: LocalizedString
  categories: CategoryReference[]
  categoryOrderHints: Record<string, unknown>
  slug: LocalizedString
  metaDescription?: LocalizedString
  masterVariant: MasterVariant
}

export interface CategoryReference {
  typeId: string
  id: string
}

export interface MasterVariant {
  id: number
  sku: string
  key: string
  prices: Price[]
  images: Image[]
}

export interface Price {
  id: string
  value: PriceValue
}

export interface PriceValue {
  type: string
  currencyCode: string
  centAmount: number
  fractionDigits: number
}

export interface Image {
  url: string
  dimensions: Dimensions
}

export interface Dimensions {
  w: number
  h: number
}
