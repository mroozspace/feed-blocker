import type { SiteId } from '../sites';

export type BlockRule = {
  /** Unique, stable id, e.g. "youtube.home-feed". Used as the storage key. */
  id: string;
  site: SiteId;
  label: string;
  description?: string;
  /** Whether the rule is on when the user has not touched it. */
  default: boolean;
  /** Restrict the rule to certain pages (evaluated on every navigation). */
  when?: (url: URL) => boolean;
  /** CSS selectors to `display: none`. */
  hide?: string[];
  /** Escape hatch for JS-based hiding. Runs while active; returns a cleanup. */
  apply?: () => () => void;
};
