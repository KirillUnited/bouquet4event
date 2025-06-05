import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const BREADCRUMBS_QUERY = groq`
    _type == "breadcrumbs" => {
      _type,
      _key,
      padding,
      colorVariant,
      crumbs,
      hideCurrent,
    }
`;