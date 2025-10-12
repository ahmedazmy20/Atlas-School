<template>
  <div class="p-6 bg-[#F6FAFF] min-h-screen px-28">
    <form
      class="bg-white shadow-md md:w-1/2 mx-auto rounded-2xl p-6 space-y-6"
      @submit.prevent="onSubmit">
      <!-- name in arabic and english -->
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="block text-gray-700 font-medium mb-2 text-end">
            {{ $t("addProductForm.fields.nameAr") }}
          </label>
          <Field v-slot="{ field, errorMessage, meta }" name="name_ar">
            <input
              v-bind="field"
              type="text"
              :placeholder="$t('addProductForm.placeholders.nameAr')"
              class="w-full text-end border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <p
              v-if="meta.touched && errorMessage"
              class="text-red-500 text-sm text-end">
              {{ errorMessage }}
            </p>
          </Field>
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-2 text-end">
            {{ $t("addProductForm.fields.nameEn") }}
          </label>
          <Field v-slot="{ field, errorMessage, meta }" name="name_en">
            <input
              v-bind="field"
              type="text"
              :placeholder="$t('addProductForm.placeholders.nameEn')"
              class="w-full text-end border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <p
              v-if="meta.touched && errorMessage"
              class="text-red-500 text-sm text-end">
              {{ errorMessage }}
            </p>
          </Field>
        </div>
      </div>

      <!--  sku and category -->
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="block text-gray-700 font-medium mb-2 text-end">
            {{ $t("addProductForm.fields.sku") }}
          </label>
          <Field v-slot="{ field, errorMessage, meta }" name="sku">
            <input
              v-bind="field"
              type="text"
              placeholder="PROD-001"
              class="w-full text-end border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <p
              v-if="meta.touched && errorMessage"
              class="text-red-500 text-sm text-end">
              {{ errorMessage }}
            </p>
          </Field>
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-2 text-end">
            {{ $t("addProductForm.fields.category") }}
          </label>
          <Field v-slot="{ field, errorMessage, meta }" name="category">
            <select
              v-bind="field"
              class="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option disabled value="">
                {{ $t("addProductForm.placeholders.category") }}
              </option>
              <option value="electronics">
                {{ $t("addProductForm.categories.electronics") }}
              </option>
              <option value="clothes">
                {{ $t("addProductForm.categories.clothes") }}
              </option>
              <option value="food">
                {{ $t("addProductForm.categories.food") }}
              </option>
            </select>
            <p
              v-if="meta.touched && errorMessage"
              class="text-red-500 text-sm text-end">
              {{ errorMessage }}
            </p>
          </Field>
        </div>
      </div>

      <!--  price and quantity -->
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <label class="block text-gray-700 font-medium mb-2 text-end">
            {{ $t("addProductForm.fields.price") }}
          </label>
          <Field v-slot="{ field, errorMessage, meta }" name="price">
            <input
              v-bind="field"
              type="number"
              min="0"
              class="w-full text-end border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <p
              v-if="meta.touched && errorMessage"
              class="text-red-500 text-sm text-end">
              {{ errorMessage }}
            </p>
          </Field>
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-2 text-end">
            {{ $t("addProductForm.fields.quantity") }}
          </label>
          <Field v-slot="{ field, errorMessage, meta }" name="quantity">
            <input
              v-bind="field"
              type="number"
              min="0"
              class="w-full text-end border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <p
              v-if="meta.touched && errorMessage"
              class="text-red-500 text-sm text-end">
              {{ errorMessage }}
            </p>
          </Field>
        </div>
      </div>

      <!-- desc -->
      <div>
        <label class="block text-gray-700 font-medium mb-2 text-end">
          {{ $t("addProductForm.fields.description") }}
        </label>
        <Field v-slot="{ field, errorMessage, meta }" name="description">
          <textarea
            v-bind="field"
            rows="3"
            :placeholder="$t('addProductForm.placeholders.description')"
            class="w-full border text-end border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <p
            v-if="meta.touched && errorMessage"
            class="text-red-500 text-sm text-end">
            {{ errorMessage }}
          </p>
        </Field>
      </div>

      <!-- status -->
      <div>
        <label class="block text-gray-700 font-medium mb-2 text-end">
          {{ $t("addProductForm.fields.status") }}
        </label>
        <Field v-slot="{ field, errorMessage, meta }" name="status">
          <select
            v-bind="field"
            class="border w-fit border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option disabled value="">
              {{ $t("addProductForm.fields.status") }}
            </option>
            <option value="Active">
              {{ $t("addProductForm.statuses.active") }}
            </option>
            <option value="Inactive">
              {{ $t("addProductForm.statuses.inactive") }}
            </option>
          </select>
          <p
            v-if="meta.touched && errorMessage"
            class="text-red-500 text-sm text-end">
            {{ errorMessage }}
          </p>
        </Field>
      </div>

      <!--add product btn -->
      <div class="flex justify-end">
        <button
          type="submit"
          class="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
          {{ $t("addProductForm.buttons.submit") }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useProductsStore } from "@/stores/products";
import { useForm, Field } from "vee-validate";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";

definePageMeta({
  layout: "add-product",
});

const router = useRouter();
const productsStore = useProductsStore();

//  Zod Validation Schema
const schema = toTypedSchema(
  z.object({
    name_ar: z
      .string()
      .nonempty("الاسم بالعربية مطلوب")
      .min(3, "يجب أن يكون الاسم 3 أحرف على الأقل")
      .regex(/^[\u0600-\u06FF\s]+$/, "يجب إدخال حروف عربية فقط"),
    name_en: z
      .string()
      .nonempty("Product name in English is required")
      .regex(/^[A-Za-z\s]+$/, "Only English letters allowed"),
    sku: z.string().nonempty("رمز المنتج مطلوب"),
    category: z.string().nonempty("يجب اختيار الفئة"),
    price: z
      .number({ invalid_type_error: "السعر يجب أن يكون رقمًا" })
      .min(1, "يجب أن يكون السعر أكبر من صفر"),
    quantity: z
      .number({ invalid_type_error: "الكمية يجب أن تكون رقمًا" })
      .min(1, "يجب أن تكون الكمية أكبر من صفر"),
    description: z.string().nonempty("الوصف مطلوب"),
    status: z.string().nonempty("الحالة مطلوبة"),
  })
);

//  VeeValidate Form
const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name_ar: "",
    name_en: "",
    sku: "",
    category: "",
    price: 0,
    quantity: 0,
    description: "",
    status: "",
  },
});

// ✅ Submit Function
const onSubmit = handleSubmit((values) => {
  productsStore.addProduct({ ...values });
  resetForm();
  router.push("/products-management");
});
</script>
