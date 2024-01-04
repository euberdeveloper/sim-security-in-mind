import MangleConstructorIt from './mangle-constructor.it.md?raw';
import MangleConstructorEn from './mangle-constructor.en.md?raw';

import MangleTypeIt from './mangle-type.it.md?raw';
import MangleTypeEn from './mangle-type.en.md?raw';

import MangleClassIdentifierIt from './mangle-class-identifier.it.md?raw';
import MangleClassIdentifierEn from './mangle-class-identifier.en.md?raw';

import PreferencesIt from './preferences.it.md?raw';
import MangleMethodEn from './mangle-method.en.md?raw';

import MangleMethodIt from './mangle-method.it.md?raw';
import PreferencesEn from './preferences.en.md?raw';

import type { SupportedLanguage } from '@/stores/language';

const markdowns = {
  'mangle-constructor': {
    it: MangleConstructorIt,
    en: MangleConstructorEn
  },
  'mangle-type': {
    it: MangleTypeIt,
    en: MangleTypeEn
  },
  'mangle-class-identifier': {
    it: MangleClassIdentifierIt,
    en: MangleClassIdentifierEn
  },
  'mangle-method': {
    it: MangleMethodIt,
    en: MangleMethodEn
  },
  'preferences': {
    it: PreferencesIt,
    en: PreferencesEn
  }
} satisfies Record<string, Record<SupportedLanguage, string>>;

export type MarkdownKey = keyof typeof markdowns;

export default markdowns;
