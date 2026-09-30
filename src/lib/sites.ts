export type SiteId = 'youtube' | 'instagram' | 'facebook';

export const SITES: Record<SiteId, { label: string; hosts: string[] }> = {
  youtube: { label: 'YouTube', hosts: ['youtube.com'] },
  instagram: { label: 'Instagram', hosts: ['instagram.com'] },
  facebook: { label: 'Facebook', hosts: ['facebook.com'] },
};

export function siteForHostname(hostname: string): SiteId | undefined {
  return (Object.keys(SITES) as SiteId[]).find((id) =>
    SITES[id].hosts.some((h) => hostname === h || hostname.endsWith(`.${h}`)),
  );
}
