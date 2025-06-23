import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { NAV_ITEMS } from "@/config";
import { ContactList, SocialsList } from "../shared/socials";
import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries/site";
import { PaymentContainer } from "@/components/shared/site";
import { getCurrentYear } from "@/lib/utils";

export default async function Footer() {
  const { data: siteSettings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const phones = siteSettings?.siteContactInfo?.phones;
  const emails = siteSettings?.siteContactInfo?.emails;
  const address = siteSettings?.siteContactInfo?.address;
  const workingHours = siteSettings?.siteContactInfo?.workingHours;
  const contacts = {
    phones,
    emails,
    address,
    workingHours
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12 flex flex-col gap-8">
        <div className="flex flex-wrap justify-between gap-4">
          <div>
            <div className="w-32"><Logo /></div>
            <p className="text-sm">
              Сервис коллективной цветочной подписки
            </p>
          </div>
          <SocialsList className="items-start" items={siteSettings?.siteContactInfo?.socialLinks} />
        </div>
        <div className="flex flex-wrap flex-col md:flex-row justify-between gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Контакты</h3>
            <ContactList items={{ _type: "contactInfo", ...contacts }} />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Карта сайта</h3>
            <ul className="space-y-2">
              {NAV_ITEMS.map((navItem) => (
                <li key={navItem.label}>
                  <Link
                    href={navItem.href}
                    className="transition-colors"
                  >
                    {navItem.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Информация</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={"/privacy"}
                  className="transition-colors"
                >
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link
                  href={"/agreement"}
                  className="transition-colors"
                >
                  Пользовательское соглашение
                </Link>
              </li>
              <li>
                <Link
                  href={"/publichnaya-oferta"}
                  className="transition-colors"
                >
                  Публичная оферта
                </Link>
              </li>
              <li>
                <Link
                  href={"/dostavka-i-oplata"}
                  className="transition-colors"
                >
                  Доставка и оплата
                </Link>
              </li>
            </ul>
          </div>
          <PaymentContainer paymentMethods={siteSettings?.paymentMethod} />
        </div>
        <div className="border-t border-foreground/20 mt-8 pt-8 text-center text-sm">
          <p>
            {siteSettings?.siteLegalInfo}
          </p>
          <p>© {getCurrentYear()} Bouquet4Event. Все права защищены.</p>
        </div>
      </div>
    </footer>

  );
}
