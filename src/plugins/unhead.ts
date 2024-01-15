import type { App } from 'vue';

import { createHead } from '@unhead/vue';
import { InferSeoMetaPlugin } from '@unhead/addons';

export function titleTemplate(title?: string): string {
  console.log(title);
  return title ? `${title} | LwJavaMangler` : 'LwJavaMangler';
}

export function useUnhead(app: App) {
  app.use(
    createHead({
      plugins: [
        InferSeoMetaPlugin({
          ogTitle: titleTemplate
        })
      ]
    })
  );
}
