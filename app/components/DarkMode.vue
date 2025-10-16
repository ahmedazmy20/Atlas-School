<template>
  <UButton
    color="gray"
    variant="ghost"
    icon
    :aria-label="`Switch to ${
      colorMode.value === 'dark' ? 'light' : 'dark'
    } mode`"
    @click="toggleTheme">
    <UIcon
      :name="
        colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'
      "
      class="w-5 h-5" />
  </UButton>
</template>

<script setup>
const colorMode = useColorMode();

const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>
