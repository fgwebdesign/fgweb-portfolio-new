'use client';

import type { ReactNode } from 'react';

interface CodeLineProps {
  number: number;
  children: ReactNode;
}

/** Línea de código individual con número de línea, estilo editor. */
export function CodeLine({ number, children }: CodeLineProps) {
  return (
    <div className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2">
      <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">
        {number}
      </span>
      <span>{children}</span>
    </div>
  );
}

export const codeColors = {
  keyword: '#c586c0',
  variable: '#9cdcfe',
  punctuation: '#d4d4d4',
  string: '#ce9178',
} as const;
