import React from 'react'

export interface SocialsItemProps {
    social: {
        href: string
        iconClass: string
    }
}

export const SocialsItem = ({social}: SocialsItemProps) => {
    return (
        <a href={social.href} className="transition-colors cursor-pointer">
            <i className={`${social.iconClass} text-2xl`}></i>
        </a>
    )
}
