import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useI18n } from '../../src/hooks/useI18n';
import { usePregnancyStore } from '../../src/store/pregnancyStore';
import { formatDate } from '../../src/utils/dateCalculations';

const APP_VERSION = '1.0.0';

export default function SettingsScreen() {
  const router = useRouter();
  const { t, language, changeLanguage, isRTL } = useI18n();
  const profile = usePregnancyStore((s) => s.profile);
  const notifications = usePregnancyStore((s) => s.notifications);
  const setNotificationPreference = usePregnancyStore((s) => s.setNotificationPreference);
  const setProfile = usePregnancyStore((s) => s.setProfile);
  const resetAllData = usePregnancyStore((s) => s.resetAllData);

  const textAlign = isRTL ? 'right' : 'left';

  function handleLanguageChange(lang: 'he' | 'en') {
    changeLanguage(lang);
    setProfile({ language: lang });
  }

  function handleResetData() {
    Alert.alert(
      t('settings.resetData'),
      t('settings.resetConfirm'),
      [
        { text: t('settings.cancel'), style: 'cancel' },
        {
          text: t('settings.confirm'),
          style: 'destructive',
          onPress: async () => {
            await resetAllData();
            router.replace('/onboarding');
          },
        },
      ]
    );
  }

  const dueDate = profile.dueDate ? new Date(profile.dueDate) : null;
  const lmpDate = profile.lmpDate ? new Date(profile.lmpDate) : null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text style={[styles.screenTitle, { textAlign }]}>{t('settings.title')}</Text>

        {/* Language Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { textAlign }]}>{t('settings.language')}</Text>
          <View style={[styles.langRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <TouchableOpacity
              style={[styles.langButton, language === 'he' && styles.langButtonActive]}
              onPress={() => handleLanguageChange('he')}
              accessibilityLabel="Switch to Hebrew"
            >
              <Text style={[styles.langButtonText, language === 'he' && styles.langButtonTextActive]}>
                {t('settings.hebrew')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.langButton, language === 'en' && styles.langButtonActive]}
              onPress={() => handleLanguageChange('en')}
              accessibilityLabel="Switch to English"
            >
              <Text style={[styles.langButtonText, language === 'en' && styles.langButtonTextActive]}>
                {t('settings.english')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { textAlign }]}>{t('settings.notifications')}</Text>

          {(
            [
              { key: 'weeklyUpdates', label: t('settings.weeklyUpdates') },
              { key: 'testReminders', label: t('settings.testReminders') },
              { key: 'dailyTips', label: t('settings.dailyTips') },
              { key: 'kickReminders', label: t('settings.kickReminders') },
            ] as { key: keyof typeof notifications; label: string }[]
          ).map((item) => (
            <View
              key={item.key}
              style={[styles.notifRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}
            >
              <Text style={[styles.notifLabel, { textAlign, flex: 1 }]}>{item.label}</Text>
              <Switch
                value={notifications[item.key]}
                onValueChange={(v) => setNotificationPreference(item.key, v)}
                trackColor={{ false: '#F0DED8', true: '#E8A598' }}
                thumbColor={notifications[item.key] ? '#FFFFFF' : '#FFFFFF'}
                accessibilityLabel={`Toggle ${item.label}`}
              />
            </View>
          ))}
        </View>

        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { textAlign }]}>{t('settings.profile')}</Text>

          {profile.name ? (
            <View style={[styles.profileRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
              <Ionicons name="person-outline" size={18} color="#7A5C5C" />
              <Text style={[styles.profileValue, { textAlign, marginHorizontal: 10 }]}>
                {profile.name}
              </Text>
            </View>
          ) : null}

          {dueDate && (
            <View style={[styles.profileRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
              <Ionicons name="calendar-outline" size={18} color="#7A5C5C" />
              <View style={{ marginHorizontal: 10 }}>
                <Text style={[styles.profileLabel, { textAlign }]}>{t('settings.dueDate')}</Text>
                <Text style={[styles.profileValue, { textAlign }]}>
                  {formatDate(dueDate)}
                </Text>
              </View>
            </View>
          )}

          {lmpDate && (
            <View style={[styles.profileRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
              <Ionicons name="calendar-outline" size={18} color="#7A5C5C" />
              <View style={{ marginHorizontal: 10 }}>
                <Text style={[styles.profileLabel, { textAlign }]}>{t('settings.lmpDate')}</Text>
                <Text style={[styles.profileValue, { textAlign }]}>
                  {formatDate(lmpDate)}
                </Text>
              </View>
            </View>
          )}

          {profile.prePregnancyWeightKg && (
            <View style={[styles.profileRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
              <Ionicons name="scale-outline" size={18} color="#7A5C5C" />
              <View style={{ marginHorizontal: 10 }}>
                <Text style={[styles.profileLabel, { textAlign }]}>
                  {isRTL ? 'משקל לפני ההריון' : 'Pre-pregnancy weight'}
                </Text>
                <Text style={[styles.profileValue, { textAlign }]}>
                  {profile.prePregnancyWeightKg} kg
                </Text>
              </View>
            </View>
          )}

          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => router.push('/onboarding')}
            accessibilityLabel="Edit profile"
          >
            <Ionicons name="create-outline" size={18} color="#FFFFFF" />
            <Text style={styles.editProfileButtonText}>
              {isRTL ? 'ערכי פרופיל' : 'Edit Profile'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { textAlign }]}>{t('settings.about')}</Text>
          <View style={[styles.profileRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <Ionicons name="information-circle-outline" size={18} color="#7A5C5C" />
            <Text style={[styles.profileValue, { marginHorizontal: 10 }]}>
              BumpTrack {t('settings.version')} {APP_VERSION}
            </Text>
          </View>
        </View>

        {/* Reset Data */}
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleResetData}
          accessibilityLabel="Reset all app data"
        >
          <Ionicons name="trash-outline" size={18} color="#CC6666" />
          <Text style={styles.resetButtonText}>{t('settings.resetData')}</Text>
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
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  screenTitle: {
    fontSize: 22,
    fontFamily: 'Nunito_700Bold',
    color: '#3D2C2C',
    marginBottom: 20,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0DED8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',
    color: '#E8A598',
    marginBottom: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  langRow: {
    gap: 12,
  },
  langButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F0DED8',
    backgroundColor: '#FDF6F0',
  },
  langButtonActive: {
    backgroundColor: '#E8A598',
    borderColor: '#E8A598',
  },
  langButtonText: {
    fontSize: 15,
    fontFamily: 'Nunito_600SemiBold',
    color: '#7A5C5C',
  },
  langButtonTextActive: {
    color: '#FFFFFF',
  },
  notifRow: {
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0DED8',
  },
  notifLabel: {
    fontSize: 15,
    fontFamily: 'Nunito_400Regular',
    color: '#3D2C2C',
  },
  profileRow: {
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0DED8',
  },
  profileLabel: {
    fontSize: 12,
    fontFamily: 'Nunito_400Regular',
    color: '#7A5C5C',
    marginBottom: 2,
  },
  profileValue: {
    fontSize: 15,
    fontFamily: 'Nunito_600SemiBold',
    color: '#3D2C2C',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF0F0',
    borderRadius: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#F0C0C0',
    gap: 8,
    marginTop: 4,
  },
  resetButtonText: {
    fontSize: 15,
    fontFamily: 'Nunito_600SemiBold',
    color: '#CC6666',
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8A598',
    borderRadius: 14,
    paddingVertical: 12,
    marginTop: 12,
    gap: 8,
    shadowColor: '#E8A598',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  editProfileButtonText: {
    fontSize: 15,
    fontFamily: 'Nunito_700Bold',
    color: '#FFFFFF',
  },
});
