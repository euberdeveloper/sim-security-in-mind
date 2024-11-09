import 'vue-router';
import { type MarkdownKey } from '@/markdowns';
import { type TitleDescriptor } from '@/utils/pageTitle';

// To ensure it is treated as a module, add at least one `export` statement
export {}

declare module 'vue-router' {
  interface RouteMeta {
    title?: TitleDescriptor | string;
    description?: string;
    info?: MarkdownKey;
  }
}

declare module 'vue3-markdown-it';
