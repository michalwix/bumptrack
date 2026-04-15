import { useTranslation } from 'react-i18next';
import { I18nManager } from 'react-native';

export function useI18n() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'he';

  const changeLanguage = async (lang: 'he' | 'en') => {
    await i18n.changeLanguage(lang);
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(lang === 'he');
  };

  return { t, i18n, isRTL, changeLanguage, language: i18n.language as 'he' | 'en' };
}
