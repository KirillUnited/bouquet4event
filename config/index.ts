export const NAV_ITEMS = [
  {
    label: "Главная",
    href: "/index",
    target: false,
  },
  {
    label: "Как это работает",
    href: "#howitworks",
    target: false,
  },
  {
    label: "Преимущества",
    href: "#benefits",
    target: false,
  },
  {
    label: "О нас",
    href: "/about",
    target: false,
  },
  {
    label: "Контакты",
    href: "/contacts",
    target: false,
  },
];

export const Socials = {
    INSTAGRAM: "instagram",
    FACEBOOK: "facebook",
    TELEGRAM: "telegram",
    WHATSAPP: "whatsapp",
    VIBER: "viber",
    VK: "vk",
    YOUTUBE: "youtube",
    TWITTER: "twitter",
}

export const SocialsFAClasses = {
    [Socials.INSTAGRAM]: "fa-brands fa-instagram",
    [Socials.FACEBOOK]: "fa-brands fa-facebook",
    [Socials.TELEGRAM]: "fa-brands fa-telegram",
    [Socials.WHATSAPP]: "fa-brands fa-whatsapp",
    [Socials.VIBER]: "fa-brands fa-viber",
    [Socials.VK]: "fa-brands fa-vk",
    [Socials.YOUTUBE]: "fa-brands fa-youtube",
    [Socials.TWITTER]: "fa-brands fa-twitter",
}

export const PaymentSliderConfig = {
  MIN: 4000,
  MAX: 20000,
  STEP: 500,
} as const;
