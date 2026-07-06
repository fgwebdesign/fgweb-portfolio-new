'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface FloatingCodeProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  delay?: number;
  type: 'personal' | 'deploy';
}

// Hook para efecto de typing
function useTypingEffect(text: string, speed: number = 30, startDelay: number = 0) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (startDelay > 0) {
      const delayTimeout = setTimeout(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
          if (currentIndex <= text.length) {
            setDisplayedText(text.slice(0, currentIndex));
            currentIndex++;
          } else {
            setIsComplete(true);
            clearInterval(interval);
          }
        }, speed);
        return () => clearInterval(interval);
      }, startDelay);
      return () => clearTimeout(delayTimeout);
    } else {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }
  }, [text, speed, startDelay]);

  return { displayedText, isComplete };
}

export function FloatingCode({ position, delay = 0, type }: FloatingCodeProps) {
  const [mounted, setMounted] = useState(false);
  const [deployStep, setDeployStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  // Typing effects para cada línea del deploy
  const line1 = useTypingEffect('// Deploying Awesome Project', 40, delay + 1000);
  const line3 = useTypingEffect('🚀 Building application...', 35, delay + 2200);
  const line4 = useTypingEffect('⚡ Optimizing bundles...', 35, delay + 3800);
  const line5 = useTypingEffect('🎉 Deploying to production...', 35, delay + 5400);
  const line6Text = useTypingEffect('✨ Live at ', 35, delay + 7000);
  const line6Url = useTypingEffect('www.awesomeproject.com', 30, delay + 7500);

  useEffect(() => {
    // Evitar hydration errors esperando el primer render
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (type === 'deploy') {
      const interval = setInterval(() => {
        setDeployStep((prev) => (prev + 1) % 4);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [type]);

  if (!mounted || !isVisible) return null;

  const positionClasses = {
    'top-left': 'top-32 lg:top-40 xl:top-44 left-8 lg:left-12 xl:left-16 2xl:left-20',
    'top-right': 'top-32 lg:top-40 xl:top-44 right-8 lg:right-12 xl:right-16 2xl:right-20',
    'bottom-left': 'bottom-32 lg:bottom-36 xl:bottom-40 left-8 lg:left-12 xl:left-16 2xl:left-20',
    'bottom-right': 'bottom-48 lg:bottom-56 xl:bottom-64 right-8 lg:right-12 xl:right-16 2xl:right-20',
  };

  return (
    <motion.div
      className={`hidden lg:block absolute ${positionClasses[position]} z-20`}
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
              {type === 'personal' ? 'portfolio.tsx' : 'deploy.sh'}
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
            {type === 'personal' ? (
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
                    <span style={{ color: '#ce9178' }}>&apos;FullStack&apos;</span>
                    <span style={{ color: '#d4d4d4' }}>,</span>
                  </span>
                </div>

                <div className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2">
                  <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">4</span>
                  <span>
                    <span style={{ color: '#d4d4d4' }}>  </span>
                    <span style={{ color: '#9cdcfe' }}>skills</span>
                    <span style={{ color: '#d4d4d4' }}>: [</span>
                  </span>
                </div>

                <div className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2">
                  <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">5</span>
                  <span>
                    <span style={{ color: '#d4d4d4' }}>    </span>
                    <span style={{ color: '#ce9178' }}>&apos;QA Manual&apos;</span>
                    <span style={{ color: '#d4d4d4' }}>,</span>
                  </span>
                </div>

                <div className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2">
                  <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">6</span>
                  <span>
                    <span style={{ color: '#d4d4d4' }}>    </span>
                    <span style={{ color: '#ce9178' }}>&apos;QA Automation&apos;</span>
                    <span style={{ color: '#d4d4d4' }}>,</span>
                  </span>
                </div>

                <div className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2">
                  <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">7</span>
                  <span>
                    <span style={{ color: '#d4d4d4' }}>    </span>
                    <span style={{ color: '#ce9178' }}>&apos;React &amp; Next.js&apos;</span>
                    <span style={{ color: '#d4d4d4' }}>,</span>
                  </span>
                </div>

                <div className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2">
                  <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">8</span>
                  <span>
                    <span style={{ color: '#d4d4d4' }}>    </span>
                    <span style={{ color: '#ce9178' }}>&apos;UI/UX Design&apos;</span>
                  </span>
                </div>

                <div className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2">
                  <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">9</span>
                  <span>
                    <span style={{ color: '#d4d4d4' }}>  ],</span>
                  </span>
                </div>

                <div className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2">
                  <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">10</span>
                  <span>
                    <span style={{ color: '#d4d4d4' }}>  </span>
                    <span style={{ color: '#9cdcfe' }}>passion</span>
                    <span style={{ color: '#d4d4d4' }}>: </span>
                    <span style={{ color: '#ce9178' }}>&apos;Quality Assurance&apos;</span>
                  </span>
                </div>

                <div className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2">
                  <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">11</span>
                  <span>
                    <span style={{ color: '#d4d4d4' }}>{'}'}</span>
                  </span>
                </div>
              </>
            ) : (
              <>
                {/* Deploy Animation Code con typing effect */}
                <div className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2">
                  <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">1</span>
                  <span>
                    <span style={{ color: '#6a9955' }}>
                      {line1.displayedText}
                      {!line1.isComplete && (
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        >
                          _
                        </motion.span>
                      )}
                    </span>
                  </span>
                </div>

                <div className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2">
                  <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">2</span>
                  <span style={{ color: '#d4d4d4' }}>&nbsp;</span>
                </div>

                <motion.div 
                  className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2"
                  animate={{
                    backgroundColor: deployStep === 0 ? 'rgba(79, 195, 247, 0.1)' : 'rgba(0, 0, 0, 0)',
                  }}
                >
                  <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">3</span>
                  <span>
                    <motion.span 
                      style={{ color: '#4fc3f7' }}
                      animate={{
                        opacity: deployStep === 0 ? [1, 0.7, 1] : 1,
                      }}
                      transition={{ duration: 1, repeat: deployStep === 0 ? Infinity : 0 }}
                    >
                      {line3.displayedText}
                      {!line3.isComplete && (
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        >
                          _
                        </motion.span>
                      )}
                    </motion.span>
                  </span>
                </motion.div>

                <motion.div 
                  className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2"
                  animate={{
                    backgroundColor: deployStep === 1 ? 'rgba(255, 189, 46, 0.1)' : 'rgba(0, 0, 0, 0)',
                  }}
                >
                  <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">4</span>
                  <span>
                    <motion.span 
                      style={{ color: '#ffbd2e' }}
                      animate={{
                        opacity: deployStep === 1 ? [1, 0.7, 1] : 1,
                      }}
                      transition={{ duration: 1, repeat: deployStep === 1 ? Infinity : 0 }}
                    >
                      {line4.displayedText}
                      {!line4.isComplete && (
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        >
                          _
                        </motion.span>
                      )}
                    </motion.span>
                  </span>
                </motion.div>

                <motion.div 
                  className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2"
                  animate={{
                    backgroundColor: deployStep === 2 ? 'rgba(39, 201, 63, 0.1)' : 'rgba(0, 0, 0, 0)',
                  }}
                >
                  <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">5</span>
                  <span>
                    <motion.span 
                      style={{ color: '#27c93f' }}
                      animate={{
                        opacity: deployStep === 2 ? [1, 0.7, 1] : 1,
                      }}
                      transition={{ duration: 1, repeat: deployStep === 2 ? Infinity : 0 }}
                    >
                      {line5.displayedText}
                      {!line5.isComplete && (
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        >
                          _
                        </motion.span>
                      )}
                    </motion.span>
                  </span>
                </motion.div>

                <motion.div 
                  className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2"
                  animate={{
                    backgroundColor: deployStep === 3 ? 'rgba(156, 220, 254, 0.1)' : 'rgba(0, 0, 0, 0)',
                  }}
                >
                  <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">6</span>
                  <span>
                    <motion.span 
                      style={{ color: '#9cdcfe' }}
                      animate={{
                        opacity: deployStep === 3 ? [1, 0.7, 1] : 1,
                      }}
                      transition={{ duration: 1, repeat: deployStep === 3 ? Infinity : 0 }}
                    >
                      {line6Text.displayedText}
                    </motion.span>
                    <motion.span 
                      style={{ color: '#4ec9b0' }}
                      animate={{
                        opacity: deployStep === 3 ? [1, 0.7, 1] : 1,
                        textDecoration: deployStep === 3 ? 'underline' : 'none',
                      }}
                      transition={{ duration: 1, repeat: deployStep === 3 ? Infinity : 0 }}
                    >
                      {line6Url.displayedText}
                      {!line6Url.isComplete && (
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        >
                          _
                        </motion.span>
                      )}
                    </motion.span>
                  </span>
                </motion.div>

                <div className="flex group hover:bg-[#2a2d2e] transition-colors duration-150 -mx-2 px-2">
                  <span style={{ color: '#858585' }} className="select-none mr-4 text-right w-6 shrink-0">7</span>
                  <span style={{ color: '#d4d4d4' }}>&nbsp;</span>
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
