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
  // احفظ باقي بيانات المستخدم...
  navigateTo("/choose-role");
}
</script>

<template>
  <div class="flex md:flex-row items-center max-h-screen bg-white w-full">
    <!-- left -->
    <div
      class="left bg-white w-full h-screen flex items-center justify-center px-10 md:px-20 py-20">
      <FormInput  v-if="!user?.id && !isSubmitting"  @loggedIn="handleLogin"/>
      <ShowData v-else-if="user?.id && !isSubmitting" :user="user" />
      <div v-else class="loader">Loading...</div>
    </div>

    <!-- right ثابت -->
    <div
      class="right bg-[#2e6aecd8] static w-full min-h-screen hidden lg:flex flex-col items-center justify-center text-white text-2xl font-bold"
      style="
        background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fillRule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fillOpacity=\'0.3\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'1\'/%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'1\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');
      ">
      <div
        class="bg-[#2e6aecd8] relative top-0 left-0 w-full min-h-screen flex flex-col items-center justify-center">
        <div class="top-title flex flex-col items-center">
          <div class="p-5 rounded-2xl bg-[#5b8af0e7] mb-4 inline-block border">
            <School class="w-10 h-10" />
          </div>
          <h2 class="mb-4 font-bold text-4xl">{{ t("school") }}</h2>
          <h6 class="font-medium text-xl text-gray-200">
            {{ t("education") }}
          </h6>
          <p
            class="mt-2 text-center px-12 xl:px-24 text-lg font-medium text-gray-300 max-w-[46rem]">
            {{ t("Empowering") }}
          </p>
        </div>

        <div class="cards grid grid-cols-2 gap-6 p-8 mt-5">
          <div
            v-for="card in cards"
            :key="card.title"
            class="card border border-[#c1d3f947] bg-[#5b8af0c4] rounded-xl px-7 py-7 hover:bg-[#5F92F1] transition-all duration-300">
            <div class="top-title flex flex-col items-center">
              <component :is="card.icon" class="w-9 h-9 mb-3" />
              <h2 class="font-bold text-xl">{{ t(card.title) }}</h2>
              <p
                class="mt-2 text-center max-w-[240px] text-slate-300 text-sm font-medium">
                {{ t(card.description) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
