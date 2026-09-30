<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from 'wxt/browser';
  import { ruleGroups } from '@/lib/rules';
  import { isEnabled, settingsItem, type Settings } from '@/lib/settings';
  import { siteForHostname } from '@/lib/sites';

  let settings = $state<Settings>({});
  let currentSite = $state<string>();

  // Current tab's site first.
  const groups = $derived(
    ruleGroups().toSorted((a, b) => Number(b.site === currentSite) - Number(a.site === currentSite)),
  );

  onMount(() => {
    settingsItem.getValue().then((v) => (settings = v));
    browser.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
      if (tab?.url) currentSite = siteForHostname(new URL(tab.url).hostname);
    });
    return settingsItem.watch((v) => (settings = v));
  });

  function toggle(id: string, checked: boolean) {
    settings = { ...settings, [id]: checked };
    settingsItem.setValue($state.snapshot(settings));
  }
</script>

<main>
  <h1>Feed Blocker</h1>
  {#each groups as group (group.site)}
    <section>
      <h2>{group.label}</h2>
      {#each group.rules as rule (rule.id)}
        <label class="row">
          <span>
            <strong>{rule.label}</strong>
            {#if rule.description}<small>{rule.description}</small>{/if}
          </span>
          <input
            type="checkbox"
            checked={isEnabled(settings, rule)}
            onchange={(e) => toggle(rule.id, e.currentTarget.checked)}
          />
        </label>
      {/each}
    </section>
  {/each}
</main>

<style>
  main {
    width: 320px;
    padding: 12px 16px 16px;
    text-align: left;
  }
  h1 {
    font-size: 1.1rem;
    margin: 0 0 8px;
  }
  h2 {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    opacity: 0.6;
    margin: 12px 0 4px;
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 6px 0;
    cursor: pointer;
  }
  .row span {
    display: flex;
    flex-direction: column;
  }
  small {
    opacity: 0.6;
  }
</style>
