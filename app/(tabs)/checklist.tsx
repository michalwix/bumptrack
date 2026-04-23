import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useI18n } from '../../src/hooks/useI18n';
import { usePregnancyStore } from '../../src/store/pregnancyStore';
import { checklistItems, ChecklistItem } from '../../src/data/checklistData';

type TrimesterTab = 1 | 2 | 3 | 4;

const CATEGORY_COLORS: Record<string, string> = {
  medical: '#E8A598',
  preparation: '#A8C5A0',
  shopping: '#C4A0C0',
  personal: '#F4C87A',
  legal: '#89B4CC',
};

function ChecklistItemRow({
  item,
  isChecked,
  onToggle,
  language,
  isRTL,
  t,
}: {
  item: ChecklistItem;
  isChecked: boolean;
  onToggle: () => void;
  language: 'he' | 'en';
  isRTL: boolean;
  t: (key: string) => string;
}) {
  const catColor = CATEGORY_COLORS[item.category] || '#E8A598';
  const textAlign = isRTL ? 'right' : 'left';

  return (
    <TouchableOpacity
      style={[styles.itemRow, isChecked && styles.itemRowChecked]}
      onPress={onToggle}
      accessibilityLabel={`Toggle ${item.title.en}`}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isChecked }}
    >
      <View style={[styles.itemInner, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
          {isChecked && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
        </View>

        <View style={{ flex: 1, marginHorizontal: 12 }}>
          <View style={[{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center', flexWrap: 'wrap' }]}>
            <Text
              style={[
                styles.itemTitle,
                { textAlign, flex: 1 },
                isChecked && styles.itemTitleChecked,
              ]}
            >
              {item.title[language] || item.title.en}
            </Text>
            {item.isRequired && (
              <View style={[styles.reqBadge, { backgroundColor: catColor + '22', marginStart: 6 }]}>
                <Text style={[styles.reqBadgeText, { color: catColor }]}>
                  {t('checklist.required')}
                </Text>
              </View>
            )}
          </View>
          <Text style={[styles.itemDescription, { textAlign }, isChecked && styles.itemDescChecked]}>
            {item.description[language] || item.description.en}
          </Text>
          <Text style={[styles.itemWeek, { textAlign }]}>
            {t('checklist.weekDue')} {item.weekDue}
          </Text>
        </View>

        <View style={[styles.catDot, { backgroundColor: catColor }]} />
      </View>
    </TouchableOpacity>
  );
}

export default function ChecklistScreen() {
  const { t, language, isRTL } = useI18n();
  const [activeTab, setActiveTab] = useState<TrimesterTab>(1);
  const checklistState = usePregnancyStore((s) => s.checklistState);
  const toggleChecklistItem = usePregnancyStore((s) => s.toggleChecklistItem);

  const textAlign = isRTL ? 'right' : 'left';

  const tabs: { key: TrimesterTab; label: string }[] = [
    { key: 1, label: t('checklist.firstTrimester') },
    { key: 2, label: t('checklist.secondTrimester') },
    { key: 3, label: t('checklist.thirdTrimester') },
    { key: 4, label: t('checklist.hospitalBag') },
  ];

  const filteredItems = checklistItems.filter((item) => item.trimester === activeTab);
  const completedCount = filteredItems.filter((item) => checklistState[item.id]).length;
  const totalCount = filteredItems.length;
  const progress = totalCount > 0 ? completedCount / totalCount : 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.screenTitle, { textAlign }]}>{t('checklist.title')}</Text>
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
            accessibilityLabel={tab.label}
          >
            <Text
              style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <View style={[{ flexDirection: isRTL ? 'row-reverse' : 'row' }, styles.progressRow]}>
          <Text style={[styles.progressLabel, { textAlign }]}>
            {t('checklist.progress')}
          </Text>
          <Text style={styles.progressCount}>
            {completedCount}/{totalCount} {t('checklist.completed')}
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
      </View>

      {/* Items */}
      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredItems.length === 0 ? (
          <View style={styles.allDoneContainer}>
            <Text style={styles.allDoneEmoji}>🎉</Text>
            <Text style={[styles.allDoneText, { textAlign: 'center' }]}>
              {t('checklist.allDone')}
            </Text>
          </View>
        ) : (
          filteredItems.map((item) => (
            <ChecklistItemRow
              key={item.id}
              item={item}
              isChecked={!!checklistState[item.id]}
              onToggle={() => toggleChecklistItem(item.id)}
              language={language}
              isRTL={isRTL}
              t={t}
            />
          ))
        )}

        {completedCount === totalCount && totalCount > 0 && (
          <View style={styles.allDoneContainer}>
            <Text style={styles.allDoneEmoji}>🎉</Text>
            <Text style={[styles.allDoneText, { textAlign: 'center' }]}>
              {t('checklist.allDone')}
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  screenTitle: {
    fontSize: 22,
    fontFamily: 'Nunito_700Bold',
    color: '#3D2C2C',
  },
  tabsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#F0DED8',
    marginHorizontal: 4,
    flexShrink: 0,
  },
  tabActive: {
    backgroundColor: '#E8A598',
    borderColor: '#E8A598',
  },
  tabText: {
    fontSize: 13,
    fontFamily: 'Nunito_600SemiBold',
    color: '#7A5C5C',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  progressRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 13,
    fontFamily: 'Nunito_600SemiBold',
    color: '#7A5C5C',
  },
  progressCount: {
    fontSize: 13,
    fontFamily: 'Nunito_600SemiBold',
    color: '#E8A598',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#F0DED8',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#E8A598',
    borderRadius: 3,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  itemRow: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F0DED8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  itemRowChecked: {
    opacity: 0.65,
    backgroundColor: '#F8F8F8',
  },
  itemInner: {
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#E8A598',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#A8C5A0',
    borderColor: '#A8C5A0',
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: 'Nunito_600SemiBold',
    color: '#3D2C2C',
    marginBottom: 4,
  },
  itemTitleChecked: {
    textDecorationLine: 'line-through',
    color: '#7A5C5C',
  },
  itemDescription: {
    fontSize: 12,
    fontFamily: 'Nunito_400Regular',
    color: '#7A5C5C',
    lineHeight: 18,
    marginBottom: 4,
  },
  itemDescChecked: {
    color: '#B8A0A0',
  },
  itemWeek: {
    fontSize: 11,
    fontFamily: 'Nunito_400Regular',
    color: '#B8A0A0',
  },
  reqBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  reqBadgeText: {
    fontSize: 10,
    fontFamily: 'Nunito_600SemiBold',
  },
  catDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  allDoneContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  allDoneEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  allDoneText: {
    fontSize: 16,
    fontFamily: 'Nunito_600SemiBold',
    color: '#A8C5A0',
  },
});
