import React from "react";

const SadFaceIcon = ({size = 120}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 240 240"
        aria-label="Грустный смайлик"
        role="img"
    >
        <defs>
            <radialGradient id="g1" cx="35%" cy="25%" r="80%">
                <stop offset="0%" stopColor="hsl(141, 39%, 40%)"/>
                <stop offset="100%" stopColor="hsl(141, 39%, 25%)"/>
            </radialGradient>
        </defs>

        <circle cx="120" cy="120" r="96" fill="url(#g1)"/>

        <g fill="#1f2a44" opacity="0.95">
            <ellipse cx="88" cy="100" rx="10" ry="14"/>
            <ellipse cx="152" cy="100" rx="10" ry="14"/>
        </g>

        <path
            d="M68 84 Q88 70 108 82"
            fill="none"
            stroke="#1f2a44"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
        />
        <path
            d="M132 82 Q152 70 172 84"
            fill="none"
            stroke="#1f2a44"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
        />

        <path
            d="M80 160 Q120 140 160 160"
            fill="none"
            stroke="#1f2a44"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
        />

        <path
            d="M160 118
         C168 132, 168 146, 156 154
         C150 159, 146 158, 142 152
         C138 146, 142 134, 148 126
         C152 120, 156 116, 160 118 Z"
            fill="#58a6ff"
            opacity="0.95"
        />

        <ellipse cx="92" cy="76" rx="18" ry="10" fill="#ffffff" opacity="0.08"/>
    </svg>
);

export default SadFaceIcon;
