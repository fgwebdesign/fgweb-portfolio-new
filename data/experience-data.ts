export type Locale = 'es' | 'en';

interface LocalizedText {
  es: string;
  en: string;
}

export interface ExperienceJob {
  id: string;
  role: LocalizedText;
  company: string;
  /** Ruta del logo en /public/companies/. Si no existe, se muestra un fallback con las iniciales. */
  logo?: string;
  period: LocalizedText;
  location?: LocalizedText;
  description: LocalizedText;
  skills: string[];
}

export function localize(text: LocalizedText, locale: Locale): string {
  return text[locale] ?? text.es;
}

export const experienceData: ExperienceJob[] = [
  {
    id: 'felipegutierrez-dev',
    role: { es: 'Fundador & Desarrollador Full Stack', en: 'Founder & Full Stack Developer' },
    company: 'felipegutierrez.dev',
    period: { es: '2020 - Actual', en: '2020 - Present' },
    location: { es: 'Uruguay', en: 'Uruguay' },
    description: {
      es: 'Desarrollo de productos SaaS, plataformas web y aplicaciones a medida para clientes en Uruguay y el mundo. Stack: React, Next.js, React Native, TypeScript y QA integrado en cada entrega.',
      en: 'Building SaaS products, web platforms and custom applications for clients in Uruguay and worldwide. Stack: React, Next.js, React Native, TypeScript and QA built into every release.',
    },
    skills: ['React', 'Next.js', 'TypeScript', 'React Native', 'Tailwind CSS', 'Cypress', 'Postman', 'Figma'],
  },
  {
    id: 'practia',
    role: { es: 'Quality Assurance & Frontend Developer', en: 'Quality Assurance & Frontend Developer' },
    company: 'Practia Uruguay',
    logo: '/companies/practia.png',
    period: { es: '2024 - 2024', en: '2024 - 2024' },
    location: { es: 'Uruguay', en: 'Uruguay' },
    description: {
      es: 'Estuve trabajando en modalidad contractor para la empresa Practia, encargado de la realización de features frontend con tecnologías como React Js, Next Js, Tailwind CSS, entre otras.',
      en: 'Worked as a contractor for Practia company, responsible for frontend feature development with technologies such as React Js, Next Js, Tailwind CSS, among others.',
    },
    skills: ['React Js', 'Next Js', 'Tailwind CSS', 'JavaScript', 'TypeScript', 'Git', 'GitHub', 'Figma', 'Confluence', 'MySQL Workbench', 'Postman', 'JIRA'],
  },
  {
    id: 'ucontact',
    role: { es: 'Quality Assurance Engineer', en: 'Quality Assurance Engineer' },
    company: 'Ucontact by net2phone',
    logo: '/companies/ucontact.png',
    period: { es: '2024 - Actual', en: '2024 - Present' },
    location: { es: 'Uruguay', en: 'Uruguay' },
    description: {
      es: 'Actualmente me encuentro trabajando como Software Quality Assurance Engineer en la empresa Ucontact by net2phone, encargado de la creación y ejecución de casos de prueba, reporte de errores y áreas de mejora. Además, soy responsable de la automatización de pruebas y la integración de herramientas de QA en el flujo de trabajo de desarrollo.',
      en: 'Currently working as a Software Quality Assurance Engineer at Ucontact by net2phone, responsible for creating and executing test cases, reporting bugs and areas for improvement. Additionally, I am responsible for test automation and the integration of QA tools into the development workflow.',
    },
    skills: ['GitHub', 'SalesForce', 'Javascript', 'Visual Studio Code', 'Termius', 'Postman', 'Confluence', 'MySQL Workbench'],
  },
  {
    id: 'nareia',
    role: { es: 'Mid Functional Tester', en: 'Mid Functional Tester' },
    company: 'NAREIA SOFTWARE',
    logo: '/companies/nareia.jpeg',
    period: { es: '2023 - 2024', en: '2023 - 2024' },
    location: { es: 'Uruguay', en: 'Uruguay' },
    description: {
      es: "Formé parte del equipo de QA para la aplicación mobile 'MiDinero', específicamente en el rol de Tester Funcional. Dentro de mis responsabilidades se incluye la identificación y reporte de errores y áreas de mejora, la elaboración de casos de prueba y user stories, así como la ejecución de pruebas de regresión en diversos entornos de desarrollo.",
      en: "Part of the QA team for the mobile application 'MiDinero', specifically in the Functional Tester role. My responsibilities included identifying and reporting bugs and areas for improvement, writing test cases and user stories, as well as executing regression tests across various development environments.",
    },
    skills: ['JIRA', 'Figma', 'Postman', 'Appcenter', 'TestFlight', 'Vysor', 'Zephyr', 'GitHub', 'BrowserStack', 'Slack', 'Confluence', 'Toggl'],
  },
  {
    id: 'startqa-automation-kotlin',
    role: { es: 'Quality Assurance Automation', en: 'Quality Assurance Automation' },
    company: 'Start QA',
    logo: '/companies/startqa.png',
    period: { es: '2022 - 2024', en: '2022 - 2024' },
    location: { es: 'Estados Unidos', en: 'United States' },
    description: {
      es: 'Información Confidencial - Proyecto de Automation en Kotlin para un cliente en Estados Unidos.',
      en: 'Confidential Information - Automation project in Kotlin for a client in the United States.',
    },
    skills: ['Kotlin', 'Espresso Library', 'Jetpack Compose', 'Bitrise', 'GitHub', 'BrowserStack', 'Figma', 'Slack', 'JIRA'],
  },
  {
    id: 'startqa-cypress-okta',
    role: { es: 'Quality Assurance Automation / Manual', en: 'Quality Assurance Automation / Manual' },
    company: 'Start QA',
    logo: '/companies/startqa.png',
    period: { es: '2022 - 2023', en: '2022 - 2023' },
    location: { es: 'Estados Unidos', en: 'United States' },
    description: {
      es: 'Información Confidencial - Proyecto de Automation y Manual brindando servicios a empresas como Okta, Auth0, Azure, encargado del control de calidad y automatización de casos de prueba en Cypress.',
      en: 'Confidential Information - Automation and Manual project providing services to companies such as Okta, Auth0, Azure, responsible for quality control and test case automation in Cypress.',
    },
    skills: ['Cypress', 'LaunchDarkly', 'Postman', 'MongoDB', 'GitHub', 'PracticTests', 'Figma', 'Slack', 'JIRA'],
  },
  {
    id: 'startqa-manual-wallet-1',
    role: { es: 'Quality Assurance Manual', en: 'Quality Assurance Manual' },
    company: 'Start QA',
    logo: '/companies/startqa.png',
    period: { es: '2022 - 2022', en: '2022 - 2022' },
    location: { es: 'Estados Unidos', en: 'United States' },
    description: {
      es: 'Información Confidencial - Proyecto de billetera virtual - administrador de gastos Automation y Manual en Cypress para un cliente de Estados Unidos.',
      en: 'Confidential Information - Digital wallet / expense manager project, Automation and Manual testing in Cypress for a client in the United States.',
    },
    skills: ['Cypress', 'LaunchDarkly', 'Postman', 'MongoDB', 'GitHub', 'PracticTests', 'Figma', 'Slack', 'JIRA'],
  },
  {
    id: 'startqa-manual-wallet-2',
    role: { es: 'Quality Assurance Automation / Manual', en: 'Quality Assurance Automation / Manual' },
    company: 'Start QA',
    logo: '/companies/startqa.png',
    period: { es: '2021 - 2022', en: '2021 - 2022' },
    location: { es: 'Estados Unidos', en: 'United States' },
    description: {
      es: 'Información Confidencial - Proyecto de billetera virtual - administrador de gastos Automation y Manual en Cypress para un cliente de Estados Unidos.',
      en: 'Confidential Information - Digital wallet / expense manager project, Automation and Manual testing in Cypress for a client in the United States.',
    },
    skills: ['Cypress', 'LaunchDarkly', 'Postman', 'MongoDB', 'GitHub', 'PracticTests', 'Figma', 'Slack', 'JIRA'],
  },
  {
    id: 'ecommerce-full',
    role: { es: 'Frontend Developer', en: 'Frontend Developer' },
    company: 'E-Commerce Full',
    logo: '/companies/ecommercefull.jpeg',
    period: { es: '2021 - 2021', en: '2021 - 2021' },
    location: { es: 'Uruguay', en: 'Uruguay' },
    description: {
      es: "Desarrollador Front-End para los clientes de la empresa como: Zapatería TOTO, WATCHME, Carter's, entre otros. Maquetador de sitios e-commerce, encargado del área de marketing y redes sociales.",
      en: "Front-End Developer for company clients such as: Zapatería TOTO, WATCHME, Carter's, among others. E-commerce site builder, responsible for marketing and social media.",
    },
    skills: ['HTML', 'PHP', 'CSS', 'WordPress', 'Adobe Photoshop', 'Adobe Illustrator', 'JavaScript', 'Redes sociales'],
  },
  {
    id: 'cellpay-directv',
    role: { es: 'Web Designer / Marketing', en: 'Web Designer / Marketing' },
    company: 'CellPay - DIRECTV Agente Oficial',
    logo: '/companies/cellpay.jpg',
    period: { es: '2020 - 2020', en: '2020 - 2020' },
    location: { es: 'Uruguay', en: 'Uruguay' },
    description: {
      es: 'Diseñador web de la página de la empresa, también encargado del área de marketing y publicidad.',
      en: 'Web designer for the company website, also responsible for the marketing and advertising area.',
    },
    skills: ['HTML', 'CSS', 'JS', 'Figma', 'Google Ads', 'Photoshop', 'Canva'],
  },
];
