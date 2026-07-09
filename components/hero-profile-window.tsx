'use client';

import { useTranslations } from 'next-intl';
import { MacWindow, type MacWindowPosition } from './mac-window';
import { CodeLine, codeColors } from './code-line';

interface HeroProfileWindowProps {
  position: MacWindowPosition;
  delay?: number;
}

/** Ventana estilo editor con la información personal, para mostrar en el Hero. */
export function HeroProfileWindow({ position, delay = 0 }: HeroProfileWindowProps) {
  const t = useTranslations('hero');

  return (
    <MacWindow title="profile.ts" position={position} delay={delay}>
      <CodeLine number={1}>
        <span style={{ color: codeColors.keyword }}>const</span>
        <span style={{ color: codeColors.variable }}> developer</span>
        <span style={{ color: codeColors.punctuation }}> = {'{'}</span>
      </CodeLine>
      <CodeLine number={2}>
        <span style={{ color: codeColors.punctuation }}>  </span>
        <span style={{ color: codeColors.variable }}>name</span>
        <span style={{ color: codeColors.punctuation }}>: </span>
        <span style={{ color: codeColors.string }}>&apos;{t('title')}&apos;</span>
        <span style={{ color: codeColors.punctuation }}>,</span>
      </CodeLine>
      <CodeLine number={3}>
        <span style={{ color: codeColors.punctuation }}>  </span>
        <span style={{ color: codeColors.variable }}>role</span>
        <span style={{ color: codeColors.punctuation }}>: </span>
        <span style={{ color: codeColors.string }}>&apos;{t('role')}&apos;</span>
        <span style={{ color: codeColors.punctuation }}>,</span>
      </CodeLine>
      <CodeLine number={4}>
        <span style={{ color: codeColors.punctuation }}>  </span>
        <span style={{ color: codeColors.variable }}>location</span>
        <span style={{ color: codeColors.punctuation }}>: </span>
        <span style={{ color: codeColors.string }}>&apos;{t('location')}&apos;</span>
        <span style={{ color: codeColors.punctuation }}>,</span>
      </CodeLine>
      <CodeLine number={5}>
        <span style={{ color: codeColors.punctuation }}>  </span>
        <span style={{ color: codeColors.variable }}>passion</span>
        <span style={{ color: codeColors.punctuation }}>: </span>
        <span style={{ color: codeColors.string }}>&apos;{t('passion')}&apos;</span>
      </CodeLine>
      <CodeLine number={6}>
        <span style={{ color: codeColors.punctuation }}>{'}'};</span>
      </CodeLine>
    </MacWindow>
  );
}
