import type { BlockRule } from './types';

const isHome = (url: URL) => url.pathname === '/';
const HOME = 'ytd-browse[page-subtype="home"]';

export const youtubeRules: BlockRule[] = [
  {
    id: 'youtube.home-feed',
    site: 'youtube',
    label: 'Home: recommended videos',
    description: 'Hide the video suggestions on the home page.',
    default: true,
    when: isHome,
    hide: [`${HOME} ytd-rich-grid-renderer > #contents`],
  },
  {
    id: 'youtube.home-shorts',
    site: 'youtube',
    label: 'Home: Shorts shelf',
    description: 'Hide the Shorts shelf on the home page.',
    default: true,
    when: isHome,
    hide: [`${HOME} ytd-rich-section-renderer`, `${HOME} ytd-rich-shelf-renderer[is-shorts]`],
  },
  {
    id: 'youtube.home-chips',
    site: 'youtube',
    label: 'Home: filter chips',
    description: 'Hide the topic chip bar (All, Music, Gaming…).',
    default: true,
    when: isHome,
    hide: [`${HOME} ytd-feed-filter-chip-bar-renderer`],
  },
  {
    id: 'youtube.watch-comments',
    site: 'youtube',
    label: 'Video: comments',
    description: 'Hide the comments section under videos.',
    default: true,
    when: (url) => url.pathname === '/watch',
    hide: [
      'ytd-comments',
      'ytd-comments-entry-point-header-renderer',
      'ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-comments-section"]',
    ],
  },
];
