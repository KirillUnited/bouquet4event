import { SocialsFAClasses } from '@/config';
import Link from 'next/link';
import React from 'react'

interface SocialsItemProps {
    platform?: string;
    url?: string;
}

export const SocialsItem = ({ platform, url }: SocialsItemProps) => {
    const iconClassName = `${platform ? SocialsFAClasses[platform] : ''} text-2xl`;
    
    return (
        <Link href={url || "#"} className="transition-colors cursor-pointer hover:text-primary inline-flex items-center justify-center">
            <i className={iconClassName}></i>
        </Link>
    )
}
