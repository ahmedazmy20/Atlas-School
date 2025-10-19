<script setup lang="ts">
import { useRouter } from "vue-router";
import { useLanguage } from "~/composables/useLanguage";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { locale } = useLanguage();

const schema = toTypedSchema(
  z.object({
    id: z
      .string()
      .nonempty("Id is required")
      .min(3, "Id must be at least 3 characters")
      .max(6, "Id must be less than 7 characters"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(4, "Password must be at least 4 characters")
      .max(8, "Password must be less than 9 characters"),
    arabicField: z
      .string()
      .nonempty("هذا الحقل مطلوب")
      .regex(/^[\u0600-\u06FF\s]+$/, "الرجاء إدخال حروف عربية فقط"),
    englishField: z
      .string()
      .nonempty("This field is required")
      .regex(/^[A-Za-z\s]+$/, "Please enter English letters only"),
  })
);

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    id: "",
    password: "",
  },
});

const isLoading = ref(false);
const router = useRouter();

const user = useState("user", () => ({
  id: "",
  role: "",
  branch: "",
  arabicField: "",
  englishField: "",
}));

const login = handleSubmit(async (values) => {
  isLoading.value = true;
  setTimeout(() => {
    user.value.id = values.id;
    user.value.arabicField = values.arabicField;
    user.value.englishField = values.englishField;
    user.value.role = "";
    user.value.branch = "";
    router.push("/choose-role");
    isLoading.value = false;
  }, 1500);
});
</script>

<template>
  <div
    class="flex flex-col justify-center items-center px-4 transition-colors duration-300 dark:bg-gray-800"
    :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <form @submit.prevent="login">
      <div
        class="flex flex-col justify-center items-center gap-3 md:min-w-md rounded-2xl px-8 py-4 md:py-14 mx-auto shadow-2xl bg-white dark:bg-gray-700 transition-colors duration-300">
        <!-- العنوان -->
        <h1
          class="text-xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
          {{ t("Welcome") }}
        </h1>
        <p
          class="md:font-semibold text-gray-500 dark:text-gray-400 text-center">
          {{ t("access") }}
        </p>

        <div class="input mt-10 w-full flex flex-col gap-4">
          <!-- ID -->
          <div class="flex flex-col gap-1">
            <label
              for="id"
              class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ t("staff") }}
            </label>
            <Field v-slot="{ field, errorMessage, meta }" name="id">
              <UInput
                v-bind="field"
                type="text"
                class="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                :placeholder="t('idPlaceholder')" />
              <span
                v-if="meta.touched || errorMessage"
                class="text-red-500 text-sm">
                {{ errorMessage }}
              </span>
            </Field>
          </div>

          <!-- Password -->
          <div class="flex flex-col gap-1">
            <label
              for="password"
              class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ t("password") }}
            </label>
            <Field v-slot="{ field, errorMessage, meta }" name="password">
              <UInput
                v-bind="field"
                type="password"
                class="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                :placeholder="t('passwordPlaceholder')" />
              <span
                v-if="meta.touched || errorMessage"
                class="text-red-500 text-sm">
                {{ errorMessage }}
              </span>
            </Field>
          </div>

          <!-- Arabic Name -->
          <div class="flex flex-col gap-1">
            <label
              for="arabicField"
              class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ t("name-ar") }}
            </label>
            <Field v-slot="{ field, errorMessage, meta }" name="arabicField">
              <UInput
                v-bind="field"
                type="text"
                class="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                :placeholder="t('nameArPlaceholder')" />
              <span
                v-if="meta.touched || errorMessage"
                class="text-red-500 text-sm">
                {{ errorMessage }}
              </span>
            </Field>
          </div>

          <!-- English Name -->
          <div class="flex flex-col gap-1">
            <label
              for="englishField"
              class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ t("name-en") }}
            </label>
            <Field v-slot="{ field, errorMessage, meta }" name="englishField">
              <UInput
                v-bind="field"
                type="text"
                class="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                :placeholder="t('nameEnPlaceholder')" />
              <span
                v-if="meta.touched || errorMessage"
                class="text-red-500 text-sm">
                {{ errorMessage }}
              </span>
            </Field>
          </div>
        </div>

        <!-- زر تسجيل الدخول -->
        <UButton
          class="mt-4 w-full flex items-center justify-center py-3 bg-[#2B67EC] hover:bg-[#2B67EC]/90 active:bg-[#2B67EC]/80 dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors duration-300"
          type="submit">
          <span v-if="!isLoading">{{ t("signIn") }}</span>
          <span v-else>{{ t("Signing") }}</span>
        </UButton>
      </div>
    </form>
  </div>
</template>
