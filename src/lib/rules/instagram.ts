import type { BlockRule } from './types';

// Instagram's class names are obfuscated and rotate, so these rely on stable
// attributes (data-pagelet, semantic tags). Unverified against the live site.
const isHome = (url: URL) => url.pathname === '/';

export const instagramRules: BlockRule[] = [
  {
    id: 'instagram.home-feed',
    site: 'instagram',
    label: 'Home: feed',
    description: 'Hide the post feed on the home page.',
    default: true,
    when: isHome,
    hide: ['main[role="main"] article', '[data-pagelet="main_feed"]'],
  },
  {
    id: 'instagram.home-stories',
    site: 'instagram',
    label: 'Home: stories',
    description: 'Hide the stories tray on the home page.',
    default: true,
    when: isHome,
    hide: ['[data-pagelet="story_tray"]'],
  },
];
