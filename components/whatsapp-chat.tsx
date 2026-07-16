'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { getWhatsAppUrl } from '@/lib/site';
import { HERO_SEQUENCE, estimateTitleTypeDuration } from '@/data/hero-sequence';

const EASE = [0.22, 1, 0.36, 1] as const;

const FAB_STAGGER = 0.14;

const fabContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: FAB_STAGGER,
      delayChildren: 0,
    },
  },
} as const;

const fabButtonVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.88 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: EASE },
  },
} as const;

const fabLabelVariants = {
  hidden: { opacity: 0, x: 14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE },
  },
} as const;

const PROMPT_KEYS = ['project', 'quote', 'collab'] as const;

function SiteMark({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'h-10 w-10 rounded-[10px] text-[15px]',
    md: 'h-11 w-11 rounded-[11px] text-base',
    lg: 'h-12 w-12 rounded-xl text-lg',
  };

  return (
    <div
      className={`flex shrink-0 items-center justify-center bg-foreground font-[family-name:var(--font-manrope)] font-extrabold leading-none text-background ${sizes[size]}`}
      aria-hidden
    >
      f
    </div>
  );
}

function MacTrafficLights({
  onClose,
  onMinimize,
  closeLabel,
}: {
  onClose: () => void;
  onMinimize: () => void;
  closeLabel: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <motion.button
        type="button"
        aria-label={closeLabel}
        className="group relative h-3 w-3 rounded-full bg-[#ff5f56]/75 transition-colors hover:bg-[#ff5f56]"
        onClick={onClose}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold leading-none text-[#4a0002] opacity-0 transition-opacity group-hover:opacity-100">
          ×
        </span>
      </motion.button>
      <motion.button
        type="button"
        aria-label="Minimizar"
        className="group relative h-3 w-3 rounded-full bg-[#ffbd2e]/75 transition-colors hover:bg-[#ffbd2e]"
        onClick={onMinimize}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold leading-none text-[#5a4200] opacity-0 transition-opacity group-hover:opacity-100">
          −
        </span>
      </motion.button>
      <motion.button
        type="button"
        aria-label="Maximizar"
        className="h-3 w-3 rounded-full bg-[#27c93f]/75 transition-colors hover:bg-[#27c93f]"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      />
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function WhatsAppChat() {
  const t = useTranslations('whatsapp');
  const tHero = useTranslations('hero');
  const panelId = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showFab, setShowFab] = useState(() => Boolean(shouldReduceMotion));
  const [message, setMessage] = useState(() => t('defaultMessage'));

  const openChat = useCallback(() => {
    setMessage(t('defaultMessage'));
    setIsMinimized(false);
    setIsOpen(true);
  }, [t]);

  const closeChat = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(false);
  }, []);

  const sendToWhatsApp = useCallback(() => {
    const trimmed = message.trim();
    if (!trimmed) return;

    window.open(getWhatsAppUrl(trimmed), '_blank', 'noopener,noreferrer');
    closeChat();
  }, [closeChat, message]);

  const handlePromptClick = useCallback(
    (key: (typeof PROMPT_KEYS)[number]) => {
      const nextMessage = t(`prompts.${key}`);
      setMessage(nextMessage);
      setIsMinimized(false);
      textareaRef.current?.focus();
    },
    [t],
  );

  useEffect(() => {
    if (shouldReduceMotion) {
      setShowFab(true);
      return;
    }

    const titleEnd = estimateTitleTypeDuration(
      tHero('title'),
      HERO_SEQUENCE.title.charSpeed,
      HERO_SEQUENCE.title.enter,
    );
    const delayMs = (titleEnd + HERO_SEQUENCE.scroll.afterTitle + 0.3) * 1000;

    const timer = window.setTimeout(() => setShowFab(true), delayMs);
    return () => window.clearTimeout(timer);
  }, [shouldReduceMotion, tHero]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeChat();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeChat, isOpen]);

  useEffect(() => {
    if (!isOpen || isMinimized) return;
    const timer = window.setTimeout(() => textareaRef.current?.focus(), 280);
    return () => window.clearTimeout(timer);
  }, [isMinimized, isOpen]);

  const panelMotion = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 16, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 12, scale: 0.98 },
      };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-4 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-labelledby={`${panelId}-title`}
            aria-modal="true"
            {...panelMotion}
            transition={{ duration: 0.35, ease: EASE }}
            className="pointer-events-auto w-[min(100vw-3rem,24rem)] overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-[0_24px_64px_rgba(10,10,10,0.2)]"
            style={{ transformOrigin: 'bottom right' }}
          >
            <div className="border-b border-background/10 bg-foreground px-6 py-5">
              <div className="flex items-center justify-between gap-6">
                <div className="shrink-0 pt-0.5">
                  <MacTrafficLights
                    onClose={closeChat}
                    onMinimize={() => setIsMinimized((value) => !value)}
                    closeLabel={t('close')}
                  />
                </div>
                <div className="min-w-0 flex-1 px-2 text-center">
                  <p id={`${panelId}-title`} className="truncate text-sm font-semibold tracking-tight text-background">
                    {t('title')}
                  </p>
                  <p className="mt-1 truncate text-xs text-background/55">{t('status')}</p>
                </div>
                <div className="shrink-0">
                  <SiteMark size="lg" />
                </div>
              </div>
            </div>

            <motion.div
              animate={{ height: isMinimized ? 0 : 'auto', opacity: isMinimized ? 0 : 1 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="space-y-5 px-5 py-5">
                <div className="flex items-end gap-3">
                  <SiteMark size="sm" />
                  <div className="max-w-[88%] rounded-2xl rounded-bl-md border border-foreground/10 bg-foreground/[0.03] px-4 py-3.5 text-[0.9375rem] leading-relaxed text-foreground">
                    {t('greeting')}
                  </div>
                </div>

                <div className="space-y-2">
                  {PROMPT_KEYS.map((key, index) => (
                    <motion.button
                      key={key}
                      type="button"
                      onClick={() => handlePromptClick(key)}
                      className="group flex w-full items-center justify-between gap-4 rounded-xl border border-foreground/10 bg-background px-4 py-3.5 text-left transition-colors hover:border-foreground hover:bg-foreground"
                      whileHover={shouldReduceMotion ? undefined : { x: 2 }}
                      whileTap={{ scale: 0.995 }}
                      transition={{ duration: 0.2, ease: EASE }}
                    >
                      <span className="flex min-w-0 items-baseline gap-3">
                        <span className="shrink-0 text-[11px] font-medium tabular-nums text-secondary transition-colors group-hover:text-background/50">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[0.9375rem] leading-snug text-foreground transition-colors group-hover:text-background">
                          {t(`prompts.${key}`)}
                        </span>
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-secondary transition-all group-hover:translate-x-0.5 group-hover:text-background" />
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="border-t border-foreground/10 px-5 py-4">
                <div className="flex items-end gap-3 rounded-2xl border border-foreground/12 bg-foreground/[0.02] p-3 transition-colors focus-within:border-foreground/30 focus-within:bg-foreground/[0.03]">
                  <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();
                        sendToWhatsApp();
                      }
                    }}
                    rows={3}
                    placeholder={t('placeholder')}
                    className="min-h-[3.25rem] flex-1 resize-none bg-transparent px-1 py-1 text-sm leading-relaxed text-foreground outline-none placeholder:text-secondary"
                  />
                  <motion.button
                    type="button"
                    onClick={sendToWhatsApp}
                    disabled={!message.trim()}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-foreground text-background disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label={t('send')}
                    whileHover={shouldReduceMotion || !message.trim() ? undefined : { scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ duration: 0.2, ease: EASE }}
                  >
                    <SendIcon className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="relative flex items-center"
        style={{ pointerEvents: showFab ? 'auto' : 'none' }}
        variants={fabContainerVariants}
        initial="hidden"
        animate={showFab ? 'visible' : 'hidden'}
      >
        <motion.button
          type="button"
          variants={fabButtonVariants}
          onClick={() => (isOpen ? closeChat() : openChat())}
          aria-expanded={isOpen}
          aria-controls={isOpen ? panelId : undefined}
          aria-label={isOpen ? t('close') : t('openLabel')}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/10 bg-foreground text-background shadow-[0_12px_32px_rgba(10,10,10,0.2)]"
          whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.svg
                key="close"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
                aria-hidden
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.span
                key="whatsapp"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <WhatsAppIcon className="h-[22px] w-[22px]" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <AnimatePresence>
          {!isOpen && (
            <motion.span
              key="cta-label"
              variants={fabLabelVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, x: 8, transition: { duration: 0.22, ease: EASE } }}
              className="absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-foreground/10 bg-background px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-foreground shadow-[0_8px_24px_rgba(10,10,10,0.1)]"
              aria-hidden
            >
              {t('ctaLabel')}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
