export type SkillIconConfig = {
  /** URLs a probar en orden hasta que una cargue */
  sources: string[];
  /** Logo oscuro — necesita fondo para verse en tile blanco */
  dark?: boolean;
};

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';
const SI = (slug: string, color?: string) =>
  color ? `https://cdn.simpleicons.org/${slug}/${color}` : `https://cdn.simpleicons.org/${slug}`;

/** Mapeo de skills → fuentes de iconos (devicon + simpleicons + fallbacks) */
export const skillIconMap: Record<string, SkillIconConfig> = {
  // Frontend
  'React Js': { sources: [`${DEVICON}/react/react-original.svg`] },
  'Next Js': { sources: [`${DEVICON}/nextjs/nextjs-original.svg`], dark: true },
  HTML: { sources: [`${DEVICON}/html5/html5-original.svg`] },
  CSS: { sources: [`${DEVICON}/css3/css3-original.svg`] },
  JavaScript: { sources: [`${DEVICON}/javascript/javascript-original.svg`] },
  TypeScript: { sources: [`${DEVICON}/typescript/typescript-original.svg`] },
  Bootstrap: { sources: [`${DEVICON}/bootstrap/bootstrap-original.svg`] },
  'Material UI': { sources: [`${DEVICON}/materialui/materialui-original.svg`] },
  TailWind: { sources: [`${DEVICON}/tailwindcss/tailwindcss-original.svg`] },

  // CMS
  WordPress: { sources: [`${DEVICON}/wordpress/wordpress-original.svg`] },
  WebFlow: { sources: [SI('webflow', '4353FF')] },
  'Elementor Pro': { sources: [SI('wordpress', '21759B')] },

  // Testing & QA
  Cypress: { sources: [`${DEVICON}/cypressio/cypressio-original.svg`] },
  Postman: { sources: [SI('postman', 'FF6C37')] },
  BrowserStack: { sources: [SI('selenium', '43B02A'), `${DEVICON}/selenium/selenium-original.svg`] },
  'Xray Testing': { sources: [SI('jira', '0052CC')] },
  'Zephyr Testing': { sources: [SI('jira', '0052CC')] },
  'App Center': { sources: [SI('microsoft', '5E5E5E')] },
  TestFlight: { sources: [SI('apple', '000000')], dark: true },
  'Vysor Mirroring': { sources: [`${DEVICON}/android/android-original.svg`] },

  // Languages
  Kotlin: { sources: [`${DEVICON}/kotlin/kotlin-original.svg`] },
  JAVA: { sources: [`${DEVICON}/java/java-original.svg`] },
  PHP: { sources: [`${DEVICON}/php/php-original.svg`] },
  'C++': { sources: [`${DEVICON}/cplusplus/cplusplus-original.svg`] },

  // Development tools
  'Android Studio': { sources: [`${DEVICON}/androidstudio/androidstudio-original.svg`] },
  'Visual Studio Code': { sources: [`${DEVICON}/vscode/vscode-original.svg`] },
  LaunchDarkly: { sources: [SI('datadog', '632CA6'), SI('docker', '2496ED')] },
  Bitrise: { sources: [SI('bitrise', '683D87')] },
  Git: { sources: [`${DEVICON}/git/git-original.svg`] },
  'GitHub Desktop': { sources: [`${DEVICON}/github/github-original.svg`], dark: true },
  Figma: { sources: [SI('figma', 'F24E1E')] },
  Slack: { sources: [SI('slack', '4A154B')] },
  JIRA: { sources: [SI('jira', '0052CC')] },
  asana: { sources: [SI('asana', 'F06A6A')] },
  ClickUp: { sources: [SI('clickup', '7B68EE')] },
  'Toggl Track': { sources: [SI('toggl', 'E01B22')] },
  'Adobe Illustrator': { sources: [`${DEVICON}/illustrator/illustrator-original.svg`] },
  'Adobe Photoshop': { sources: [`${DEVICON}/photoshop/photoshop-original.svg`] },
  Notion: { sources: [SI('notion', '000000')], dark: true },
};

export function getSkillIconConfig(name: string): SkillIconConfig | null {
  return skillIconMap[name] ?? null;
}
