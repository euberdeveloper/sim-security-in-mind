import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import { fi } from './flags/flagIcons';

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    sets: {
      fi
    }
  },
  components,
  directives
});

export default vuetify;
