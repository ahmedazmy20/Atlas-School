<script setup lang="ts">
import { useRouter } from "vue-router";
import { useLanguage } from "~/composables/useLanguage";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { locale } = useLanguage();
const router = useRouter();

const schema = computed(() =>
  toTypedSchema(
    z.object({
      id: z
        .string()
        .nonempty(t("validation.idRequired"))
        .regex(/^[0-9]+$/, t("validation.idNumberOnly"))
        .min(3, t("validation.idMin"))
        .max(6, t("validation.idMax")),
      password: z
        .string()
        .nonempty(t("validation.passwordRequired"))
        .min(4, t("validation.passwordMin"))
        .max(8, t("validation.passwordMax")),
      arabicField: z
        .string()
        .nonempty(t("validation.arabicRequired"))
        .regex(/^[\u0600-\u06FF\s]+$/, t("validation.arabicOnly")),
      englishField: z
        .string()
        .nonempty(t("validation.englishRequired"))
        .regex(/^[A-Za-z\s]+$/, t("validation.englishOnly")),
    })
  )
);

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    id: "",
    password: "",
    arabicField: "",
    englishField: "",
  },
});

const isLoading = ref(false);

// using cookies to save user data
const user = useCookie("user", {
  default: () => ({
    id: "",
    role: "",
    branch: "",
    arabicField: "",
    englishField: "",
  }),
});

const login = handleSubmit(async (values) => {
  isLoading.value = true;

  setTimeout(() => {
    user.value = {
      id: values.id,
      arabicField: values.arabicField,
      englishField: values.englishField,
      role: "",
      branch: "",
    };

    router.push("/choose-role");
    isLoading.value = false;
  }, 1500);
});
</script>

<template>
  <div
    class="flex flex-col justify-center items-center px-4 transition-colors duration-300"
    :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <form @submit.prevent="login">
      <div
        class="flex flex-col justify-center items-center gap-3 md:min-w-md rounded-2xl px-8 py-4 md:py-14 mx-auto shadow-2xl dark:shadow-[#1a3a6a] bg-white dark:bg-[#27364c] transition-colors duration-300">
        <!-- Header -->
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

        <!-- Submit -->
        <UButton
          class="mt-4 w-full flex items-center justify-center py-3 bg-[#2B67EC] hover:bg-[#2B67EC]/90 active:bg-[#2B67EC]/80 dark:bg-blue-800 dark:text-white/70 dark:hover:bg-blue-700 transition-colors duration-300"
          type="submit">
          <span v-if="!isLoading">{{ t("signIn") }}</span>
          <span v-else>{{ t("Signing") }}</span>
        </UButton>
      </div>
    </form>
  </div>
</template>
