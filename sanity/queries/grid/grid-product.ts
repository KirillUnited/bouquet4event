import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const gridProductQuery = groq`
  _type == "grid-product" => {
    _type,
    _key,
    _id,
    product-> {
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
    }
  }
`;
