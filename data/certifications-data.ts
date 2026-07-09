import type { Locale } from './experience-data';

interface LocalizedText {
  es: string;
  en: string;
}

export type CertificationType = 'certification' | 'course' | 'formal-education';

export interface Certification {
  id: string;
  title: LocalizedText;
  institution: string;
  year: string;
  /** Tipo de estudio: certificación, curso o educación formal. */
  type: CertificationType;
}

export function localizeText(text: LocalizedText, locale: Locale): string {
  return text[locale] ?? text.es;
}

export const certificationTypeLabels: Record<CertificationType, LocalizedText> = {
  certification: { es: 'Certificación', en: 'Certification' },
  course: { es: 'Curso', en: 'Course' },
  'formal-education': { es: 'Educación Formal', en: 'Formal Education' },
};

export const certificationsData: Certification[] = [
  {
    id: 'react-js',
    title: { es: 'React JS', en: 'React JS' },
    institution: 'Coderhouse',
    year: '2023',
    type: 'certification',
  },
  {
    id: 'qa-manual-tester',
    title: { es: 'QA Manual Tester', en: 'QA Manual Tester' },
    institution: 'Coderhouse',
    year: '2023',
    type: 'certification',
  },
  {
    id: 'android-kotlin',
    title: { es: 'Android con Kotlin', en: 'Android with Kotlin' },
    institution: 'Udemy',
    year: '2023',
    type: 'course',
  },
  {
    id: 'ux-ui-design',
    title: { es: 'Desarrollo UX / UI', en: 'UX / UI Development' },
    institution: 'Coderhouse',
    year: '2022',
    type: 'certification',
  },
  {
    id: 'software-tester',
    title: { es: 'Software Tester', en: 'Software Tester' },
    institution: 'Centro de Ensayo de Software - Facultad de Ingeniería',
    year: '2022',
    type: 'certification',
  },
  {
    id: 'ux-ui-advanced',
    title: { es: 'Desarrollo UX / UI Avanzado', en: 'UX / UI Development Advanced' },
    institution: 'Coderhouse',
    year: '2022',
    type: 'certification',
  },
  {
    id: 'development-web',
    title: { es: 'Desarrollo Web', en: 'Web Development' },
    institution: 'Coderhouse',
    year: '2021',
    type: 'course',
  },
  {
    id: 'photoshop-illustrator',
    title: { es: 'Photoshop e Illustrator', en: 'Photoshop and Illustrator' },
    institution: 'Coderhouse',
    year: '2021',
    type: 'course',
  },
  {
    id: 'bachillerato-informatica',
    title: { es: 'Bachillerato de Informática', en: 'Computer Science High School Diploma' },
    institution: 'Instituto Tecnológico Superior',
    year: '2016 - 2020',
    type: 'formal-education',
  },
  {
    id: 'diseno-web',
    title: { es: 'Diseño Web', en: 'Web Design' },
    institution: 'Instituto PuntoCom Paysandú',
    year: '2020',
    type: 'course',
  },
  {
    id: 'programacion-visual-dotnet',
    title: { es: 'Programación Visual .Net #C++', en: 'Visual Programming .Net / C++' },
    institution: 'Instituto PuntoCom Paysandú',
    year: '2019',
    type: 'course',
  },
  {
    id: 'reparacion-mantenimiento-pc-2',
    title: { es: 'Reparación y mantenimiento de PC II', en: 'PC Repair and Maintenance II' },
    institution: 'Instituto PuntoCom Paysandú',
    year: '2019',
    type: 'course',
  },
  {
    id: 'reparacion-mantenimiento-pc-1',
    title: { es: 'Reparación y mantenimiento de PC I', en: 'PC Repair and Maintenance I' },
    institution: 'Instituto PuntoCom Paysandú',
    year: '2018',
    type: 'course',
  },
];
