import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const formRegisterQuery = groq`
  _type == "form-register" => {
    _type,
    _key,
    padding,
    colorVariant,
    stackAlign,
    title,
    description,
    steps[] {
        title,
        description,
        fields[] {
          fieldType,
          name,
          label,
          isRequired,
          defaultValue,
          options[] {
            title,
            value,
            emoji,
            description
          }
        }
      }
    privacyPolicyText,
    buttonText,
    successMessage,
    goal
  }
`;

export const REGISTER_QUERY = groq`*[_type == "page" && slug.current == $slug][0]{
  blocks[]{
    ${formRegisterQuery},
  }
}`;