<script setup>
import { School, BookOpen, Users, Award, Target } from "lucide-vue-next";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const user = useState("user", () => ({
  id: "",
  role: "",
  branch: "",
}));

const isSubmitting = ref(false);

const cards = [
  {
    icon: BookOpen,
    title: "knowledge",
    description: "knowledgeDesc",
  },
  {
    icon: Users,
    title: "community",
    description: "communityDesc",
  },
  {
    icon: Award,
    title: "excellence",
    description: "excellenceDesc",
  },
  {
    icon: Target,
    title: "growth",
    description: "growthDesc",
  },
];

function handleLogin(data) {
  isSubmitting.value = true;
  user.value.id = data.id;
  navigateTo("/choose-role");
}
</script>

<template>
  <div
    class="flex md:flex-row items-center max-h-screen w-full transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
    <!-- Left -->
    <div
      class="left w-full h-screen flex items-center justify-center px-10 md:px-20 py-20 transition-colors duration-300 bg-white dark:bg-gray-900">
      <FormInput v-if="!user?.id && !isSubmitting" @loggedIn="handleLogin" />
      <!-- <ShowData v-else-if="user?.id && !isSubmitting" :user="user" /> -->
      <!-- <div v-else class="loader">Loading...</div> -->
    </div>

    <!-- Right ثابت -->
    <div
      class="right relative w-full min-h-screen hidden lg:flex flex-col items-center justify-center text-white text-2xl font-bold transition-colors duration-300 bg-[#2e6aecd8] dark:bg-gradient-to-br dark:from-blue-800 dark:to-blue-600">
      <div
        class="absolute inset-0 opacity-20"
        style="
          background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fillRule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fillOpacity=\'0.3\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'1\'/%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'1\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');
        "></div>

      <div
        class="relative z-10 flex flex-col items-center justify-center text-center px-8">
        <!-- العنوان -->
        <div class="flex flex-col items-center">
          <div
            class="p-5 rounded-2xl bg-[#5b8af0e7] dark:bg-blue-700 mb-4 inline-block border border-white/30">
            <School class="w-10 h-10 text-white" />
          </div>
          <h2 class="mb-4 font-bold text-4xl text-white">{{ t("school") }}</h2>
          <h6 class="font-medium text-xl text-gray-100 dark:text-gray-200">
            {{ t("education") }}
          </h6>
          <p
            class="mt-2 text-center px-6 xl:px-24 text-lg font-medium text-gray-200 dark:text-gray-300 max-w-[46rem]">
            {{ t("Empowering") }}
          </p>
        </div>

        <!-- البطاقات -->
        <div
          class="cards grid grid-cols-2 gap-6 p-8 mt-6 max-w-[700px] w-full justify-center">
          <div
            v-for="card in cards"
            :key="card.title"
            class="card border border-white/30 bg-[#5b8af0c4] dark:bg-blue-700/70 rounded-xl px-7 py-7 hover:bg-[#5F92F1] dark:hover:bg-blue-600 transition-all duration-300 flex flex-col items-center">
            <component :is="card.icon" class="w-9 h-9 mb-3 text-white" />
            <h2 class="font-bold text-xl text-white">
              {{ t(card.title) }}
            </h2>
            <p
              class="mt-2 text-center max-w-[240px] text-gray-200 text-sm font-medium">
              {{ t(card.description) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
