import { type Ref, watch } from 'vue';
import type { RouteLocationNormalized, Router } from 'vue-router';

export function syncQueryParam(
  variable: Ref<string | null>,
  router: Router,
  route: RouteLocationNormalized,
  queryParam: string
) {
  function updateRoute(value: string | null) {
    router.replace({ query: { ...route.query, [queryParam]: value || undefined } });
  }

  if (route.query[queryParam]) {
    variable.value = route.query[queryParam] as string;
  }
  updateRoute(variable.value);
  watch(variable, () => {
    updateRoute(variable.value);
  });
}
