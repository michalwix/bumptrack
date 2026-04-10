import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { usePregnancy } from '../../src/hooks/usePregnancy';
import { useI18n } from '../../src/hooks/useI18n';
import { weeklyData, WeekData } from '../../src/data/weeklyData';
import { fetalSizes } from '../../src/data/fetalSizes';

const ALL_WEEKS = Array.from({ length: 40 }, (_, i) => i + 1);

function WeekPill({
  week,
  isSelected,
  isCurrent,
  onPress,
}: {
  week: number;
  isSelected: boolean;
  isCurrent: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.weekPill,
        isSelected && styles.weekPillSelected,
        isCurrent && !isSelected && styles.weekPillCurrent,
      ]}
      accessibilityLabel={`Week ${week}`}
    >
      <Text
        style={[
          styles.weekPillText,
          isSelected && styles.weekPillTextSelected,
          isCurrent && !isSelected && styles.weekPillTextCurrent,
        ]}
      >
        {week}
      </Text>
    </TouchableOpacity>
  );
}

export default function WeeklyScreen() {
  const { t, language, isRTL } = useI18n();
  const { currentWeek } = usePregnancy();
  const [selectedWeek, setSelectedWeek] = useState(Math.max(currentWeek, 1));
  const weekListRef = useRef<FlatList>(null);

  const textAlign = isRTL ? 'right' : 'left';
  const weekData: WeekData | undefined = weeklyData.find((w) => w.week === selectedWeek);
  const fetal = fetalSizes.find((f) => f.week === selectedWeek);

  function scrollToCurrentWeek() {
    setSelectedWeek(currentWeek > 0 ? currentWeek : 1);
    weekListRef.current?.scrollToIndex({
      index: Math.max((currentWeek > 0 ? currentWeek : 1) - 1, 0),
      animated: true,
      viewPosition: 0.5,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Title Bar */}
      <View style={[styles.titleBar, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        <Text style={[styles.screenTitle, { textAlign }]}>{t('weekly.title')}</Text>
        {currentWeek > 0 && (
          <TouchableOpacity
            style={styles.currentWeekButton}
            onPress={scrollToCurrentWeek}
            accessibilityLabel="Jump to current week"
          >
            <Text style={styles.currentWeekButtonText}>{t('weekly.currentWeek')}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Week Selector */}
      <FlatList
        ref={weekListRef}
        data={ALL_WEEKS}
        keyExtractor={(w) => w.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weekListContent}
        initialScrollIndex={Math.max(selectedWeek - 3, 0)}
        getItemLayout={(_, index) => ({ length: 52, offset: 52 * index, index })}
        renderItem={({ item: week }) => (
          <WeekPill
            week={week}
            isSelected={week === selectedWeek}
            isCurrent={week === currentWeek}
            onPress={() => setSelectedWeek(week)}
          />
        )}
      />

      {/* Week Content */}
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Week Header */}
        <View style={styles.weekHeader}>
          <Text style={[styles.weekTitle, { textAlign: 'center' }]}>
            {t('weekly.week')} {selectedWeek}
          </Text>
          {fetal && (
            <View style={styles.fetalRow}>
              <Text style={styles.fetalEmoji}>{fetal.emoji}</Text>
              <View style={{ marginHorizontal: 12 }}>
                <Text style={[styles.fetalName, { textAlign }]}>
                  {fetal.comparison[language] || fetal.comparison.en}
                </Text>
                <Text style={[styles.fetalDims, { textAlign }]}>
                  {fetal.lengthCm > 0 && `${t('weekly.length')}: ${fetal.lengthCm} ${t('weekly.cm')}`}
                  {fetal.weightGrams > 0 && `  ·  ${t('weekly.weight')}: ${fetal.weightGrams} ${t('weekly.g')}`}
                </Text>
              </View>
            </View>
          )}
        </View>

        {weekData ? (
          <>
            {/* Development Section */}
            <View style={styles.card}>
              <View style={[styles.cardHeader, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                <Text style={styles.cardHeaderIcon}>👶</Text>
                <Text style={[styles.cardTitle, { textAlign }]}>{t('weekly.development')}</Text>
              </View>
              <Text style={[styles.cardBody, { textAlign }]}>
                {weekData.development[language] || weekData.development.en}
              </Text>
            </View>

            {/* Mother Changes Section */}
            <View style={styles.card}>
              <View style={[styles.cardHeader, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                <Text style={styles.cardHeaderIcon}>🤱</Text>
                <Text style={[styles.cardTitle, { textAlign }]}>{t('weekly.motherChanges')}</Text>
              </View>
              <Text style={[styles.cardBody, { textAlign }]}>
                {weekData.motherChanges[language] || weekData.motherChanges.en}
              </Text>
            </View>

            {/* Medical Tests */}
            {weekData.medicalTests.length > 0 && (
              <View style={styles.card}>
                <View style={[styles.cardHeader, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                  <Text style={styles.cardHeaderIcon}>🔬</Text>
                  <Text style={[styles.cardTitle, { textAlign }]}>{t('weekly.medicalTests')}</Text>
                </View>
                {weekData.medicalTests.map((test, idx) => (
                  <View key={idx} style={styles.testItem}>
                    <View style={[styles.testHeader, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                      <Text style={[styles.testName, { textAlign, flex: 1 }]}>
                        {test.name[language] || test.name.en}
                      </Text>
                      <View
                        style={[
                          styles.testBadge,
                          { backgroundColor: test.isRequired ? '#FFF0EC' : '#F0F7EF' },
                        ]}
                      >
                        <Text
                          style={[
                            styles.testBadgeText,
                            { color: test.isRequired ? '#E8A598' : '#A8C5A0' },
                          ]}
                        >
                          {test.isRequired ? t('weekly.required') : t('weekly.recommended')}
                        </Text>
                      </View>
                    </View>
                    <Text style={[styles.testDescription, { textAlign }]}>
                      {test.description[language] || test.description.en}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Tips */}
            {weekData.tips.length > 0 && (
              <View style={styles.card}>
                <View style={[styles.cardHeader, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                  <Text style={styles.cardHeaderIcon}>💡</Text>
                  <Text style={[styles.cardTitle, { textAlign }]}>{t('weekly.tips')}</Text>
                </View>
                {weekData.tips.map((tip, idx) => (
                  <View key={idx} style={[styles.tipRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                    <Text style={styles.tipBullet}>•</Text>
                    <Text style={[styles.tipText, { textAlign, flex: 1, marginHorizontal: 8 }]}>
                      {tip[language] || tip.en}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </>
        ) : (
          <View style={styles.noDataCard}>
            <Text style={[styles.noDataText, { textAlign: 'center' }]}>
              {language === 'he'
                ? 'אין מידע זמין לשבוע זה'
                : 'No information available for this week'}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF6F0',
  },
  titleBar: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  screenTitle: {
    fontSize: 22,
    fontFamily: 'Nunito_700Bold',
    color: '#3D2C2C',
  },
  currentWeekButton: {
    backgroundColor: '#E8A598',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  currentWeekButtonText: {
    fontSize: 12,
    fontFamily: 'Nunito_600SemiBold',
    color: '#FFFFFF',
  },
  weekListContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  weekPill: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#F0DED8',
  },
  weekPillSelected: {
    backgroundColor: '#E8A598',
    borderColor: '#E8A598',
  },
  weekPillCurrent: {
    borderColor: '#E8A598',
    borderWidth: 2,
  },
  weekPillText: {
    fontSize: 14,
    fontFamily: 'Nunito_600SemiBold',
    color: '#7A5C5C',
  },
  weekPillTextSelected: {
    color: '#FFFFFF',
  },
  weekPillTextCurrent: {
    color: '#E8A598',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  weekHeader: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0DED8',
  },
  weekTitle: {
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    color: '#E8A598',
    marginBottom: 12,
  },
  fetalRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fetalEmoji: {
    fontSize: 48,
  },
  fetalName: {
    fontSize: 18,
    fontFamily: 'Nunito_700Bold',
    color: '#3D2C2C',
    marginBottom: 4,
  },
  fetalDims: {
    fontSize: 13,
    fontFamily: 'Nunito_400Regular',
    color: '#7A5C5C',
  },
  card: {
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
    elevation: 2,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 12,
  },
  cardHeaderIcon: {
    fontSize: 20,
    marginEnd: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
    color: '#3D2C2C',
    flex: 1,
  },
  cardBody: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: '#3D2C2C',
    lineHeight: 22,
  },
  testItem: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0DED8',
  },
  testHeader: {
    alignItems: 'center',
    marginBottom: 4,
  },
  testName: {
    fontSize: 14,
    fontFamily: 'Nunito_600SemiBold',
    color: '#3D2C2C',
  },
  testBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  testBadgeText: {
    fontSize: 11,
    fontFamily: 'Nunito_600SemiBold',
  },
  testDescription: {
    fontSize: 13,
    fontFamily: 'Nunito_400Regular',
    color: '#7A5C5C',
    lineHeight: 20,
  },
  tipRow: {
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  tipBullet: {
    fontSize: 16,
    color: '#E8A598',
    lineHeight: 22,
  },
  tipText: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: '#3D2C2C',
    lineHeight: 22,
  },
  noDataCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 32,
    borderWidth: 1,
    borderColor: '#F0DED8',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: '#7A5C5C',
  },
});
