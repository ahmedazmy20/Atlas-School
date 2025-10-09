<template>
  <div class="min-h-screen">
    <!-- 🔹 الهيدر أو النافبار -->
    <NavCoustom />

    <!-- 🔹 محتوى الصفحة -->
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
// مفيش حاجة هنا غالبًا، إلا لو عايز تضيف logic معين
</script>

<style scoped>
/* اختياري */
</style>
