import { SITES, type SiteId } from '../sites';
import { facebookRules } from './facebook';
import { youtubeRules } from './youtube';
import type { BlockRule } from './types';

// Add a new site's rules file here.
export const ALL_RULES: BlockRule[] = [...youtubeRules, ...facebookRules];

export const rulesForSite = (site: SiteId) => ALL_RULES.filter((r) => r.site === site);

export const ruleGroups = () =>
  (Object.keys(SITES) as SiteId[])
    .map((site) => ({ site, label: SITES[site].label, rules: rulesForSite(site) }))
    .filter((g) => g.rules.length > 0);

/** One stylesheet for all rules, each gated on a token in <html data-blocked>. */
export function buildCss(rules: BlockRule[]): string {
  return rules
    .filter((r) => r.hide?.length)
    .map((r) => {
      const gate = `html[data-blocked~="${r.id}"]`;
      return `${r.hide!.map((s) => `${gate} ${s}`).join(',\n')} { display: none !important; }`;
    })
    .join('\n');
}

export type { BlockRule };
