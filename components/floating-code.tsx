'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface FloatingCodeProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  delay?: number;
  type: 'skills' | 'info';
}

export function FloatingCode({ position, delay = 0, type }: FloatingCodeProps) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    // Evitar hydration errors esperando el primer render
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !isVisible) return null;

  const positionClasses = {
    'top-left': 'top-32 lg:top-40 xl:top-44 left-8 lg:left-12 xl:left-16 2xl:left-20',
    'top-right': 'top-32 lg:top-40 xl:top-44 right-8 lg:right-12 xl:right-16 2xl:right-20',
    'bottom-left': 'bottom-32 lg:bottom-36 xl:bottom-40 left-8 lg:left-12 xl:left-16 2xl:left-20',
    'bottom-right': 'bottom-48 lg:bottom-56 xl:bottom-64 right-8 lg:right-12 xl:right-16 2xl:right-20',
  };

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} z-20`}
      initial={{ opacity: 0, y: 20, rotateX: -15 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 20,
        rotateX: isVisible ? 0 : -15,
        scale: isVisible ? (isMinimized ? 0.8 : isMaximized ? 1.1 : 1) : 0.7,
        rotateZ: isVisible ? 0 : -5,
      }}
      exit={{
        opacity: 0,
        scale: 0.6,
        rotateZ: -10,
        y: 40,
        transition: {
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }
      }}
      transition={{
        duration: isVisible ? 0.8 : 0.5,
        delay: isVisible ? delay + 0.5 : 0,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative bg-[#1e1e1e] rounded-md overflow-hidden shadow-2xl border border-foreground/10"
        animate={{
          y: [0, -10, 0],
          rotateX: [-1, 1, -1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{
          scale: isMinimized ? 0.85 : isMaximized ? 1.12 : 1.03,
          rotateX: 0,
          transition: { duration: 0.3 },
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* VSCode Header - más limpio con controles interactivos */}
        <div className="bg-[#252526] px-3 py-2 flex items-center justify-between border-b border-[#1e1e1e]">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              {/* Red - Close */}
              <motion.button
                className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/70 hover:bg-[#ff5f56] transition-colors cursor-pointer relative group"
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(() => setIsVisible(true), 3000);
                }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  className="absolute inset-0 flex items-center justify-center text-[8px] text-[#1e1e1e] font-bold opacity-0 group-hover:opacity-100"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  ×
                </motion.span>
              </motion.button>

              {/* Yellow - Minimize */}
              <motion.button
                className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/70 hover:bg-[#ffbd2e] transition-colors cursor-pointer relative group"
                onClick={() => setIsMinimized(!isMinimized)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  className="absolute inset-0 flex items-center justify-center text-[8px] text-[#1e1e1e] font-bold opacity-0 group-hover:opacity-100"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  −
                </motion.span>
              </motion.button>

              {/* Green - Maximize */}
              <motion.button
                className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/70 hover:bg-[#27c93f] transition-colors cursor-pointer relative group"
                onClick={() => setIsMaximized(!isMaximized)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  className="absolute inset-0 flex items-center justify-center text-[8px] text-[#1e1e1e] font-bold opacity-0 group-hover:opacity-100"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  +
                </motion.span>
              </motion.button>
            </div>
            <span className="text-[11px] text-[#cccccc]/80 font-mono">
              {type === 'skills' ? 'skills.ts' : 'profile.ts'}
            </span>
          </div>
          <motion.div 
            className="w-1.5 h-1.5 rounded-full bg-foreground/30"
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Code Content - mejor espaciado */}
        <div className="px-4 py-5 font-mono text-[10px] lg:text-[11px] leading-[1.7] w-[220px] lg:w-[240px] xl:w-[280px] 2xl:w-[300px]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.8, duration: 0.6 }}
          >
            {type === 'skills' ? (
              <>
                {/* Skills Code */}
                <div className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2">
                  <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">1</span>
                  <span>
                    <span style={{ color: '#c586c0' }}>const</span>
                    <span style={{ color: '#9cdcfe' }}> skills</span>
                    <span style={{ color: '#d4d4d4' }}> = [</span>
                  </span>
                </div>

                <div className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2">
                  <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">2</span>
                  <span>
                    <span style={{ color: '#d4d4d4' }}>  </span>
                    <span style={{ color: '#ce9178' }}>&apos;React Js&apos;</span>
                    <span style={{ color: '#d4d4d4' }}>,</span>
                  </span>
                </div>

                <div className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2">
                  <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">3</span>
                  <span>
                    <span style={{ color: '#d4d4d4' }}>  </span>
                    <span style={{ color: '#ce9178' }}>&apos;Next Js&apos;</span>
                    <span style={{ color: '#d4d4d4' }}>,</span>
                  </span>
                </div>

                <div className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2">
                  <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">4</span>
                  <span>
                    <span style={{ color: '#d4d4d4' }}>  </span>
                    <span style={{ color: '#ce9178' }}>&apos;TypeScript&apos;</span>
                    <span style={{ color: '#d4d4d4' }}>,</span>
                  </span>
                </div>

                <div className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2">
                  <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">5</span>
                  <span>
                    <span style={{ color: '#d4d4d4' }}>  </span>
                    <span style={{ color: '#ce9178' }}>&apos;Tailwind CSS&apos;</span>
                    <span style={{ color: '#d4d4d4' }}>,</span>
                  </span>
                </div>

                <div className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2">
                  <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">6</span>
                  <span>
                    <span style={{ color: '#d4d4d4' }}>  </span>
                    <span style={{ color: '#ce9178' }}>&apos;WordPress&apos;</span>
                    <span style={{ color: '#d4d4d4' }}>,</span>
                  </span>
                </div>

                <div className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2">
                  <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">7</span>
                  <span>
                    <span style={{ color: '#d4d4d4' }}>  </span>
                    <span style={{ color: '#ce9178' }}>&apos;QA Automation&apos;</span>
                    <span style={{ color: '#d4d4d4' }}>,</span>
                  </span>
                </div>

                <div className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2">
                  <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">8</span>
                  <span>
                    <span style={{ color: '#d4d4d4' }}>  </span>
                    <span style={{ color: '#ce9178' }}>&apos;Figma&apos;</span>
                  </span>
                </div>

                <div className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2">
                  <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">9</span>
                  <span>
                    <span style={{ color: '#d4d4d4' }}>];</span>
                  </span>
                </div>
              </>
            ) : (
              <>
                {/* Personal Info Code */}
                <div className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2">
                  <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">1</span>
                  <span>
                    <span style={{ color: '#c586c0' }}>const</span>
                    <span style={{ color: '#9cdcfe' }}> developer</span>
                    <span style={{ color: '#d4d4d4' }}> = {'{'}</span>
                  </span>
                </div>

                <div className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2">
                  <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">2</span>
                  <span>
                    <span style={{ color: '#d4d4d4' }}>  </span>
                    <span style={{ color: '#9cdcfe' }}>name</span>
                    <span style={{ color: '#d4d4d4' }}>: </span>
                    <span style={{ color: '#ce9178' }}>&apos;Felipe Gutierrez&apos;</span>
                    <span style={{ color: '#d4d4d4' }}>,</span>
                  </span>
                </div>

                <div className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2">
                  <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">3</span>
                  <span>
                    <span style={{ color: '#d4d4d4' }}>  </span>
                    <span style={{ color: '#9cdcfe' }}>role</span>
                    <span style={{ color: '#d4d4d4' }}>: </span>
                    <span style={{ color: '#ce9178' }}>&apos;FullStack Developer&apos;</span>
                    <span style={{ color: '#d4d4d4' }}>,</span>
                  </span>
                </div>

                <div className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2">
                  <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">4</span>
                  <span>
                    <span style={{ color: '#d4d4d4' }}>  </span>
                    <span style={{ color: '#9cdcfe' }}>location</span>
                    <span style={{ color: '#d4d4d4' }}>: </span>
                    <span style={{ color: '#ce9178' }}>&apos;Uruguay&apos;</span>
                    <span style={{ color: '#d4d4d4' }}>,</span>
                  </span>
                </div>

                <div className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2">
                  <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">5</span>
                  <span>
                    <span style={{ color: '#d4d4d4' }}>  </span>
                    <span style={{ color: '#9cdcfe' }}>passion</span>
                    <span style={{ color: '#d4d4d4' }}>: </span>
                    <span style={{ color: '#ce9178' }}>&apos;Quality Assurance&apos;</span>
                  </span>
                </div>

                <div className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2">
                  <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">6</span>
                  <span>
                    <span style={{ color: '#d4d4d4' }}>{'}'}</span>
                    <span style={{ color: '#d4d4d4' }}>;</span>
                  </span>
                </div>
              </>
            )}
          </motion.div>
        </div>

        {/* Glow effect on hover - más sutil */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-md"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-transparent to-foreground/5" />
        </motion.div>

        {/* Borde exterior sutil en hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-md"
          initial={{ boxShadow: '0 0 0 0px rgba(255,255,255,0)' }}
          whileHover={{ 
            boxShadow: '0 0 0 1px rgba(255,255,255,0.1)',
            transition: { duration: 0.3 }
          }}
        />
      </motion.div>
    </motion.div>
  );
}
