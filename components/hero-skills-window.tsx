'use client';

import { useTranslations } from 'next-intl';
import { MacWindow, type MacWindowPosition } from './mac-window';
import { CodeLine, codeColors } from './code-line';

interface HeroSkillsWindowProps {
  position: MacWindowPosition;
  delay?: number;
  active?: boolean;
}

/** Ventana estilo editor con capacidades genéricas, para mostrar en el Hero. */
export function HeroSkillsWindow({ position, delay = 0, active = true }: HeroSkillsWindowProps) {
  const t = useTranslations('hero');
  const skills = t.raw('skills') as string[];

  let lineNumber = 1;

  return (
    <MacWindow title="skills.ts" position={position} delay={delay} active={active}>
      <CodeLine number={lineNumber++}>
        <span style={{ color: codeColors.comment }}>{'// capabilities'}</span>
      </CodeLine>
      <CodeLine number={lineNumber++}>
        <span style={{ color: codeColors.keyword }}>const</span>
        <span style={{ color: codeColors.variable }}> skills</span>
        <span style={{ color: codeColors.punctuation }}>: </span>
        <span style={{ color: codeColors.type }}>string</span>
        <span style={{ color: codeColors.type }}>[]</span>
        <span style={{ color: codeColors.punctuation }}> = [</span>
      </CodeLine>
      {skills.map((skill, index) => (
        <CodeLine key={skill} number={lineNumber++}>
          <span style={{ color: codeColors.punctuation }}>  </span>
          <span style={{ color: codeColors.string }}>&apos;{skill}&apos;</span>
          {index < skills.length - 1 && (
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
