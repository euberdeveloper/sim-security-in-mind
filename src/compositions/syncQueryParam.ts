import { type Ref, watch } from 'vue';
import type { RouteLocationNormalized, Router } from 'vue-router';

export function syncQueryParam<T>(
  variable: Ref<T>,
  router: Router,
  route: RouteLocationNormalized,
  queryParam: string,
  serializer: (value: T) => string | null | undefined,
  deserializer: (value: string) => T,
) {
  function updateRoute(value: T) {
    router.replace({ query: { ...route.query, [queryParam]: serializer(value) } });
  }

  if (route.query[queryParam]) {
    variable.value = deserializer(route.query[queryParam] as string);
  }
  updateRoute(variable.value);
  watch(variable, () => {
    updateRoute(variable.value);
  });
}

export function syncStringQueryParam(
  variable: Ref<string | null>,
  router: Router,
  route: RouteLocationNormalized,
  queryParam: string
) {
  return syncQueryParam(
    variable,
    router,
    route,
    queryParam,
    (value) => value || undefined,
    (value) => value,
  );
}

export function syncBooleanQueryParam(
  variable: Ref<boolean>,
  router: Router,
  route: RouteLocationNormalized,
  queryParam: string
) {
  return syncQueryParam(
    variable,
    router,
    route,
    queryParam,
    (value) => value ? null : undefined,
    (value) => value !== undefined,
  );
}
