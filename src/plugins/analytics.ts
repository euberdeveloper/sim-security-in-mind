import config from "@/config";
import type { App } from "vue";
import VueGtag from "vue-gtag";
import type { Router } from "vue-router";

export function useAnalytics(app: App, router: Router) {
  app.use(VueGtag, {
    config: { id: config.gtag.id },
}, router);
}
