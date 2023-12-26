import 'vue-router';
import { MarkdownKey } from './types/markdown';

// To ensure it is treated as a module, add at least one `export` statement
export {}

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    info?: MarkdownKey;
  }
}

declare module 'vue3-markdown-it';