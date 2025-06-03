import React from 'react'
import { SocialsItem } from './SocialsItem';
import { cn } from '@/lib/utils';
import { ContactInfo } from '@/sanity.types';
import { stegaClean } from 'next-sanity';

export interface SocialsListProps {
    items: ContactInfo['socialLinks'];
    className?: string;
}

export const SocialsList = ({ items, className }: SocialsListProps) => {
    if (!Array.isArray(items) || items.length === 0) return null;

    return (
        <ul className={cn('flex gap-4 items-center', className)}>
            {
                items?.map((item) => {
                    return (
                        <li key={item._key} className='flex items-center'>
                            <SocialsItem platform={stegaClean(item.platform)} url={item.url} />
                        </li>
                    );
                })
            }
        </ul>
    );
};
