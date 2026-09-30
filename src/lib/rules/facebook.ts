import type { BlockRule } from './types';

// Facebook's class names are obfuscated and rotate, so these rely on stable
// attributes: data-pagelet and (localized) aria-labels.
const isHome = (url: URL) => url.pathname === '/' || url.pathname === '/home.php';

export const facebookRules: BlockRule[] = [
  {
    id: 'facebook.home-stories',
    site: 'facebook',
    label: 'Home: stories',
    description: 'Hide the stories tray on the home page.',
    default: true,
    when: isHome,
    hide: [
      '[data-pagelet="Stories"]',
      'div[aria-label="Stories"]',
      'div[aria-label="Relacje"]',
    ],
  },
];
