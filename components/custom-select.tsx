'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface CustomSelectProps {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export function CustomSelect({ label, placeholder, options, value, onChange }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-xs uppercase tracking-[0.15em] text-foreground/40 mb-3">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between border-b py-3 text-left transition-colors group ${
          isOpen ? 'border-foreground' : 'border-foreground/20 hover:border-foreground/40'
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={`text-sm lg:text-base truncate ${value ? 'text-foreground' : 'text-foreground/35'}`}>
          {value || placeholder}
        </span>
        <motion.svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-foreground/40 group-hover:text-foreground/70 transition-colors shrink-0 ml-3"
        >
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-50 bg-background border border-foreground/10 rounded-xl shadow-[0_16px_48px_-12px_rgba(0,0,0,0.25)] py-2 max-h-72 overflow-y-auto"
            style={{ transformOrigin: 'top' }}
          >
            {options.map((option) => {
              const isSelected = value === option;
              return (
                <li
                  key={option}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between gap-3 px-5 py-3 text-sm lg:text-[0.9rem] cursor-pointer transition-colors ${
                    isSelected
                      ? 'text-foreground font-medium bg-foreground/[0.05]'
                      : 'text-foreground/65 hover:bg-foreground/[0.04] hover:text-foreground'
                  }`}
                >
                  <span className="leading-snug">{option}</span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground shrink-0" />
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
