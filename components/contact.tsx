'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { CustomSelect } from './custom-select';

interface FormState {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

const initialFormState: FormState = {
  name: '',
  email: '',
  projectType: '',
  budget: '',
  timeline: '',
  message: '',
};

function IntroSection() {
  const t = useTranslations('contact');

  return (
    <section
      id="contact"
      className="min-h-[100svh] lg:min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden px-6 pt-24 pb-32"
    >
      <motion.div
        className="flex items-center gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-12 lg:w-16 h-px bg-foreground/30" />
        <p className="text-xs lg:text-sm uppercase tracking-[0.25em] text-foreground/40 font-medium">
          {t('introSubtitle')}
        </p>
      </motion.div>

      <motion.h2
        className="font-[family-name:var(--font-manrope)] text-[clamp(2.5rem,10vw,4rem)] lg:text-[clamp(4.5rem,9vw,8rem)] font-black tracking-tighter leading-[0.95] text-center uppercase max-w-[14ch] sm:max-w-none"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {t('introTitleLine1')}
        <br />
        {t('introTitleLine2')}
      </motion.h2>

      <motion.div
        className="absolute bottom-8 lg:bottom-12 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <motion.div
          className="flex flex-col items-center gap-3"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/50">
            {t('introScroll')}
          </p>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-foreground/50">
            <path
              d="M10 4V16M10 16L16 10M10 16L4 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ContactForm() {
  const t = useTranslations('contact');
  const [form, setForm] = useState<FormState>(initialFormState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const projectTypeOptions = t.raw('formProjectTypeOptions') as string[];
  const budgetOptions = t.raw('formBudgetOptions') as string[];
  const timelineOptions = t.raw('formTimelineOptions') as string[];

  const updateField = (field: keyof FormState) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          className="mb-12 lg:mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/40 mb-4">
            {t('formSubtitle')}
          </p>
          <h3 className="font-[family-name:var(--font-manrope)] text-[clamp(2rem,6vw,3.5rem)] font-black tracking-tighter leading-[0.95] mb-6">
            {t('formTitle')}
          </h3>
          <p className="text-base lg:text-lg text-foreground/60 leading-relaxed max-w-xl">
            {t('formDescription')}
          </p>
        </motion.div>

        {isSubmitted ? (
          <motion.div
            className="border border-foreground/10 p-8 lg:p-14 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="w-14 h-14 rounded-full border-2 border-foreground flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4, ease: 'backOut' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 12L9.5 17.5L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
            <h4 className="text-xl lg:text-2xl font-bold mb-3">{t('formSuccessTitle')}</h4>
            <p className="text-base text-foreground/60 max-w-md mx-auto">
              {t('formSuccessDescription')}
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Nombre + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-[0.15em] text-foreground/40 mb-3">
                  {t('formName')}
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => updateField('name')(e.target.value)}
                  placeholder={t('formNamePlaceholder')}
                  className="w-full border-b border-foreground/20 focus:border-foreground bg-transparent py-3 text-sm lg:text-base placeholder:text-foreground/35 outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-[0.15em] text-foreground/40 mb-3">
                  {t('formEmail')}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => updateField('email')(e.target.value)}
                  placeholder={t('formEmailPlaceholder')}
                  className="w-full border-b border-foreground/20 focus:border-foreground bg-transparent py-3 text-sm lg:text-base placeholder:text-foreground/35 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Dropdowns custom */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <CustomSelect
                label={t('formProjectType')}
                placeholder={t('formProjectTypePlaceholder')}
                options={projectTypeOptions}
                value={form.projectType}
                onChange={updateField('projectType')}
              />

              <CustomSelect
                label={t('formBudget')}
                placeholder={t('formBudgetPlaceholder')}
                options={budgetOptions}
                value={form.budget}
                onChange={updateField('budget')}
              />
            </div>

            <CustomSelect
              label={t('formTimeline')}
              placeholder={t('formTimelinePlaceholder')}
              options={timelineOptions}
              value={form.timeline}
              onChange={updateField('timeline')}
            />

            {/* Mensaje */}
            <div>
              <label htmlFor="message" className="block text-xs uppercase tracking-[0.15em] text-foreground/40 mb-3">
                {t('formMessage')}
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => updateField('message')(e.target.value)}
                placeholder={t('formMessagePlaceholder')}
                className="w-full border-b border-foreground/20 focus:border-foreground bg-transparent py-3 text-sm lg:text-base placeholder:text-foreground/35 outline-none transition-colors resize-none"
              />
            </div>

            <motion.button
              type="submit"
              className="group relative w-full sm:w-auto px-10 py-4 lg:px-12 lg:py-5 bg-foreground text-background text-sm lg:text-base uppercase tracking-[0.15em] font-medium overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">{t('formSubmit')}</span>
              <motion.div
                className="absolute inset-0 bg-background"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
                style={{ originX: 0 }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-foreground text-sm lg:text-base uppercase tracking-[0.15em] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {t('formSubmit')}
              </span>
            </motion.button>
          </motion.form>
        )}

        {/* Email directo como alternativa */}
        <motion.div
          className="mt-16 pt-10 border-t border-foreground/10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <p className="text-xs uppercase tracking-[0.15em] text-foreground/40 mb-3">
            {t('subtitle')}
          </p>
          <a
            href={`mailto:${t('email')}`}
            className="inline-flex items-center gap-3 text-lg lg:text-xl font-medium hover:text-secondary transition-colors"
          >
            {t('email')}
            <span className="text-base">↗</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <>
      <IntroSection />
      <ContactForm />
    </>
  );
}
