import { type NavigationGuard } from 'vue-router';
import { i18n } from '@/plugins/i18n';
import { useHead, type Meta } from '@unhead/vue';

import { purgeTitle } from '@/compositions/pageTitle';

function handleTitle(rawTitle: string) {
  const { t } = i18n.global;
  const { text: purgedTitle } = purgeTitle(rawTitle);
  const title = purgedTitle ? (t as any)(`routes.titles.${purgedTitle}`) : undefined;
  return title;
}

function handleDescription(rawDescription: string | undefined, metas: Meta[]) {
  const { t } = i18n.global;
  const description = rawDescription
    ? (t as any)(`routes.descriptions.${rawDescription}`)
    : undefined;
  if (description) {
    metas.push({ name: 'description', content: description });
  }
}

function handleLang(localeParam: string | string[] | undefined) {
  if (!localeParam) {
    console.warn('[head guard] No locale param provided to route.');
    return undefined;
  }
  if (Array.isArray(localeParam)) {
    console.warn(
      '[head guard] Multiple locale params provided to route. Using the first element.',
      localeParam
    );
    return localeParam[0];
  }
  return localeParam;
}

export const headGuard: NavigationGuard = (to) => {
  const metas: Meta[] = [];

  const { title: rawTitle, description: rawDescription } = to.meta;
  const title = handleTitle(rawTitle);
  handleDescription(rawDescription, metas);
  const lang = handleLang(to.params.locale);

  useHead({
    htmlAttrs: {
      lang
    },
    title: title,
    meta: metas
  });
};
