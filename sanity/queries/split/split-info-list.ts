import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const splitInfoListQuery = groq`
  _type == "split-info-list" => {
    _type,
    _key,
    gridColumns,
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
      tags[],
    },
  }
`;
