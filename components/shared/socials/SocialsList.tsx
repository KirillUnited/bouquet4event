import React from 'react'
import { SocialsItem } from './SocialsItem';

const SOCIALS = [
    { href: "#", iconClass: "fa-brands fa-instagram" },
    { href: "#", iconClass: "fa-brands fa-telegram" },
    { href: "#", iconClass: "fa-brands fa-whatsapp" },
];

export const SocialsList = ({ items = SOCIALS }) => {

    if (!Array.isArray(items) || items.length === 0) return null;

    return (
        <ul className="flex gap-4 items-center">
            {items.map((social, index) => (
                <li key={index}>
                    <SocialsItem social={social} />
                </li>
            ))}
        </ul>
    );
};
