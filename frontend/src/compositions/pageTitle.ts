import type { ComputedRef } from 'vue';
import { computed } from 'vue';

export interface TitleDescriptor {
  text: string;
  position?: 'start' | 'center' | 'end' | 'justify' | 'left' | 'right';
  case?: 'auto' | 'capitalize' | 'uppercase' | 'lowercase';
  bold?: boolean;
}

export function purgeTitle(title: string | TitleDescriptor | undefined): Required<TitleDescriptor> {
  if (title === undefined) {
    title = '';
  }

  if (typeof title === 'string') {
    title = { text: title };
  }

  return {
    text: title.text,
    position: title.position ?? 'start',
    case: title.case ?? 'auto',
    bold: title.bold ?? false
  };
}

export function handlePageTitle(title: ComputedRef<string | TitleDescriptor>) {
  const pageTitle = computed(() => purgeTitle(title.value));
  return pageTitle;
}
