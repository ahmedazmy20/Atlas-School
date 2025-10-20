<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import {
  ArrowLeft,
  GraduationCap,
  BookOpen,
  School,
  BadgeCheck,
  ArrowRight,
} from "lucide-vue-next";

const { t, locale } = useI18n();
const router = useRouter();
const user = useState("user");

const roles = computed(() => [
  {
    icon: GraduationCap,
    key: "admin",
    role: t("role.admin"),
    numBranchs: t("role.threebranch"),
  },
  {
    icon: GraduationCap,
    key: "teacher",
    role: t("role.teacher"),
    numBranchs: t("role.towbranch"),
  },
  {
    icon: GraduationCap,
    key: "student",
    role: t("role.student"),
    numBranchs: t("role.onebranch"),
  },
]);

const branches = [
  { icon: School, key: "main", name: "Main Campus" },
  { icon: School, key: "north", name: "North Branch" },
  { icon: School, key: "south", name: "South Branch" },
];

const selectedRole = ref("");
const selectedBranch = ref("");

const filteredBranches = computed(() => {
  if (selectedRole.value === "admin") return branches;
  else if (selectedRole.value === "teacher")
    return branches.filter(
      (b) => b.name === "Main Campus" || b.name === "North Branch"
    );
  else if (selectedRole.value === "student")
    return branches.filter((b) => b.name === "South Branch");
  return [];
});

const continueDashboard = () => {
  if (selectedRole.value && selectedBranch.value) {
    user.value.role = selectedRole.value;
    user.value.branch = selectedBranch.value;
    router.push("/dash-board");
  }
};

const BackToLogin = () => {
  user.value.id = "";
  user.value.role = "";
  user.value.branch = "";
  router.push("/");
};
</script>

<template>
  <div
    class="bg-[#fcf8f4] dark:bg-gray-900 min-h-screen flex flex-col justify-center transition-colors duration-300">
    <div
      :class="selectedRole ? 'mt-0' : '2xl:mt-32'"
      class="flex flex-col px-5 items-center pt-15 justify-center gap-2 md:gap-6 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div>
        <p>
          {{ t("role.welcome") }},
          {{ locale === "ar" ? user?.arabicField : user?.englishField }}
        </p>
      </div>

      <div
        class="w-16 h-16 hidden md:w-20 md:min-h-20 bg-blue-100 dark:bg-gray-700 rounded-full md:flex items-center justify-center">
        <BookOpen class="text-blue-500 dark:text-blue-400 w-10 h-10" />
      </div>

      <h1 class="text-2xl md:text-4xl font-bold">{{ t("role.choose") }}</h1>

      <p
        class="text-gray-500 dark:text-gray-300 text-center text-sm md:text-xl font-medium max-w-3xl px-5 md:px-0">
        {{ t("role.select") }}
      </p>

      <!-- Roles -->
      <div
        :class="selectedRole ? 'hidden md:flex ' : 'flex'"
        class="flex gap-5 p-4 justify-start md:justify-center overflow-x-auto md:overflow-visible w-full">
        <div
          v-for="role in roles"
          :key="role.role"
          class="flex flex-col justify-center items-center bg-[#fcf8f8] dark:bg-gray-800 border-2 shadow-md rounded-lg cursor-pointer transition-all duration-500 flex-grow min-w-[10rem] max-w-[17rem] md:w-[12rem] h-[10rem] md:h-[15rem] md:px-11 md:py-1"
          :class="
            selectedRole === role.key
              ? 'border-blue-500 '
              : 'border-gray-200 dark:border-gray-700'
          "
          @click="
            selectedRole = role.key;
            selectedBranch = '';
          ">
          <div
            class="w-10 h-10 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-[#DBEAFE] dark:bg-gray-700">
            <component
              :is="role.icon"
              class="text-blue-600 dark:text-blue-400 w-8 h-8 md:w-12 md:h-12" />
          </div>

          <h2
            class="mt-3 mb-2 font-semibold md:font-bold md:text-xl text-center">
            {{ role.role }}
          </h2>

          <p
            class="text-[#626e7e] dark:text-gray-400 text-center text-sm md:text-base md:mb-5">
            {{ role.numBranchs }}
          </p>

          <div class="h-6 w-6 flex items-center justify-center">
            <BadgeCheck
              v-show="selectedRole === role.role"
              class="w-6 h-6 text-blue-600 dark:text-blue-400 transition-opacity duration-300" />
          </div>
        </div>
      </div>

      <!-- change role btn for mobile -->
      <transition name="fade">
        <button
          v-if="selectedRole"
          class="text-white block md:hidden bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl md:font-bold md:text-xl duration-200 transition-all mb-3">
          {{ t("role.changerole") }}
        </button>
      </transition>

      <!-- Branches -->
      <transition name="fade">
        <div
          v-if="selectedRole"
          class="bg-white dark:bg-gray-800 w-full max-w-4xl rounded-2xl py-5 mb-3 transition-colors duration-300">
          <h2
            class="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
            {{ t("role.selectbranch") }}
          </h2>

          <div
            class="flex flex-col md:flex-row gap-4 px-5 rounded-2xl items-center w-full md:max-w-[58rem]">
            <div
              :class="
                filteredBranches.length < 2
                  ? 'min-h-[5rem]'
                  : 'min-h-[8rem] md:min-h-[5rem]'
              "
              class="flex flex-col md:flex-row md:flex-wrap gap-4 lg:gap-6 mt-4 w-full max-h-[5rem] overflow-y-auto md:max-h-none md:overflow-visible px-2 scroll-smooth">
              <div
                v-for="branch in filteredBranches"
                :key="branch.name"
                class="flex md:flex-grow lg:flex-grow-0 justify-center items-center shadow-md rounded-lg cursor-pointer md:max-h-[5rem] px-2 py-2 lg:px-6 lg:py-4 gap-5 border-2 transition duration-300 mt-2 dark:bg-gray-800 dark:text-gray-100"
                :class="
                  selectedBranch === branch.name
                    ? 'border-blue-500'
                    : 'border-gray-200 dark:border-gray-700'
                "
                @click="selectedBranch = branch.name">
                <div
                  class="w-10 h-10 lg:w-16 lg:h-16 flex items-center justify-center text-2xl rounded-2xl bg-[#F1F5F9] dark:bg-gray-700">
                  <component
                    :is="branch.icon"
                    class="w-8 h-8 text-[#6c5245] dark:text-gray-300" />
                </div>
                <div class="flex flex-col">
                  <h2 class="font-bold">{{ t(`role.branch${branch.key}`) }}</h2>
                  <p class="text-gray-500 dark:text-gray-400">
                    {{ t("role.branchlocation") }}
                  </p>
                </div>
                <strong v-if="selectedBranch === branch.name">
                  <BadgeCheck
                    class="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </strong>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- buttons -->
      <div class="flex gap-2 md:gap-5 mt-3 mb-10 text-white">
        <button
          class="bg-blue-500 hover:bg-blue-600 md:font-semibold px-4 md:px-11 py-2 rounded-xl transition-colors duration-200 flex items-center"
          @click="BackToLogin">
          <component
            :is="locale === 'en' ? ArrowLeft : ArrowRight"
            class="text-[0.2rem] me-2" />
          <span class="hidden md:inline ms-1">{{ t("role.logout") }}</span>
        </button>

        <button
          :disabled="!selectedBranch"
          class="text-white px-4 md:px-11 py-2 rounded-xl md:font-bold md:text-xl duration-200 transition-all"
          :class="[
            !selectedBranch
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600',
          ]"
          @click="continueDashboard">
          {{ t("role.Continue") }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
