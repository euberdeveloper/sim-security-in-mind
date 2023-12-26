import { ref, computed, watchEffect, type Ref, type ComputedRef } from 'vue';

export function useManglingValidation(
  input: Ref<string | null>,
  validator: (input: string) => boolean
) {
  const isInputValid = computed<boolean>(() => {
    return !!input.value && validator(input.value);
  });
  function mangledValidationRule() {
    return isInputValid.value;
  }

  return {
    isInputValid,
    mangledValidationRule
  };
}

export function useMangling(
  input: Ref<string | null>,
  isInputValid: ComputedRef<boolean>,
  mangler: (input: string) => string
) {
  const fallbackMangled = ref<string | null>(null);
  const mangled = computed<string | null>(() => {
    return isInputValid.value ? mangler(input.value as string) : null;
  });
  const displayedMangled = computed<string | null>(() => {
    return mangled.value ?? fallbackMangled.value;
  });

  watchEffect(() => {
    if (mangled.value) {
      fallbackMangled.value = mangled.value;
    }
    else if (input.value === null) {
      fallbackMangled.value = null;
    }
  });

  return {
    mangled,
    displayedMangled
  };
}
