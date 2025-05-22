import Link from "next/link";
import Logo from "@/components/logo";
import { NAV_ITEMS } from "@/constants";
import { InstagramIcon } from "lucide-react";

export default function Footer() {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer>
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="mb-4">
              Сервис коллективной цветочной подписки
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="transition-colors cursor-pointer"
              >
                <i className="fa-brands fa-instagram text-2xl"></i>
              </a>
              <a
                href="#"
                className="transition-colors cursor-pointer"
              >
                <i className="fa-brands fa-telegram text-2xl"></i>
              </a>
              <a
                href="#"
                className="transition-colors cursor-pointer"
              >
                <i className="fa-brands fa-whatsapp text-2xl"></i>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Контакты</h3>
            <p className="mb-2">
              <i className="fa-solid fa-phone mr-2"></i> +7 (495) 123-45-67
            </p>
            <p className="mb-2">
              <i className="fa-solid fa-envelope mr-2"></i> info@flowerfund.ru
            </p>
            <p>
              <i className="fa-solid fa-location-dot mr-2"></i> Москва, ул.
              Цветочная, 15
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Информация</h3>
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
            <h3 className="text-xl font-semibold mb-4">Способы оплаты</h3>
            <div className="flex space-x-4">
              <i className="fa-brands fa-cc-visa text-3xl"></i>
              <i className="fa-brands fa-cc-mastercard text-3xl"></i>
              <i className="fa-brands fa-cc-apple-pay text-3xl"></i>
              <i className="fa-solid fa-credit-card text-3xl"></i>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm">
          <p>© {getCurrentYear()} Bouquet4Event. Все права защищены.</p>
        </div>
      </div>
    </footer>

  );
}
