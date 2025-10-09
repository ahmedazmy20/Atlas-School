<template>
  <aside
    class="fixed left-0 pt-8 top-0 h-screen w-72 bg-white border-r border-gray-200 flex flex-col shadow-2xl">
    <!-- Header -->
    <div class="flex items-center gap-3 p-4 border-b border-gray-100">
      <div
        class="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-md">
        <Icon name="lucide:graduation-cap" class="w-6 h-6" />
      </div>
      <div>
        <p class="font-semibold text-blue-900 font">Ibn Khaldun</p>
        <p class="text-sm text-gray-500">Schools Management</p>
      </div>
    </div>

    <!-- Links -->
    <nav class="flex-1 p-4 space-y-2">
      <!-- Dashboard -->
      <NuxtLink
        to="/dash-board"
        class="group flex items-center gap-3 px-3 py-2 rounded-lg text-lg font-semibold text-blue-700 transition-colors hover:bg-gray-100 [&.router-link-exact-active]:bg-blue-700 [&.router-link-exact-active]:text-white [&.router-link-exact-active:hover]:bg-blue-700">
        <Icon name="lucide:home" class="w-5 h-5" />
        <span>Dashboard</span>
      </NuxtLink>

      <!-- Products Management -->
      <NuxtLink
        to="/products-management"
        class="group flex items-center gap-3 px-3 py-2 rounded-lg text-lg font-semibold text-blue-700 transition-colors hover:bg-gray-100 [&.router-link-exact-active]:bg-blue-700 [&.router-link-exact-active]:text-white [&.router-link-exact-active:hover]:bg-blue-700">
        <Icon name="lucide:package" class="w-5 h-5" />
        <span>Products Management</span>
      </NuxtLink>
    </nav>
  </aside>
</template>

<script setup>
// لا تحتاج أي logic هنا حالياً
</script>

<style scoped>
/* ممكن تضيف استايل خاص هنا لو عايز */
</style>
