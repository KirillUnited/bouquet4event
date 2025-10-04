import { groq } from "next-sanity";

export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0]{
  ...,
  siteContactInfo,
  mainNavigation{
    ...,
    menuItems[]{
      ...,
      pageReference->{
        _id,
        title,
        "slug": slug.current
      }
    }
  },
  footerNavigation[]{
    ...,
    menuItems[]{
      ...,
      pageReference->{
        _id,
        title,
        "slug": slug.current
      }
    }
  }
}`;