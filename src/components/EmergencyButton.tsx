import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Linking,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useI18n } from '../hooks/useI18n';

const WARNING_SIGNS_EN = [
  'Heavy bleeding',
  'Severe abdominal pain',
  'No fetal movement for 12+ hours',
  'Severe headache with visual changes',
  'High fever (over 38°C)',
  'Signs of preterm labor before week 37',
];

const WARNING_SIGNS_HE = [
  'דימום כבד',
  'כאב בטן חמור',
  'אין תנועות עובר ל-12 שעות',
  'כאב ראש חמור עם הפרעות ראייה',
  'חום גבוה (מעל 38 מעלות)',
  'סימני לידה מוקדמת לפני שבוע 37',
];

function callNumber(number: string) {
  const url = `tel:${number}`;
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    }
  });
}

export default function EmergencyButton() {
  const [visible, setVisible] = useState(false);
  const { t, isRTL, language } = useI18n();
  const textAlign = isRTL ? 'right' : 'left';
  const warningSigns = language === 'he' ? WARNING_SIGNS_HE : WARNING_SIGNS_EN;

  return (
    <>
      <TouchableOpacity
        style={styles.emergencyButton}
        onPress={() => setVisible(true)}
        accessibilityLabel="Open emergency contacts"
        accessibilityRole="button"
      >
        <Ionicons name="call" size={20} color="#FFFFFF" />
      </TouchableOpacity>

      <Modal
        visible={visible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          {/* Modal Header */}
          <View style={[styles.modalHeader, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <View>
              <Text style={[styles.modalTitle, { textAlign }]}>{t('emergency.title')}</Text>
              <Text style={[styles.modalSubtitle, { textAlign }]}>{t('emergency.subtitle')}</Text>
            </View>
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={styles.closeButton}
              accessibilityLabel="Close emergency panel"
            >
              <Ionicons name="close" size={24} color="#7A5C5C" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.modalContent} showsVerticalScrollIndicator={false}>

            {/* Warning Signs */}
            <View style={styles.warningCard}>
              <View style={[styles.warningHeader, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                <Text style={styles.warningHeaderIcon}>⚠️</Text>
                <Text style={[styles.warningHeaderText, { textAlign }]}>
                  {t('emergency.warningSignsTitle')}
                </Text>
              </View>
              {warningSigns.map((sign, idx) => (
                <View
                  key={idx}
                  style={[styles.warningSignRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}
                >
                  <Text style={styles.warningSignBullet}>•</Text>
                  <Text style={[styles.warningSignText, { textAlign, flex: 1, marginHorizontal: 8 }]}>
                    {sign}
                  </Text>
                </View>
              ))}
            </View>

            {/* Emergency Contacts */}
            <View style={styles.contactsSection}>
              {/* MDA */}
              <View style={styles.contactCard}>
                <View style={[styles.contactInfo, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                  <View style={styles.contactIconCircle}>
                    <Text style={styles.contactIconText}>🚑</Text>
                  </View>
                  <View style={{ flex: 1, marginHorizontal: 12 }}>
                    <Text style={[styles.contactName, { textAlign }]}>{t('emergency.mda')}</Text>
                    <Text style={[styles.contactNumber, { textAlign }]}>{t('emergency.mdaNumber')}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.callButton}
                  onPress={() => callNumber('101')}
                  accessibilityLabel="Call Magen David Adom 101"
                >
                  <Ionicons name="call" size={18} color="#FFFFFF" />
                  <Text style={styles.callButtonText}>{t('emergency.callNow')}</Text>
                </TouchableOpacity>
              </View>

              {/* HMO Hotline */}
              <View style={styles.contactCard}>
                <View style={[styles.contactInfo, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                  <View style={[styles.contactIconCircle, { backgroundColor: '#F0F7EF' }]}>
                    <Text style={styles.contactIconText}>👩‍⚕️</Text>
                  </View>
                  <View style={{ flex: 1, marginHorizontal: 12 }}>
                    <Text style={[styles.contactName, { textAlign }]}>{t('emergency.hmoHotline')}</Text>
                    <Text style={[styles.contactNumber, { textAlign }]}>
                      {language === 'he' ? '* קופת חולים' : 'Check HMO app/card'}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={[styles.callButton, { backgroundColor: '#A8C5A0' }]}
                  onPress={() => {
                    // Prompt user to check their HMO card
                  }}
                  accessibilityLabel="Contact HMO nurse hotline"
                >
                  <Ionicons name="call" size={18} color="#FFFFFF" />
                  <Text style={styles.callButtonText}>{t('emergency.callNow')}</Text>
                </TouchableOpacity>
              </View>

              {/* Police / General Emergency */}
              <View style={styles.contactCard}>
                <View style={[styles.contactInfo, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                  <View style={[styles.contactIconCircle, { backgroundColor: '#F0ECFF' }]}>
                    <Text style={styles.contactIconText}>🏥</Text>
                  </View>
                  <View style={{ flex: 1, marginHorizontal: 12 }}>
                    <Text style={[styles.contactName, { textAlign }]}>{t('emergency.hospital')}</Text>
                    <Text style={[styles.contactNumber, { textAlign }]}>
                      {language === 'he' ? 'הנחת הרשימה מבית החולים שלך' : 'From your hospital documentation'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Important Note */}
            <View style={styles.noteCard}>
              <Text style={[styles.noteText, { textAlign: 'center' }]}>
                {language === 'he'
                  ? 'בכל מצב חירום — אל תהססי לפנות לעזרה מיידית'
                  : 'In any emergency situation — do not hesitate to seek immediate help'}
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  emergencyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#CC6666',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#CC6666',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FDF6F0',
  },
  modalHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F0DED8',
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: 'Nunito_700Bold',
    color: '#CC6666',
  },
  modalSubtitle: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: '#7A5C5C',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0DED8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 16,
  },
  warningCard: {
    backgroundColor: '#FFF5F5',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0C0C0',
  },
  warningHeader: {
    alignItems: 'center',
    marginBottom: 12,
  },
  warningHeaderIcon: {
    fontSize: 22,
    marginEnd: 8,
  },
  warningHeaderText: {
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
    color: '#CC6666',
    flex: 1,
  },
  warningSignRow: {
    paddingVertical: 4,
    alignItems: 'flex-start',
  },
  warningSignBullet: {
    fontSize: 16,
    color: '#CC6666',
    lineHeight: 22,
  },
  warningSignText: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: '#3D2C2C',
    lineHeight: 22,
  },
  contactsSection: {
    marginBottom: 16,
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0DED8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  contactInfo: {
    alignItems: 'center',
    marginBottom: 12,
  },
  contactIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactIconText: {
    fontSize: 24,
  },
  contactName: {
    fontSize: 15,
    fontFamily: 'Nunito_700Bold',
    color: '#3D2C2C',
    marginBottom: 2,
  },
  contactNumber: {
    fontSize: 14,
    fontFamily: 'Nunito_600SemiBold',
    color: '#CC6666',
  },
  callButton: {
    flexDirection: 'row',
    backgroundColor: '#CC6666',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  callButtonText: {
    fontSize: 15,
    fontFamily: 'Nunito_700Bold',
    color: '#FFFFFF',
  },
  noteCard: {
    backgroundColor: '#FFF8EC',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F4C87A',
  },
  noteText: {
    fontSize: 14,
    fontFamily: 'Nunito_600SemiBold',
    color: '#7A5C5C',
    lineHeight: 20,
  },
});
