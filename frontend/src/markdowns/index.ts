import DevicesIt from './devices.it.md?raw';
import DevicesEn from './devices.en.md?raw';

import PreferencesIt from './preferences.it.md?raw';
import PreferencesEn from './preferences.en.md?raw';

import type { SupportedLanguage } from '@/stores/language';

const markdowns = {
  devices: {
    it: DevicesIt,
    en: DevicesEn
  },
  preferences: {
    it: PreferencesIt,
    en: PreferencesEn
  }
} satisfies Record<string, Record<SupportedLanguage, string>>;

export type MarkdownKey = keyof typeof markdowns;

export default markdowns;
