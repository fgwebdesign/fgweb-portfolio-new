'use client';

import { useTranslations } from 'next-intl';
import { MacWindow, type MacWindowPosition } from './mac-window';
import { CodeLine, codeColors } from './code-line';

interface HeroSkillsWindowProps {
  position: MacWindowPosition;
  delay?: number;
}

/** Ventana estilo editor con un resumen de skills, para mostrar en el Hero. */
export function HeroSkillsWindow({ position, delay = 0 }: HeroSkillsWindowProps) {
  const t = useTranslations('skills');
  const categories = t.raw('categories') as Array<{ name: string; items: string[] }>;

  const featured = categories
    .flatMap((category) => category.items)
    .slice(0, 7);

  let lineNumber = 1;

  return (
    <MacWindow title="skills.ts" position={position} delay={delay}>
      <CodeLine number={lineNumber++}>
        <span style={{ color: codeColors.comment }}>// core stack</span>
      </CodeLine>
      <CodeLine number={lineNumber++}>
        <span style={{ color: codeColors.keyword }}>const</span>
        <span style={{ color: codeColors.variable }}> skills</span>
        <span style={{ color: codeColors.punctuation }}>: </span>
        <span style={{ color: codeColors.type }}>string</span>
        <span style={{ color: codeColors.type }}>[]</span>
        <span style={{ color: codeColors.punctuation }}> = [</span>
      </CodeLine>
      {featured.map((skill, index) => (
        <CodeLine key={skill} number={lineNumber++}>
          <span style={{ color: codeColors.punctuation }}>  </span>
          <span style={{ color: codeColors.string }}>&apos;{skill}&apos;</span>
          {index < featured.length - 1 && (
            <span style={{ color: codeColors.punctuation }}>,</span>
          )}
        </CodeLine>
      ))}
      <CodeLine number={lineNumber++}>
        <span style={{ color: codeColors.punctuation }}>];</span>
      </CodeLine>
    </MacWindow>
  );
}
