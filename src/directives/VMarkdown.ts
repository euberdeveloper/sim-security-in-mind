import type { Directive } from 'vue';
import markdownit from 'markdown-it';
import type MarkdownIt from 'markdown-it';

function getVMarkdown(options: MarkdownIt.Options = {}): Directive {
  const md = markdownit(options);

  function render(value: string)  {
    return md.render(value);
  }

  return {
    beforeMount(el, binding) {
      el.innerHTML = render(binding.value);
    },
    beforeUpdate(el, binding) {
      el.innerHTML = render(binding.value);
    }
  };

}

export const vMarkdown = getVMarkdown();

export default getVMarkdown;