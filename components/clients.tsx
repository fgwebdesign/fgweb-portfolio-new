'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'motion/react';
import Image from 'next/image';
import { clientsData } from '@/data/clients-data';

export function Clients() {
  const t = useTranslations('clients');
  const tCommon = useTranslations('common');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section id="clients" className="py-24 lg:py-32 bg-background border-t border-foreground/10">
      <div ref={sectionRef} className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header estilo editorial */}
        <motion.div
          className="mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-start justify-between mb-8">
            <div>
              <motion.p
                className="text-xs uppercase tracking-[0.2em] text-foreground/40 mb-3"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 }}
              >
                {t('trustedBy')}
              </motion.p>
              <motion.h2
                className="text-[clamp(3rem,12vw,8rem)] font-bold leading-[0.85] tracking-tighter uppercase"
                initial={{ opacity: 0, x: -100 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3, type: 'spring', stiffness: 50 }}
              >
                {t('title')}
              </motion.h2>
            </div>
          </div>

          <motion.p
            className="text-sm uppercase tracking-[0.15em] text-foreground/50 max-w-md"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>

        {/* Grid de clientes */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12">
          {clientsData.map((client, index) => (
            <motion.div
              key={client.id}
              className="group relative aspect-[3/2] border border-foreground/10 p-6 lg:p-8 flex items-center justify-center hover:border-foreground/30 transition-all duration-500"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
            >
              {/* Logo del cliente */}
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={client.logo}
                  alt={tCommon('logoOf', { name: client.name })}
                  fill
                  className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500 p-4"
                />
              </div>

              {/* Overlay con información */}
              <motion.div
                className="absolute inset-0 bg-foreground/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <div className="text-center">
                  <p className="text-background text-sm font-bold uppercase tracking-wider mb-2">
                    {client.name}
                  </p>
                  {client.category && (
                    <p className="text-background/70 text-xs uppercase tracking-[0.15em]">
                      {client.category}
                    </p>
                  )}
                  {client.website && (
                    <motion.a
                      href={client.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-background text-xs uppercase tracking-[0.15em] underline hover:no-underline"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tCommon('viewSite')}
                    </motion.a>
                  )}
                </div>
              </motion.div>

              {/* Número del cliente */}
              <motion.span
                className="absolute top-2 right-2 text-[10px] uppercase tracking-[0.15em] text-foreground/30 font-medium"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {String(index + 1).padStart(2, '0')}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
