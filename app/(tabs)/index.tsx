import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { usePregnancy } from '../../src/hooks/usePregnancy';
import { useI18n } from '../../src/hooks/useI18n';
import { usePregnancyStore } from '../../src/store/pregnancyStore';
import { checklistItems } from '../../src/data/checklistData';
import EmergencyButton from '../../src/components/EmergencyButton';

function getGreeting(t: (key: string) => string): string {
  const hour = new Date().getHours();
  if (hour < 12) return t('home.morning');
  if (hour < 17) return t('home.afternoon');
  return t('home.evening');
}

export default function HomeScreen() {
  const router = useRouter();
  const { t, language, isRTL } = useI18n();
  const {
    profile,
    currentWeek,
    currentDay,
    daysUntilDue,
    trimester,
    fetalSize,
    weekData,
    isSetup,
  } = usePregnancy();
  const checklistState = usePregnancyStore((s) => s.checklistState);

  const textAlign = isRTL ? 'right' : 'left';

  if (!isSetup) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notSetupContainer}>
          <Text style={styles.notSetupEmoji}>🤰</Text>
          <Text style={[styles.notSetupTitle, { textAlign: 'center' }]}>
            BumpTrack
          </Text>
          <Text style={[styles.notSetupText, { textAlign: 'center' }]}>
            {language === 'he'
              ? 'כדי להתחיל, צריך להגדיר את תאריך הלידה'
              : 'To get started, please complete your profile setup'}
          </Text>
          <TouchableOpacity
            style={styles.setupButton}
            onPress={() => router.push('/onboarding')}
            accessibilityLabel="Set up profile"
          >
            <Text style={styles.setupButtonText}>
              {language === 'he' ? 'הגדרת פרופיל' : 'Set Up Profile'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const trimesterLabel =
    trimester === 1
      ? t('home.trimester1')
      : trimester === 2
      ? t('home.trimester2')
      : t('home.trimester3');

  const trimesterColor =
    trimester === 1 ? '#A8C5A0' : trimester === 2 ? '#E8A598' : '#C4A0C0';

  // Get next incomplete required checklist items
  const upcomingItems = checklistItems
    .filter((item) => {
      const trimesterMatch =
        item.trimester === trimester ||
        (item.trimester === trimester + 1 && currentWeek >= item.weekDue - 2);
      return trimesterMatch && !checklistState[item.id] && item.weekDue >= currentWeek;
    })
    .sort((a, b) => a.weekDue - b.weekDue)
    .slice(0, 3);

  const greeting = getGreeting(t);
  const displayName = profile.name ? `, ${profile.name}` : '';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Greeting */}
        <View style={[styles.header, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.greeting, { textAlign }]}>
              {greeting}{displayName} 👋
            </Text>
            <Text style={[styles.appTitle, { textAlign }]}>BumpTrack</Text>
          </View>
          <EmergencyButton />
        </View>

        {/* Week Hero Card */}
        <View style={styles.heroCard}>
          <View style={[styles.trimesterBadge, { backgroundColor: trimesterColor }]}>
            <Text style={styles.trimesterBadgeText}>{trimesterLabel}</Text>
          </View>

          <Text style={[styles.weekLabel, { textAlign: 'center' }]}>
            {t('home.week')}
          </Text>
          <Text style={styles.weekNumber}>{currentWeek}</Text>
          {currentDay > 0 && (
            <Text style={[styles.dayText, { textAlign: 'center' }]}>
              + {currentDay} {currentDay === 1 ? t('home.day') : t('home.days')}
            </Text>
          )}

          {daysUntilDue !== null && daysUntilDue >= 0 && (
            <View style={styles.countdownContainer}>
              <Text style={[styles.countdownNumber, { textAlign: 'center' }]}>
                {daysUntilDue}
              </Text>
              <Text style={[styles.countdownLabel, { textAlign: 'center' }]}>
                {t('home.daysUntilBirth')}
              </Text>
            </View>
          )}
        </View>

        {/* Fetal Size Card */}
        <View style={styles.sectionCard}>
          <Text style={[styles.sectionTitle, { textAlign }]}>{t('home.fetalSize')}</Text>
          <View style={[styles.fetalSizeRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <Text style={styles.fetalEmoji}>{fetalSize.emoji}</Text>
            <View style={{ flex: 1, marginHorizontal: 12 }}>
              <Text style={[styles.fetalComparison, { textAlign }]}>
                {fetalSize.comparison[language] || fetalSize.comparison.en}
              </Text>
              <Text style={[styles.fetalDimensions, { textAlign }]}>
                {fetalSize.lengthCm > 0
                  ? `${fetalSize.lengthCm} cm · ${fetalSize.weightGrams > 0 ? fetalSize.weightGrams + ' g' : '—'}`
                  : '—'}
              </Text>
            </View>
          </View>
        </View>

        {/* This Week Development */}
        {weekData && (
          <View style={styles.sectionCard}>
            <Text style={[styles.sectionTitle, { textAlign }]}>{t('home.thisWeek')}</Text>
            <Text style={[styles.developmentText, { textAlign }]}>
              {weekData.development[language] || weekData.development.en}
            </Text>
          </View>
        )}

        {/* Upcoming Tasks */}
        <View style={styles.sectionCard}>
          <Text style={[styles.sectionTitle, { textAlign }]}>{t('home.upcomingTasks')}</Text>
          {upcomingItems.length === 0 ? (
            <Text style={[styles.noUpcomingText, { textAlign }]}>{t('home.noUpcoming')}</Text>
          ) : (
            upcomingItems.map((item) => (
              <View
                key={item.id}
                style={[styles.upcomingItem, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}
              >
                <View style={[styles.upcomingDot, { backgroundColor: item.isRequired ? '#E8A598' : '#A8C5A0' }]} />
                <View style={{ flex: 1, marginHorizontal: 10 }}>
                  <Text style={[styles.upcomingTitle, { textAlign }]}>
                    {item.title[language] || item.title.en}
                  </Text>
                  <Text style={[styles.upcomingWeek, { textAlign }]}>
                    {t('checklist.weekDue')} {item.weekDue}
                  </Text>
                </View>
                {item.isRequired && (
                  <View style={styles.requiredBadge}>
                    <Text style={styles.requiredBadgeText}>{t('checklist.required')}</Text>
                  </View>
                )}
              </View>
            ))
          )}
        </View>

        {/* Quick Actions */}
        <Text style={[styles.sectionTitle, { textAlign, paddingHorizontal: 0, marginBottom: 12 }]}>
          {t('home.quickActions')}
        </Text>
        <View style={[styles.quickActionsRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => router.push('/(tabs)/tracker')}
            accessibilityLabel="Open kick counter"
          >
            <Text style={styles.quickActionEmoji}>🦵</Text>
            <Text style={[styles.quickActionLabel, { textAlign: 'center' }]}>
              {t('home.kickCounter')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => router.push('/(tabs)/tracker')}
            accessibilityLabel="Open contraction timer"
          >
            <Text style={styles.quickActionEmoji}>⏱️</Text>
            <Text style={[styles.quickActionLabel, { textAlign: 'center' }]}>
              {t('home.contractionTimer')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => router.push('/(tabs)/tracker')}
            accessibilityLabel="Open weight log"
          >
            <Text style={styles.quickActionEmoji}>⚖️</Text>
            <Text style={[styles.quickActionLabel, { textAlign: 'center' }]}>
              {t('home.weightLog')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF6F0',
  },
  notSetupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  notSetupEmoji: {
    fontSize: 72,
    marginBottom: 16,
  },
  notSetupTitle: {
    fontSize: 28,
    fontFamily: 'Nunito_700Bold',
    color: '#E8A598',
    marginBottom: 12,
  },
  notSetupText: {
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    color: '#7A5C5C',
    marginBottom: 32,
  },
  setupButton: {
    backgroundColor: '#E8A598',
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 28,
  },
  setupButtonText: {
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  greeting: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: '#7A5C5C',
  },
  appTitle: {
    fontSize: 22,
    fontFamily: 'Nunito_700Bold',
    color: '#E8A598',
  },
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#E8A598',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0DED8',
  },
  trimesterBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  trimesterBadgeText: {
    fontSize: 13,
    fontFamily: 'Nunito_700Bold',
    color: '#FFFFFF',
  },
  weekLabel: {
    fontSize: 16,
    fontFamily: 'Nunito_600SemiBold',
    color: '#7A5C5C',
    marginBottom: 4,
  },
  weekNumber: {
    fontSize: 72,
    fontFamily: 'Nunito_700Bold',
    color: '#E8A598',
    lineHeight: 80,
  },
  dayText: {
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    color: '#7A5C5C',
    marginTop: 4,
  },
  countdownContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0DED8',
    width: '100%',
    alignItems: 'center',
  },
  countdownNumber: {
    fontSize: 36,
    fontFamily: 'Nunito_700Bold',
    color: '#3D2C2C',
  },
  countdownLabel: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: '#7A5C5C',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0DED8',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
    color: '#3D2C2C',
    marginBottom: 12,
  },
  fetalSizeRow: {
    alignItems: 'center',
  },
  fetalEmoji: {
    fontSize: 48,
  },
  fetalComparison: {
    fontSize: 18,
    fontFamily: 'Nunito_700Bold',
    color: '#3D2C2C',
    marginBottom: 4,
  },
  fetalDimensions: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: '#7A5C5C',
  },
  developmentText: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: '#3D2C2C',
    lineHeight: 22,
  },
  noUpcomingText: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: '#A8C5A0',
  },
  upcomingItem: {
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0DED8',
  },
  upcomingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  upcomingTitle: {
    fontSize: 14,
    fontFamily: 'Nunito_600SemiBold',
    color: '#3D2C2C',
  },
  upcomingWeek: {
    fontSize: 12,
    fontFamily: 'Nunito_400Regular',
    color: '#7A5C5C',
  },
  requiredBadge: {
    backgroundColor: '#FFF0EC',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  requiredBadgeText: {
    fontSize: 11,
    fontFamily: 'Nunito_600SemiBold',
    color: '#E8A598',
  },
  quickActionsRow: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0DED8',
  },
  quickActionEmoji: {
    fontSize: 28,
    marginBottom: 6,
  },
  quickActionLabel: {
    fontSize: 11,
    fontFamily: 'Nunito_600SemiBold',
    color: '#7A5C5C',
  },
});
