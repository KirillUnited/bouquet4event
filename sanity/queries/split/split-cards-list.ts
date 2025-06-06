import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const splitCardsListQuery = groq`
  _type == "split-cards-list" => {
    _type,
    _key,
    list[]{
      image{
        ...,
        asset->{
          _id,
          url,
          mimeType,
          metadata {
            lqip,
            dimensions {
              width,
              height
            }
          }
        },
        alt
      },
      icon,
      tagLine,
      title,
      body[]{
        ...,
        _type == "image" => {
          ...,
          asset->{
            _id,
            url,
            mimeType,
            metadata {
              lqip,
              dimensions {
                width,
                height
              }
            }
          }
        }
      },
    },
  }
`;
