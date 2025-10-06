import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const wizardFormQuery = groq`
  _type == "wizard-form" => {
    steps[]{
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
    },
  }
`;
export const formRegisterQuery = groq`
  _type == "form-register" => {
    _type,
    _key,
    padding,
    colorVariant,
    stackAlign,
    title,
    description,
    form {
      ...,
      ${wizardFormQuery}
    },
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