import { ref, computed, watchEffect, type Ref, type ComputedRef } from 'vue';

export function useManglingValidation(
  input: Ref<string>,
  validator: (input: string) => boolean
) {
  const isInputValid = computed<boolean>(() => {
    return validator(input.value);
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
  input: Ref<string>,
  isInputValid: ComputedRef<boolean>,
  mangler: (input: string) => string
) {
  const fallbackMangled = ref<string | null>(null);
  const mangled = computed<string | null>(() => {
    return isInputValid.value ? mangler(input.value) : null;
  });
  const displayedMangled = computed<string | null>(() => {
    return mangled.value ?? fallbackMangled.value;
  });

  watchEffect(() => {
    if (mangled.value) {
      fallbackMangled.value = mangled.value;
    }
  });

  return {
    mangled,
    displayedMangled
  };
}
