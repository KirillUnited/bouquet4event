import React from "react";
import {Statistics} from "@/sanity.types";

export default function StatInfoList({items}: Statistics) {
    if (!items?.length) return null;

    return (
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {items?.map(({_key, value, label}) => (
                <li key={_key} className="text-center backdrop-blur-lg bg-background/30 rounded-lg shadow-sm p-4 ring-1 ring-primary/20">
                    <p className="text-3xl font-bold text-primary mb-2">{value}</p>
                    <p className="font-normal">{label}</p>
                </li>
            ))}
        </ul>
    )
}