import { sanityFetch } from '../lib/live'
import type {
  Product,
  GetProductBySlugParams,
  GetProductsByCategoryParams,
  GetProductsByTagParams,
  SearchProductsParams,
  GetRelatedProductsParams
} from '../types/product'

export const productFields = `
  _id,
  name,
  "slug": slug.current,
  gallery[] {
    "url": asset->url,
    "alt": alt,
    "dimensions": asset->metadata.dimensions
  },
  price,
  currency,
  description[] {
    ...,
    markDefs[] {
      ...,
      _type == "internalLink" => {
        "slug": @.reference->slug.current
      }
    }
  },
  specifications[] {
    name,
    value
  },
  stock,
  isAvailable,
  seo {
    metaTitle,
    metaDescription,
    keywords
  },
  categories[]-> {
    _id,
    name,
    "slug": slug.current
  },
  tags
`

export const getAllProductsQuery = `*[_type == "product"] {
  ${productFields}
}`

export const getProductBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  ${productFields}
}`

export const getProductsByCategoryQuery = `*[_type == "product" && $categoryId in categories[]._ref] {
  ${productFields}
}`

export const getProductsByTagQuery = `*[_type == "product" && $tag in tags] {
  ${productFields}
}`

export const getAvailableProductsQuery = `*[_type == "product" && isAvailable == true] {
  ${productFields}
}`

export const getProductsInStockQuery = `*[_type == "product" && stock > 0] {
  ${productFields}
}`

// Query for product search with optional filters
export const searchProductsQuery = `*[_type == "product" && (
  name match $searchTerm ||
  description[].children[].text match $searchTerm
)] {
  ${productFields}
}`

// Query for related products (by category or tags)
export const getRelatedProductsQuery = `*[_type == "product" && _id != $currentProductId] | order(_createdAt desc)[0...4] {
  ${productFields}
}`

// Helper functions to fetch data with proper typing
export async function getAllProducts(): Promise<Product[]> {
  const { data } = await sanityFetch({
    query: getAllProductsQuery,
  });
  return data ?? [];
}

export async function getProductBySlug(params: GetProductBySlugParams): Promise<Product | null> {
  const { data } = await sanityFetch({
    query: getProductBySlugQuery,
    params: { slug: params.slug },
  });
  return data ?? null;
}

export async function getProductsByCategory(params: GetProductsByCategoryParams): Promise<Product[]> {
  const { data } = await sanityFetch({
    query: getProductsByCategoryQuery,
    params: { categoryId: params.categoryId },
  });
  return data ?? [];
}

export async function getProductsByTag(params: GetProductsByTagParams): Promise<Product[]> {

  return [];
}

export async function getAvailableProducts(): Promise<Product[]> {
  const { data } = await sanityFetch({
    query: getAvailableProductsQuery,
  });
  return data ?? [];
}

export async function getProductsInStock(): Promise<Product[]> {
  const { data } = await sanityFetch({
    query: getProductsInStockQuery,
  });
  return data ?? [];
}

export async function searchProducts(params: SearchProductsParams): Promise<Product[]> {
  const { data } = await sanityFetch({
    query: searchProductsQuery,
    params: { searchTerm: params.searchTerm },
  });
  return data ?? [];
}

export async function getRelatedProducts(params: GetRelatedProductsParams): Promise<Product[]> {
  const { data } = await sanityFetch({
    query: getRelatedProductsQuery,
    params: { currentProductId: params.currentProductId, },
  });
  return data ?? [];
}
