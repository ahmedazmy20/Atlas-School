import { useI18n } from "vue-i18n";
import { onBeforeMount, watch } from "vue";

export const useLanguage = () => {
  const { locale, setLocale } = useI18n();

  // تغيير اللغة
  const switchLanguage = (lang: "en" | "ar") => {
    setLocale(lang);
    locale.value = lang;
    document.cookie = `i18n_redirected=${lang};path=/`;
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  };

  // عند تحميل الصفحة
  onBeforeMount(() => {
    const match = document.cookie.match(/i18n_redirected=([a-zA-Z-]+)/);
    const savedLang = match?.[1] === "ar" ? "ar" : "en";

    setLocale(savedLang);
    locale.value = savedLang;
    document.documentElement.setAttribute(
      "dir",
      savedLang === "ar" ? "rtl" : "ltr"
    );
  });

  // متابعة أي تغيير في اللغة
  watch(locale, (newLang) => {
    document.documentElement.setAttribute(
      "dir",
      newLang === "ar" ? "rtl" : "ltr"
    );
  });

  return { locale, switchLanguage };
};
