import { ref, computed, watchEffect, type Ref } from 'vue';

export function useMangling(
  input: Ref<string>,
  validator: (string) => boolean,
  mangler: (string) => string
) {
  const fallbackMangled = ref<string | null>(null);
  const isMangledValid = computed<boolean>(() => {
    return validator(input.value);
  });
  const mangled = computed<string | null>(() => {
    return isMangledValid.value ? mangler(input.value) : null;
  });
  const displayedMangled = computed<string | null>(() => {
    return mangled.value ?? fallbackMangled.value;
  });
  function mangledValidationRule() {
    return isMangledValid.value;
  }

  watchEffect(() => {
    if (mangled.value) {
      fallbackMangled.value = mangled.value;
    }
  });

  return {
    mangled,
    fallbackMangled,
    displayedMangled,
    isMangledValid,
    mangledValidationRule
  };
}
