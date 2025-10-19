<template>
  <div>
    <!-- navbar -->
    <language-switcher />
    <DarkMode class="absolute top-4 ltr:left-32 rtl:right-32" />
    <slot />
    <!-- footer -->
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
