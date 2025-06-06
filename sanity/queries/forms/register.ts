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
    privacyPolicyText,
    buttonText,
    successMessage,
  }
`;
