<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from 'wxt/browser';
  import { ruleGroups } from '@/lib/rules';
  import { isEnabled, settingsItem, type Settings } from '@/lib/settings';
  import { siteForHostname } from '@/lib/sites';

  let settings = $state<Settings>({});
  let currentSite = $state<string>();
  let scroller = $state<HTMLElement>();
  let moreBelow = $state(false);

  const updateMore = () => {
    if (scroller) moreBelow = scroller.scrollTop + scroller.clientHeight < scroller.scrollHeight - 4;
  };

  // Current tab's site first.
  const groups = $derived(
    ruleGroups().toSorted((a, b) => Number(b.site === currentSite) - Number(a.site === currentSite)),
  );

  onMount(() => {
    settingsItem.getValue().then((v) => (settings = v));
    browser.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
      if (tab?.url) currentSite = siteForHostname(new URL(tab.url).hostname);
    });
    const unwatch = settingsItem.watch((v) => (settings = v));
    // Recompute when content size changes (e.g. current-site group moves/loads).
    const ro = new ResizeObserver(updateMore);
    if (scroller) {
      ro.observe(scroller);
      if (scroller.firstElementChild) ro.observe(scroller.firstElementChild);
    }
    return () => {
      unwatch();
      ro.disconnect();
    };
  });

  function toggle(id: string, checked: boolean) {
    settings = { ...settings, [id]: checked };
    settingsItem.setValue($state.snapshot(settings));
  }
</script>

<main>
  <h1><img src="/logo.svg" alt="" width="24" height="24" />Feed Blocker</h1>
  <div class="frame">
    <div class="scroll" bind:this={scroller} onscroll={updateMore}>
      <div class="content">
  {#each groups as group (group.site)}
    <section class="group" class:current={group.site === currentSite}>
      <h2>{group.label}</h2>
      <div class="card">
        {#each group.rules as rule (rule.id)}
          <label class="row">
            <span class="text">
              <span class="label">{rule.label}</span>
              {#if rule.description}<span class="desc">{rule.description}</span>{/if}
            </span>
            <input
              type="checkbox"
              role="switch"
              checked={isEnabled(settings, rule)}
              onchange={(e) => toggle(rule.id, e.currentTarget.checked)}
            />
          </label>
        {/each}
      </div>
    </section>
  {/each}
      </div>
    </div>
    {#if moreBelow}
      <button
        class="more"
        aria-label="Scroll down for more"
        onclick={() => scroller?.scrollBy({ top: scroller.clientHeight * 0.8, behavior: 'smooth' })}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    {/if}
  </div>
</main>

<style>
  main {
    width: 360px;
    box-sizing: border-box;
    padding: 16px;
  }
  h1 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.01em;
    margin: 0 0 12px;
  }
  .frame {
    position: relative;
  }
  .scroll {
    max-height: 500px;
    overflow-y: auto;
    scrollbar-width: thin;
  }
  .more {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 44px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 0 0 4px;
    border: 0;
    background: linear-gradient(to bottom, transparent, var(--bg) 85%);
    color: var(--text);
    cursor: pointer;
  }
  .more svg {
    animation: nudge 1.4s ease-in-out infinite;
  }
  @keyframes nudge {
    50% {
      transform: translateY(3px);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .more svg {
      animation: none;
    }
  }
  .group {
    margin-top: 16px;
  }
  .group:first-child {
    margin-top: 0;
  }
  h2 {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 0 6px 2px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .current h2 {
    color: var(--text);
  }
  .current h2::after {
    content: 'this tab';
    padding: 1px 6px;
    border-radius: 999px;
    background: var(--accent);
    color: var(--accent-text);
    font-size: 10px;
    letter-spacing: 0.04em;
  }
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 14px;
    padding: 10px 12px;
    cursor: pointer;
  }
  .row + .row {
    border-top: 1px solid var(--border);
  }
  .row:hover {
    background: color-mix(in srgb, var(--accent) 7%, transparent);
  }
  .text {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  .label {
    font-size: 14px;
    font-weight: 600;
    color: var(--text);
  }
  .desc {
    font-size: 12.5px;
    color: var(--muted);
  }

  /* Toggle switch */
  input[type='checkbox'] {
    appearance: none;
    flex: none;
    position: relative;
    width: 38px;
    height: 22px;
    margin: 0;
    border-radius: 999px;
    background: var(--track);
    cursor: pointer;
    transition: background 0.15s;
  }
  input[type='checkbox']::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 2px rgb(0 0 0 / 0.3);
    transition: transform 0.15s;
  }
  input[type='checkbox']:checked {
    background: var(--accent);
  }
  input[type='checkbox']:checked::after {
    transform: translateX(16px);
  }
  input[type='checkbox']:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
</style>
