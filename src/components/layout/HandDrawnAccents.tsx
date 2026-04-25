import React from 'react';

export const CircleHighlight = ({ className = "" }: { className?: string }) => (
  <svg
    className={`absolute -z-10 text-primary opacity-20 ${className}`}
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M50 5C25.147 5 5 25.147 5 50C5 74.853 25.147 95 50 95C74.853 95 95 74.853 95 50C95 25.147 74.853 5 50 5Z"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeDasharray="4 8"
    />
  </svg>
);

export const UnderlineHighlight = ({ className = "" }: { className?: string }) => (
  <svg
    className={`absolute -bottom-2 left-0 w-full text-secondary opacity-40 ${className}`}
    viewBox="0 0 100 20"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 15Q50 5 95 15"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
    />
  </svg>
);
