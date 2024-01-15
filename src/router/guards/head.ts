import { type NavigationGuard } from 'vue-router';
import { i18n } from '@/plugins/i18n';
import { useHead, type Meta } from '@unhead/vue'

import { purgeTitle } from '@/compositions/pageTitle';

function handleTitle(rawTitle: string, metas: Meta[]) {
  const { t } = i18n.global;
  const {text: purgedTitle} = purgeTitle(rawTitle);
  const title =  purgedTitle ? (t as any)(`routes.titles.${purgedTitle}`) : undefined;
  if (title) {
    metas.push({ property: 'og:title', content: title });
  }
  return title;
}

function handleDescription(rawDescription: string | undefined, metas: Meta[]) {
  const { t } = i18n.global;
  const description = rawDescription ? (t as any)(`routes.descriptions.${rawDescription}`) : undefined;
  if (description) {
    metas.push({ name: 'description', content: description });
    metas.push({ property: 'og:description', content: description });
  }
}

export const headGuard: NavigationGuard = (to) => {
  const metas: Meta[] = [];

  const { title: rawTitle, description: rawDescription } = to.meta;
  const title = handleTitle(rawTitle, metas);
  handleDescription(rawDescription, metas);

  useHead({
    title: title,
    meta: metas
  });
};
