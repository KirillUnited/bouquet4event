import { groq } from "next-sanity";
import { gridCardQuery } from "@/sanity/queries/grid/grid-card";
import { pricingCardQuery } from "@/sanity/queries/grid/pricing-card";
import { gridPostQuery } from "@/sanity/queries/grid/grid-post";
import {gridProductQuery} from "@/sanity/queries/grid/grid-product";

// @sanity-typegen-ignore
export const gridRowQuery = groq`
  _type == "grid-row" => {
    _type,
    _key,
    padding,
    colorVariant,
    gridColumns,
    featuredProducts[]->{
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
    },
    columns[]{
      ${gridCardQuery},
      ${pricingCardQuery},
      ${gridPostQuery},
      ${gridProductQuery}
    },
  }
`;
