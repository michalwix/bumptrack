import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  Alert,
  I18nManager,
} from 'react-native';
import { useRouter } from 'expo-router';
import { usePregnancyStore } from '../../src/store/pregnancyStore';
import { useI18n } from '../../src/hooks/useI18n';
import {
  calculateDueDate,
  getLMPFromDueDate,
  getLMPFromIVF,
  formatDate,
} from '../../src/utils/dateCalculations';
import {
  requestNotificationPermissions,
  scheduleWeeklyNotifications,
} from '../../src/utils/notifications';

type Step = 'language' | 'dateMethod' | 'dateInput' | 'profile';
type DateMethod = 'lmp' | 'dueDate' | 'ivf';

export default function OnboardingScreen() {
  const router = useRouter();
  const { t, changeLanguage, language, isRTL } = useI18n();
  const setProfile = usePregnancyStore((s) => s.setProfile);

  const [step, setStep] = useState<Step>('language');
  const [dateMethod, setDateMethod] = useState<DateMethod>('lmp');

  // Date input state
  const [lmpInput, setLmpInput] = useState('');
  const [dueDateInput, setDueDateInput] = useState('');
  const [ivfInput, setIvfInput] = useState('');
  const [embryoAge, setEmbryoAge] = useState('5');

  // Profile state
  const [name, setName] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [preWeight, setPreWeight] = useState('');
  const [height, setHeight] = useState('');
  const [numberOfFetuses, setNumberOfFetuses] = useState<1 | 2 | 3>(1);

  const textAlign = isRTL ? 'right' : 'left';

  // Auto-format: inserts slashes as user types digits
  function formatDateInput(raw: string): string {
    const digits = raw.replace(/\D/g, '').slice(0, 8);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  }

  function parseDate(input: string): Date | null {
    // Accept DD/MM/YYYY or DD-MM-YYYY
    const cleaned = input.replace(/-/g, '/');
    const parts = cleaned.split('/');
    if (parts.length !== 3) return null;
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
    // Reject obviously wrong years (must be 4-digit, between 2000–2100)
    if (year < 2000 || year > 2100) return null;
    const date = new Date(year, month, day);
    if (isNaN(date.getTime())) return null;
    return date;
  }

  function handleLanguageSelect(lang: 'he' | 'en') {
    changeLanguage(lang);
    setProfile({ language: lang });
    setStep('dateMethod');
  }

  function handleDateMethodContinue() {
    setStep('dateInput');
  }

  function handleDateInputContinue() {
    let lmp: Date | null = null;
    let due: Date | null = null;

    if (dateMethod === 'lmp') {
      lmp = parseDate(lmpInput);
      if (!lmp) {
        Alert.alert(t('onboarding.enterLMP'), 'Format: DD/MM/YYYY');
        return;
      }
      due = calculateDueDate(lmp);
    } else if (dateMethod === 'dueDate') {
      due = parseDate(dueDateInput);
      if (!due) {
        Alert.alert(t('onboarding.enterDueDate'), 'Format: DD/MM/YYYY');
        return;
      }
      lmp = getLMPFromDueDate(due);
    } else if (dateMethod === 'ivf') {
      const transfer = parseDate(ivfInput);
      if (!transfer) {
        Alert.alert(t('onboarding.enterIVF'), 'Format: DD/MM/YYYY');
        return;
      }
      const age = parseInt(embryoAge, 10) || 5;
      lmp = getLMPFromIVF(transfer, age);
      due = calculateDueDate(lmp);
    }

    if (lmp && due) {
      setProfile({
        lmpDate: lmp.toISOString(),
        dueDate: due.toISOString(),
      });
    }

    setStep('profile');
  }

  async function handleFinish() {
    const weightNum = preWeight ? parseFloat(preWeight) : null;
    const heightNum = height ? parseFloat(height) : null;

    await setProfile({
      name,
      partnerName,
      prePregnancyWeightKg: weightNum,
      heightCm: heightNum,
      numberOfFetuses,
      hasCompletedOnboarding: true,
    });

    // Request notification permissions
    const granted = await requestNotificationPermissions();
    if (granted) {
      const store = usePregnancyStore.getState();
      if (store.profile.lmpDate) {
        await scheduleWeeklyNotifications(new Date(store.profile.lmpDate));
      }
    }

    router.replace('/(tabs)');
  }

  // Live due date preview as user types
  const previewDueDate = useMemo<Date | null>(() => {
    try {
      if (dateMethod === 'lmp') {
        const d = parseDate(lmpInput);
        return d ? calculateDueDate(d) : null;
      }
      if (dateMethod === 'dueDate') {
        return parseDate(dueDateInput);
      }
      if (dateMethod === 'ivf') {
        const d = parseDate(ivfInput);
        if (!d) return null;
        const age = parseInt(embryoAge, 10) || 5;
        return calculateDueDate(getLMPFromIVF(d, age));
      }
    } catch {
      return null;
    }
    return null;
  }, [lmpInput, dueDateInput, ivfInput, embryoAge, dateMethod]);

  const previewDueDateStr = previewDueDate
    ? previewDueDate.toLocaleDateString(language === 'he' ? 'he-IL' : 'en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : null;

  // ─── Language Step ────────────────────────────────────────────────────────
  if (step === 'language') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={[styles.appName, { textAlign: 'center' }]}>BumpTrack</Text>
          <Text style={[styles.emoji, { textAlign: 'center' }]}>🤰</Text>
          <Text style={[styles.title, { textAlign: 'center' }]}>
            {t('onboarding.selectLanguage')}
          </Text>

          <TouchableOpacity
            style={styles.langButton}
            onPress={() => handleLanguageSelect('he')}
            accessibilityLabel="Select Hebrew language"
          >
            <Text style={styles.langButtonText}>עברית</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.langButton, styles.langButtonSecondary]}
            onPress={() => handleLanguageSelect('en')}
            accessibilityLabel="Select English language"
          >
            <Text style={[styles.langButtonText, styles.langButtonTextSecondary]}>
              English
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ─── Date Method Step ─────────────────────────────────────────────────────
  if (step === 'dateMethod') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={[styles.appName, { textAlign: 'center' }]}>BumpTrack</Text>
          <Text style={[styles.emoji, { textAlign: 'center' }]}>🤰</Text>
          <Text style={[styles.title, { textAlign: 'center' }]}>
            {t('onboarding.welcome')}
          </Text>
          <Text style={[styles.subtitle, { textAlign: 'center' }]}>
            {t('onboarding.subtitle')}
          </Text>

          <View style={styles.methodContainer}>
            <TouchableOpacity
              style={[styles.methodButton, dateMethod === 'lmp' && styles.methodButtonActive]}
              onPress={() => setDateMethod('lmp')}
              accessibilityLabel="Calculate from last menstrual period"
            >
              <Text style={[styles.methodButtonText, dateMethod === 'lmp' && styles.methodButtonTextActive]}>
                {t('onboarding.calculateLMP')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.methodButton, dateMethod === 'dueDate' && styles.methodButtonActive]}
              onPress={() => setDateMethod('dueDate')}
              accessibilityLabel="I know my due date"
            >
              <Text style={[styles.methodButtonText, dateMethod === 'dueDate' && styles.methodButtonTextActive]}>
                {t('onboarding.knownDueDate')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.methodButton, dateMethod === 'ivf' && styles.methodButtonActive]}
              onPress={() => setDateMethod('ivf')}
              accessibilityLabel="IVF transfer date"
            >
              <Text style={[styles.methodButtonText, dateMethod === 'ivf' && styles.methodButtonTextActive]}>
                {t('onboarding.ivfTransfer')}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleDateMethodContinue}
            accessibilityLabel="Continue to date input"
          >
            <Text style={styles.primaryButtonText}>{t('onboarding.continue')}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ─── Date Input Step ──────────────────────────────────────────────────────
  if (step === 'dateInput') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setStep('dateMethod')}
            accessibilityLabel="Go back"
          >
            <Text style={styles.backButtonText}>{isRTL ? '›' : '‹'} {t('onboarding.back')}</Text>
          </TouchableOpacity>

          {dateMethod === 'lmp' && (
            <>
              <Text style={[styles.title, { textAlign }]}>{t('onboarding.lmpTitle')}</Text>
              <Text style={[styles.subtitle, { textAlign }]}>{t('onboarding.lmpSubtitle')}</Text>
              <TextInput
                style={[styles.dateInput, { textAlign: 'center' }]}
                placeholder="DD / MM / YYYY"
                placeholderTextColor="#B8A0A0"
                value={lmpInput}
                onChangeText={(v) => setLmpInput(formatDateInput(v))}
                keyboardType="number-pad"
                maxLength={10}
                accessibilityLabel="Last menstrual period date"
              />
            </>
          )}

          {dateMethod === 'dueDate' && (
            <>
              <Text style={[styles.title, { textAlign }]}>{t('onboarding.dueDateTitle')}</Text>
              <TextInput
                style={[styles.dateInput, { textAlign: 'center' }]}
                placeholder="DD / MM / YYYY"
                placeholderTextColor="#B8A0A0"
                value={dueDateInput}
                onChangeText={(v) => setDueDateInput(formatDateInput(v))}
                keyboardType="number-pad"
                maxLength={10}
                accessibilityLabel="Due date"
              />
            </>
          )}

          {dateMethod === 'ivf' && (
            <>
              <Text style={[styles.title, { textAlign }]}>{t('onboarding.ivfTitle')}</Text>
              <TextInput
                style={[styles.dateInput, { textAlign: 'center' }]}
                placeholder="DD / MM / YYYY"
                placeholderTextColor="#B8A0A0"
                value={ivfInput}
                onChangeText={(v) => setIvfInput(formatDateInput(v))}
                keyboardType="number-pad"
                maxLength={10}
                accessibilityLabel="IVF transfer date"
              />
              <Text style={[styles.label, { textAlign }]}>{t('onboarding.embryoAge')}</Text>
              <TextInput
                style={[styles.input, { textAlign: 'center' }]}
                placeholder={language === 'he' ? '5 (בלסטוציסט)' : '5 (blastocyst)'}
                placeholderTextColor="#B8A0A0"
                value={embryoAge}
                onChangeText={setEmbryoAge}
                keyboardType="number-pad"
                maxLength={2}
                accessibilityLabel="Embryo age at transfer in days"
              />
              <Text style={[styles.helperText, { textAlign }]}>
                {language === 'he'
                  ? 'ברירת מחדל: 5 ימים (בלסטוציסט). אם עובר יום 3 — הכניסי 3'
                  : 'Default: 5 days (blastocyst). If day-3 embryo — enter 3'}
              </Text>
            </>
          )}

          {/* Live due date preview */}
          {previewDueDateStr ? (
            <View style={styles.dueDatePreview}>
              <Text style={[styles.dueDatePreviewLabel, { textAlign: 'center' }]}>
                {language === 'he' ? '🗓 תאריך לידה משוער' : '🗓 Estimated due date'}
              </Text>
              <Text style={[styles.dueDatePreviewDate, { textAlign: 'center' }]}>
                {previewDueDateStr}
              </Text>
            </View>
          ) : (
            <View style={styles.dueDatePlaceholder}>
              <Text style={[styles.dueDatePlaceholderText, { textAlign: 'center' }]}>
                {language === 'he' ? 'הכניסי תאריך לחישוב תאריך הלידה' : 'Enter date to calculate due date'}
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={[styles.primaryButton, !previewDueDateStr && styles.primaryButtonDisabled]}
            onPress={handleDateInputContinue}
            accessibilityLabel="Continue to profile setup"
          >
            <Text style={styles.primaryButtonText}>{t('onboarding.continue')}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ─── Profile Step ─────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setStep('dateInput')}
          accessibilityLabel="Go back"
        >
          <Text style={styles.backButtonText}>{isRTL ? '›' : '‹'} {t('onboarding.back')}</Text>
        </TouchableOpacity>

        <Text style={[styles.title, { textAlign }]}>{t('onboarding.profileTitle')}</Text>
        <Text style={[styles.subtitle, { textAlign }]}>{t('onboarding.profileSubtitle')}</Text>

        <Text style={[styles.label, { textAlign }]}>{t('onboarding.yourName')}</Text>
        <TextInput
          style={[styles.input, { textAlign }]}
          placeholder={t('onboarding.yourName')}
          placeholderTextColor="#B8A0A0"
          value={name}
          onChangeText={setName}
          accessibilityLabel="Your name"
        />

        <Text style={[styles.label, { textAlign }]}>{t('onboarding.partnerName')}</Text>
        <TextInput
          style={[styles.input, { textAlign }]}
          placeholder={t('onboarding.partnerName')}
          placeholderTextColor="#B8A0A0"
          value={partnerName}
          onChangeText={setPartnerName}
          accessibilityLabel="Partner name"
        />

        <Text style={[styles.label, { textAlign }]}>{t('onboarding.prePregnancyWeight')}</Text>
        <TextInput
          style={[styles.input, { textAlign }]}
          placeholder="65"
          placeholderTextColor="#B8A0A0"
          value={preWeight}
          onChangeText={setPreWeight}
          keyboardType="decimal-pad"
          accessibilityLabel="Pre-pregnancy weight in kilograms"
        />

        <Text style={[styles.label, { textAlign }]}>{t('onboarding.height')}</Text>
        <TextInput
          style={[styles.input, { textAlign }]}
          placeholder="165"
          placeholderTextColor="#B8A0A0"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
          accessibilityLabel="Height in centimeters"
        />

        <Text style={[styles.label, { textAlign }]}>{t('onboarding.multipleTitle')}</Text>
        <View style={styles.fetusRow}>
          {([1, 2, 3] as (1 | 2 | 3)[]).map((n) => {
            const labels: Record<number, string> = {
              1: t('onboarding.singleton'),
              2: t('onboarding.twins'),
              3: t('onboarding.triplets'),
            };
            const emojis: Record<number, string> = { 1: '👶', 2: '👶👶', 3: '👶👶👶' };
            return (
              <TouchableOpacity
                key={n}
                style={[styles.fetusButton, numberOfFetuses === n && styles.fetusButtonActive]}
                onPress={() => setNumberOfFetuses(n)}
                accessibilityLabel={labels[n]}
              >
                <Text style={styles.fetusEmoji}>{emojis[n]}</Text>
                <Text style={[styles.fetusLabel, numberOfFetuses === n && styles.fetusLabelActive]}>
                  {labels[n]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleFinish}
          accessibilityLabel="Get started with BumpTrack"
        >
          <Text style={styles.primaryButtonText}>{t('onboarding.getStarted')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF6F0',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  appName: {
    fontSize: 32,
    fontFamily: 'Nunito_700Bold',
    color: '#E8A598',
    marginBottom: 8,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Nunito_700Bold',
    color: '#3D2C2C',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Nunito_400Regular',
    color: '#7A5C5C',
    marginBottom: 32,
  },
  langButton: {
    width: '100%',
    backgroundColor: '#E8A598',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#E8A598',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  langButtonSecondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E8A598',
    shadowColor: '#000',
    shadowOpacity: 0.08,
  },
  langButtonText: {
    fontSize: 18,
    fontFamily: 'Nunito_700Bold',
    color: '#FFFFFF',
  },
  langButtonTextSecondary: {
    color: '#E8A598',
  },
  methodContainer: {
    marginBottom: 24,
  },
  methodButton: {
    borderWidth: 2,
    borderColor: '#F0DED8',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  methodButtonActive: {
    borderColor: '#E8A598',
    backgroundColor: '#FFF0EC',
  },
  methodButtonText: {
    fontSize: 16,
    fontFamily: 'Nunito_600SemiBold',
    color: '#7A5C5C',
    textAlign: 'center',
  },
  methodButtonTextActive: {
    color: '#E8A598',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Nunito_600SemiBold',
    color: '#7A5C5C',
    marginBottom: 6,
    marginTop: 4,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#F0DED8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    color: '#3D2C2C',
    marginBottom: 16,
  },
  dateInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E8A598',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'ios' ? 20 : 16,
    fontSize: 28,
    fontFamily: 'Nunito_700Bold',
    color: '#3D2C2C',
    marginBottom: 16,
    letterSpacing: 4,
  },
  dueDatePreview: {
    backgroundColor: '#FFF0EC',
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F0DED8',
  },
  dueDatePreviewLabel: {
    fontSize: 13,
    fontFamily: 'Nunito_600SemiBold',
    color: '#7A5C5C',
    marginBottom: 6,
  },
  dueDatePreviewDate: {
    fontSize: 20,
    fontFamily: 'Nunito_700Bold',
    color: '#E8A598',
  },
  dueDatePlaceholder: {
    backgroundColor: '#FAF4F0',
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F0DED8',
    borderStyle: 'dashed',
  },
  dueDatePlaceholderText: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: '#B8A0A0',
  },
  primaryButton: {
    backgroundColor: '#E8A598',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#E8A598',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonDisabled: {
    backgroundColor: '#D4B8B2',
    shadowOpacity: 0,
    elevation: 0,
  },
  primaryButtonText: {
    fontSize: 17,
    fontFamily: 'Nunito_700Bold',
    color: '#FFFFFF',
  },
  backButton: {
    marginBottom: 24,
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: 'Nunito_600SemiBold',
    color: '#E8A598',
  },
  fetusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  fetusButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#F0DED8',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  fetusButtonActive: {
    borderColor: '#E8A598',
    backgroundColor: '#FFF0EC',
  },
  fetusEmoji: {
    fontSize: 22,
    marginBottom: 4,
  },
  fetusLabel: {
    fontSize: 13,
    fontFamily: 'Nunito_600SemiBold',
    color: '#7A5C5C',
    textAlign: 'center',
  },
  fetusLabelActive: {
    color: '#E8A598',
  },
  helperText: {
    fontSize: 12,
    fontFamily: 'Nunito_400Regular',
    color: '#7A5C5C',
    marginTop: -10,
    marginBottom: 16,
    opacity: 0.8,
  },
});
