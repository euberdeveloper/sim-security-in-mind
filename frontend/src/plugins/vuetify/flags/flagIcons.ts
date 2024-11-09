import { h } from 'vue';
import type { IconSet, IconProps } from 'vuetify';
import FlagIcon from './FlagIcon.vue';

const fi: IconSet = {
  component: (props: IconProps) => h(FlagIcon, { ...props, class: 'fi' } as any)
};

export { fi };
