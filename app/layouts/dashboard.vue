<template>
  <div class="min-h-screen flex flex-col bg-[#bbc3ed3c]">
    <!-- 🔹 Navbar full width -->
    <NavBar class="fixed top-0 left-0 right-0 z-50" />

    <!-- 🔹 محتوى الصفحة تحت الـ Navbar -->
    <div class="flex pt-[70px]">
      <SideBar class="w-64 fixed top-[70px] left-0 bottom-0" />
      <main class="flex-1 ml-72 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
