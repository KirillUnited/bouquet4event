import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const LINK_QUERY = groq`
	...,
	internal->{
		_type,
		title,
		metadata
	}
`;

// @sanity-typegen-ignore
export const BREADCRUMBS_QUERY = groq`
    _type == "breadcrumbs" => { crumbs[]{ ${LINK_QUERY} } }
`;