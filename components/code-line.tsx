'use client';

import type { ReactNode } from 'react';

interface CodeLineProps {
  number: number;
  children: ReactNode;
}

/** Línea de código individual con número de línea, estilo editor. */
export function CodeLine({ number, children }: CodeLineProps) {
  return (
    <div className="flex group transition-colors duration-150 -mx-2 px-2 select-none hover:bg-[#313244]">
      <span
        style={{ color: codeTheme.lineNumber }}
        className="select-none mr-4 text-right w-6 shrink-0"
      >
        {number}
      </span>
      <span>{children}</span>
    </div>
  );
}

/** Paleta Catppuccin Mocha / Cursor dark — coincide con el editor del proyecto. */
export const codeTheme = {
  background: '#1e1e2e',
  header: '#181825',
  border: '#313244',
  lineNumber: '#6c7086',
  lineHover: '#313244',
  keyword: '#cba6f7',
  type: '#89dceb',
  variable: '#cdd6f4',
  property: '#cdd6f4',
  punctuation: '#9399b2',
  string: '#fab387',
  number: '#f9e2af',
  comment: '#6c7086',
  function: '#89b4fa',
} as const;

/** Alias corto para spans inline en las ventanas del hero. */
export const codeColors = {
  keyword: codeTheme.keyword,
  type: codeTheme.type,
  variable: codeTheme.variable,
  property: codeTheme.property,
  punctuation: codeTheme.punctuation,
  string: codeTheme.string,
  number: codeTheme.number,
  comment: codeTheme.comment,
  function: codeTheme.function,
} as const;
