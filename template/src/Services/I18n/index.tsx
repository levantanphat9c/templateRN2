import { default as i18n, default as i18next } from 'i18next';

import { DEVICE_LANGUAGE, LANG, storageKey } from '@/Constants';
import { getKey, setKey } from '@/Services';

import enJson from './locales/en.json';
import viJson from './locales/vi.json';

export type I18nKey = keyof typeof enJson;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const t = (key?: string, params?: any): string => {
  // empty key
  if (!key) {
    return '';
  }
  return i18n.t(key, params) as string;
};

const setLocale = (locale: LANG) => {
  i18next.changeLanguage(locale);
  setLocalLang(locale as LANG);
};

const getLocale = () => {
  return i18n.language as LANG;
};

const setLocalLang = async (value: LANG) => {
  try {
    await setKey(storageKey.LOCAL_LANG, value);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('set localLang', error);
  }
};

const initLocalLang = async () => {
  try {
    let lang: LANG | null = await getKey(storageKey.LOCAL_LANG);

    if (lang == null) {
      lang = DEVICE_LANGUAGE;
    }

    setLocale(lang);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('initLocalLang', error);
  }
};

const getCurrentLanguage = () => {
  return t('LOCALE.' + getLocale().toUpperCase());
};

export { enJson, getCurrentLanguage, getLocale, initLocalLang, setLocale, setLocalLang, t, viJson };
