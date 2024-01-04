import type { Directive } from 'vue';
import markdownit from 'markdown-it';
import type MarkdownIt from 'markdown-it';

export interface PluginSimpleItem {
  type: 'simple';
  plugin: MarkdownIt.PluginSimple;
}
export interface PluginWithOptionsItem<T> {
  type: 'with-options';
  plugin: MarkdownIt.PluginWithOptions<T>;
  options: T;
}
export interface PluginWithParamsItem {
  type: 'with-params';
  plugin: MarkdownIt.PluginWithParams;
  params: any[];
}
export type PluginItem = PluginSimpleItem | PluginWithOptionsItem<any> | PluginWithParamsItem;

function getVMarkdown(options: MarkdownIt.Options = {}, plugins: PluginItem[] = []): Directive {
  const md = markdownit(options);

  for (const plugin of plugins) {
    switch (plugin.type) {
      case 'simple':
        md.use(plugin.plugin);
        break;
      case 'with-options':
        md.use(plugin.plugin, plugin.options);
        break;
      case 'with-params':
        md.use(plugin.plugin, ...plugin.params);
        break;
    }
  }

  function render(value: string) {
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
