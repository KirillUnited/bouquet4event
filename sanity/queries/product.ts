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
export const getRelatedProductsQuery = `*[_type == "product" && _id != $currentProductId && (
  count((categories[]->_id)[@ in $categoryIds]) > 0 ||
  count((tags)[@ in $tags]) > 0
)] | order(_createdAt desc)[0...4] {
  ${productFields}
}`
