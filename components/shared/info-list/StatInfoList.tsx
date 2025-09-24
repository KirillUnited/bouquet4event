import React from "react";

export interface StatInfoListProps {
    items: {value: string; label: string; highlight?: boolean}[];
}

export default function StatInfoList({items}: StatInfoListProps) {
    if (!items?.length) return null;

    return (
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {items?.map(({value, label}) => (
                <li key={label} className="text-center backdrop-blur-lg bg-background/30 rounded-lg shadow-sm p-4 ring-1 ring-primary/10">
                    <p className="text-3xl font-bold text-primary mb-2">{value}</p>
                    <p className="font-normal text-foreground/70">{label}</p>
                </li>
            ))}
        </ul>
    )
}