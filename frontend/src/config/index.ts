export default {
  appVersion: __APP_VERSION__,
  localStoragePrefix: import.meta.env.VITE_LOCAL_STORAGE_PREFIX,
  i18n: {
    defaultLocale: import.meta.env.VITE_I18N_DEFAULT_LOCALE,
    fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE
  },
  networkMonitoring: {
    uncachedUrl: import.meta.env.VITE_NETWORK_MONITORING_UNCACHED_URL ?? '/',
    interval: +(import.meta.env.VITE_NETWORK_MONITORING_INTERVAL ?? 5000)
  }
};
