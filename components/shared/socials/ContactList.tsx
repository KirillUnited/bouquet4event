import { SITE_SETTINGS_QUERYResult } from '@/sanity.types';
import Link from 'next/link'
import React from 'react'

type ContactListProps = Extract<
    NonNullable<NonNullable<SITE_SETTINGS_QUERYResult>["siteContactInfo"]>,
    { _type: "contactInfo" }
>;

export default function ContactList({ items }: { items: ContactListProps }) {
    if (!items) return null;
    return (
        <ul>
            {
                items?.phones?.map(phone => (
                    <li className="mb-2" key={phone._key}>
                        <Link href={`tel:${phone.link}`}><i className="fa-solid fa-phone mr-2"></i> {phone.number}</Link>
                    </li>
                )
                )
            }
            {
                items?.emails?.map(email => (
                    <li className="mb-2" key={email._key}>
                        <Link href={`mailto:${email.link}`}><i className="fa-solid fa-envelope mr-2"></i> {email.email}</Link>
                    </li>
                )
                )
            }
            {
                items?.address?.map(address => (
                    <li className="mb-2" key={address._key}>
                        <i className="fa-solid fa-location-dot mr-2"></i> {address.location}
                    </li>
                ))
            }
            {
                items?.workingHours && (
                    <li className="mb-2" >
                        <i className="fa-solid fa-clock mr-2"></i> {items.workingHours}
                    </li>
                )
            }
        </ul>
    )
}
