import { groq } from "next-sanity";

export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0]`;