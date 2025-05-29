import React from 'react'

export interface SocialsItemProps {
    social: {
        href: string
        iconClass: string
    }
}

export const SocialsItem = ({social}: SocialsItemProps) => {
    return (
        <a href={social.href} className="transition-colors cursor-pointer hover:text-primary inline-flex items-center justify-center">
            <i className={`${social.iconClass} text-2xl`}></i>
        </a>
    )
}
