import type { Directive } from 'vue';
import markdownit from 'markdown-it';
const md = markdownit();

function render(value: string) {
  return md.render(value);
}

export const vMarkdown: Directive = {
  beforeMount(el, binding) {
    el.innerHTML = render(binding.value);
  },
  beforeUpdate(el, binding) {
    el.innerHTML = render(binding.value);
  }
};
