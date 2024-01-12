export default {
  appVersion: __APP_VERSION__,
  localStoragePrefix: import.meta.env.VITE_LOCAL_STORAGE_PREFIX,
  gtag: {
    enabled: import.meta.env.VITE_GTAG_ENABLED === 'true',
    id: import.meta.env.VITE_GTAG_ID
  },
  i18n: {
    defaultLocale: import.meta.env.VITE_I18N_DEFAULT_LOCALE,
    fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE
  },
  website: {
    url: import.meta.env.VITE_WEBSITE_URL ?? '/'
  }
};
