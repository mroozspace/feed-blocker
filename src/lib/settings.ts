import { storage } from '#imports';
import type { BlockRule } from './rules/types';

export type Settings = Record<string, boolean>;

export const settingsItem = storage.defineItem<Settings>('sync:settings', { fallback: {} });

export const isEnabled = (settings: Settings, rule: BlockRule) =>
  settings[rule.id] ?? rule.default;
