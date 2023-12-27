export default {
  appVersion: __APP_VERSION__,
  localStoragePrefix: import.meta.env.VITE_LOCAL_STORAGE_PREFIX,
  gtag: {
    enabled: import.meta.env.VITE_GTAG_ENABLED === 'true',
    id: import.meta.env.VITE_GTAG_ID
  }
};
