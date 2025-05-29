import React from 'react'
import { SocialsItem } from './SocialsItem';
import { cn } from '@/lib/utils';

const SOCIALS = [
    { href: "#", iconClass: "fa-brands fa-instagram" },
    { href: "#", iconClass: "fa-brands fa-telegram" },
    { href: "#", iconClass: "fa-brands fa-whatsapp" },
];

export interface SocialsListProps {
    items?: { href: string, iconClass: string }[];
    className?: string;
}

export const SocialsList = ({ items = SOCIALS, className }: SocialsListProps) => {

    if (!Array.isArray(items) || items.length === 0) return null;

    return (
        <ul className={cn('flex gap-4 items-center', className)}>
            {items.map((social, index) => (
                <li key={index} className='flex items-center'>
                    <SocialsItem social={social} />
                </li>
            ))}
        </ul>
    );
};
