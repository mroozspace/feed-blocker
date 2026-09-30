import { buildCss, rulesForSite } from '@/lib/rules';
import { isEnabled, settingsItem, type Settings } from '@/lib/settings';
import { siteForHostname } from '@/lib/sites';

export default defineContentScript({
  matches: ['*://*.youtube.com/*', '*://*.facebook.com/*', '*://*.instagram.com/*'],
  runAt: 'document_start',
  async main(ctx) {
    const site = siteForHostname(location.hostname);
    if (!site) return;
    const rules = rulesForSite(site);

    const style = document.createElement('style');
    style.textContent = buildCss(rules);
    document.documentElement.append(style);

    const cleanups = new Map<string, () => void>();
    let settings: Settings = await settingsItem.getValue();

    const sync = () => {
      const url = new URL(location.href);
      const active: string[] = [];
      for (const rule of rules) {
        const on = isEnabled(settings, rule) && (rule.when?.(url) ?? true);
        if (on) active.push(rule.id);
        if (rule.apply) {
          if (on && !cleanups.has(rule.id)) cleanups.set(rule.id, rule.apply());
          if (!on) {
            cleanups.get(rule.id)?.();
            cleanups.delete(rule.id);
          }
        }
      }
      document.documentElement.dataset.blocked = active.join(' ');
    };

    sync();
    const unwatch = settingsItem.watch((value) => {
      settings = value;
      sync();
    });
    ctx.addEventListener(window, 'wxt:locationchange', sync);
    ctx.onInvalidated(() => {
      unwatch();
      cleanups.forEach((fn) => fn());
      delete document.documentElement.dataset.blocked;
      style.remove();
    });
  },
});
