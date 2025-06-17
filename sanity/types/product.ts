export interface ProductImage {
  url: string
  alt: string
  dimensions: {
    width: number
    height: number
    aspectRatio: number
  }
}

export interface ProductSpecification {
  name: string
  value: string
}

export interface ProductSEO {
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
}

export interface ProductCategory {
  _id: string
  name: string
  slug: string
}

export interface Product {
  _id: string
  name: string
  slug: string
  gallery: ProductImage[]
  price: number
  currency: 'RUB' | 'USD' | 'EUR'
  description: any[] // Portable Text array
  specifications: ProductSpecification[]
  stock: number
  isAvailable: boolean
  seo: ProductSEO
  categories: ProductCategory[]
  tags: string[]
}

// Query Parameters Types
export interface GetProductBySlugParams {
  slug: string
}

export interface GetProductsByCategoryParams {
  categoryId: string
}

export interface GetProductsByTagParams {
  tag: string
}

export interface SearchProductsParams {
  searchTerm: string
}

export interface GetRelatedProductsParams {
  currentProductId: string
  categoryIds: string[]
  tags: string[]
} 