'use client';

import { useCallback, type MouseEvent } from 'react';
import { useLenis } from '@/components/providers/smooth-scroll-provider';

/** Scroll programático a una sección — evita el bug del doble click con anchors + Lenis. */
export function useScrollToSection() {
  const lenis = useLenis();

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      if (lenis) {
        lenis.scrollTo(element, { offset: 0 });
      } else {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      const hash = `#${sectionId}`;
      const nextUrl = `${window.location.pathname}${hash}`;
      if (`${window.location.pathname}${window.location.hash}` !== nextUrl) {
        window.history.pushState(null, '', nextUrl);
      }
    },
    [lenis],
  );

  const handleSectionClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, sectionId: string, onAfter?: () => void) => {
      event.preventDefault();
      scrollToSection(sectionId);
      onAfter?.();
    },
    [scrollToSection],
  );

  return { scrollToSection, handleSectionClick };
}
