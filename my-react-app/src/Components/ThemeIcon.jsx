import React from 'react';

const ThemeIcon = ({DarkMood}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke={"currentColor"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {DarkMood=='dark'? <path d="M12 3h.01M3.681 11.643a7.5 7.5 0 1 0 10.619 10.619a9 9 0 1 1-10.619-10.619M12 19v.01" /> : <path d="M12 5.01v.01M18.319 11.643a7.5 7.5 0 1 0-10.619 10.619a9 9 0 1 1 10.619-10.619" />}
    </svg>
);

export default ThemeIcon;