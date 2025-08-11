import {groq} from "next-sanity";

export const ALL_USERS_QUERY = groq`*[_type == "userAccount"]{
    userId,
    name,
    totalAmount,
    date
    }`;

export const USER_BY_ID_QUERY = groq`*[_type == "userAccount" && userId == $userId][0]{
    userId,
    name,
    date,
    totalAmount,
    donations[] {
        userId,
        amount,
        date,
        email
    }
    }`;