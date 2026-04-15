import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useI18n } from '../../src/hooks/useI18n';
import { usePregnancyStore, ContractionEntry } from '../../src/store/pregnancyStore';
import { format } from 'date-fns';

type TrackerTab = 'kicks' | 'contractions' | 'weight';

// ─── Kick Counter ────────────────────────────────────────────────────────────

function KickCounter({ t, isRTL, language }: { t: (k: string) => string; isRTL: boolean; language: string }) {
  const [kickCount, setKickCount] = useState(0);
  const [sessionStart, setSessionStart] = useState<Date | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const addKickSession = usePregnancyStore((s) => s.addKickSession);
  const kicks = usePregnancyStore((s) => s.kicks);
  const textAlign = isRTL ? 'right' : 'left';

  const GOAL = 10;
  const MAX_MINUTES = 120;

  useEffect(() => {
    if (sessionStart) {
      intervalRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - sessionStart.getTime()) / 1000));
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [sessionStart]);

  function handleTap() {
    if (!sessionStart) {
      setSessionStart(new Date());
    }
    const newCount = kickCount + 1;
    setKickCount(newCount);
  }

  async function handleReset() {
    if (sessionStart && kickCount > 0) {
      await addKickSession({
        date: new Date().toISOString(),
        kicks: kickCount,
        durationMinutes: Math.round(elapsed / 60),
        startTime: sessionStart.toISOString(),
      });
    }
    setKickCount(0);
    setSessionStart(null);
    setElapsed(0);
  }

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  const goalReached = kickCount >= GOAL;
  const overTime = minutes >= MAX_MINUTES && kickCount < GOAL;

  const recentKicks = kicks.slice(0, 7);

  return (
    <ScrollView contentContainerStyle={styles.trackerContent} showsVerticalScrollIndicator={false}>
      {/* Big Tap Button */}
      <TouchableOpacity
        style={[styles.kickButton, goalReached && styles.kickButtonGoal]}
        onPress={handleTap}
        activeOpacity={0.8}
        accessibilityLabel="Tap to count a kick"
        accessibilityRole="button"
      >
        <Text style={styles.kickButtonEmoji}>🦵</Text>
        <Text style={styles.kickButtonLabel}>{t('tracker.tapToCount')}</Text>
        <Text style={styles.kickCountNumber}>{kickCount}</Text>
        <Text style={styles.kickCountLabel}>{t('tracker.kickCount')}</Text>
      </TouchableOpacity>

      {/* Goal & Timer Row */}
      <View style={[styles.kickInfoRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        <View style={styles.kickInfoBox}>
          <Text style={[styles.kickInfoValue, { textAlign: 'center' }]}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </Text>
          <Text style={[styles.kickInfoLabel, { textAlign: 'center' }]}>{t('tracker.sessionTime')}</Text>
        </View>
        <View style={styles.kickInfoBox}>
          <Text style={[styles.kickInfoValue, { textAlign: 'center', color: goalReached ? '#A8C5A0' : '#E8A598' }]}>
            {kickCount}/{GOAL}
          </Text>
          <Text style={[styles.kickInfoLabel, { textAlign: 'center' }]}>{t('tracker.goal')}</Text>
        </View>
      </View>

      {/* Alerts */}
      {goalReached && (
        <View style={[styles.alertCard, styles.alertGreen]}>
          <Text style={[styles.alertText, { textAlign: 'center', color: '#A8C5A0' }]}>
            ✓ {t('tracker.goalReached')}
          </Text>
        </View>
      )}
      {overTime && (
        <View style={[styles.alertCard, styles.alertOrange]}>
          <Text style={[styles.alertText, { textAlign: 'center', color: '#E8A598' }]}>
            ⚠️ {t('tracker.lowMovement')}
          </Text>
        </View>
      )}

      {/* Reset Button */}
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={handleReset}
        accessibilityLabel="Reset kick counting session"
      >
        <Text style={styles.secondaryButtonText}>{t('tracker.resetSession')}</Text>
      </TouchableOpacity>

      {/* History */}
      {recentKicks.length > 0 && (
        <View style={styles.historyCard}>
          <Text style={[styles.historyTitle, { textAlign }]}>{t('tracker.history')}</Text>
          {recentKicks.map((session) => (
            <View
              key={session.id}
              style={[styles.historyRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}
            >
              <Text style={[styles.historyDate, { textAlign }]}>
                {format(new Date(session.date), 'dd/MM HH:mm')}
              </Text>
              <Text style={[styles.historyValue, { textAlign }]}>
                {session.kicks} {t('tracker.kickCount')} · {session.durationMinutes} {t('tracker.minutes')}
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

// ─── Contraction Timer ────────────────────────────────────────────────────────

function ContractionTimer({ t, isRTL }: { t: (k: string) => string; isRTL: boolean }) {
  const contractions = usePregnancyStore((s) => s.contractions);
  const currentContractionStart = usePregnancyStore((s) => s.currentContractionStart);
  const startContraction = usePregnancyStore((s) => s.startContraction);
  const stopContraction = usePregnancyStore((s) => s.stopContraction);
  const clearContractions = usePregnancyStore((s) => s.clearContractions);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const textAlign = isRTL ? 'right' : 'left';

  useEffect(() => {
    if (currentContractionStart) {
      intervalRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - currentContractionStart) / 1000));
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setElapsed(0);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentContractionStart]);

  // Check 5-1-1 pattern (5 min interval, 1 min duration, 1 hour)
  const recent = contractions.slice(-6);
  const has511 = recent.length >= 3 && recent.every((c) => {
    const durOk = (c.durationSeconds ?? 0) >= 60;
    const intOk = c.intervalSeconds !== undefined && c.intervalSeconds <= 300;
    return durOk && intOk;
  });

  const lastThree = contractions.slice(-3);
  const avgInterval =
    lastThree.filter((c) => c.intervalSeconds !== undefined).length >= 2
      ? Math.round(
          lastThree
            .filter((c) => c.intervalSeconds !== undefined)
            .reduce((sum, c) => sum + (c.intervalSeconds ?? 0), 0) /
            lastThree.filter((c) => c.intervalSeconds !== undefined).length
        )
      : null;

  const lastContraction = contractions[contractions.length - 1];

  function formatSecs(secs: number | undefined): string {
    if (!secs) return '—';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    if (m > 0) return `${m}${t('tracker.minutes')} ${s}${t('tracker.seconds')}`;
    return `${s} ${t('tracker.seconds')}`;
  }

  return (
    <ScrollView contentContainerStyle={styles.trackerContent} showsVerticalScrollIndicator={false}>
      {/* Start/Stop Button */}
      <TouchableOpacity
        style={[
          styles.contractionButton,
          currentContractionStart ? styles.contractionButtonActive : null,
        ]}
        onPress={currentContractionStart ? stopContraction : startContraction}
        accessibilityLabel={currentContractionStart ? 'Stop contraction timer' : 'Start contraction timer'}
        accessibilityRole="button"
      >
        <Text style={styles.contractionButtonEmoji}>
          {currentContractionStart ? '⏹️' : '▶️'}
        </Text>
        <Text style={styles.contractionButtonLabel}>
          {currentContractionStart ? t('tracker.stopContraction') : t('tracker.startContraction')}
        </Text>
        {currentContractionStart && (
          <Text style={styles.contractionElapsed}>
            {String(Math.floor(elapsed / 60)).padStart(2, '0')}:
            {String(elapsed % 60).padStart(2, '0')}
          </Text>
        )}
      </TouchableOpacity>

      {/* Stats Row */}
      <View style={[styles.contractionStatsRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        <View style={styles.contractionStat}>
          <Text style={[styles.contractionStatValue, { textAlign: 'center' }]}>
            {formatSecs(lastContraction?.durationSeconds)}
          </Text>
          <Text style={[styles.contractionStatLabel, { textAlign: 'center' }]}>{t('tracker.duration')}</Text>
        </View>
        <View style={styles.contractionStat}>
          <Text style={[styles.contractionStatValue, { textAlign: 'center' }]}>
            {formatSecs(lastContraction?.intervalSeconds)}
          </Text>
          <Text style={[styles.contractionStatLabel, { textAlign: 'center' }]}>{t('tracker.interval')}</Text>
        </View>
        <View style={styles.contractionStat}>
          <Text style={[styles.contractionStatValue, { textAlign: 'center' }]}>
            {avgInterval !== null ? formatSecs(avgInterval) : '—'}
          </Text>
          <Text style={[styles.contractionStatLabel, { textAlign: 'center' }]}>{t('tracker.avgInterval')}</Text>
        </View>
      </View>

      {/* 5-1-1 Alert */}
      {has511 && (
        <View style={[styles.alertCard, styles.alertRed]}>
          <Text style={[styles.alertText, { textAlign: 'center', color: '#CC6666' }]}>
            🏥 {t('tracker.hospitalAlert')}
          </Text>
        </View>
      )}

      {/* Contraction Log */}
      {contractions.length > 0 && (
        <View style={styles.historyCard}>
          <View style={[{ flexDirection: isRTL ? 'row-reverse' : 'row' }, styles.historyTitleRow]}>
            <Text style={[styles.historyTitle, { textAlign, flex: 1 }]}>{t('tracker.contractionLog')}</Text>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  '',
                  isRTL ? 'למחוק את כל הצירים?' : 'Clear all contractions?',
                  [
                    { text: isRTL ? 'ביטול' : 'Cancel', style: 'cancel' },
                    { text: isRTL ? 'מחק' : 'Clear', style: 'destructive', onPress: clearContractions },
                  ]
                );
              }}
              accessibilityLabel="Clear contraction log"
            >
              <Ionicons name="trash-outline" size={18} color="#E8A598" />
            </TouchableOpacity>
          </View>

          {contractions.slice(-10).reverse().map((c, idx) => (
            <View
              key={c.id}
              style={[styles.contractionLogRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}
            >
              <Text style={[styles.contractionLogNum, { textAlign }]}>#{contractions.length - idx}</Text>
              <Text style={[styles.contractionLogTime, { textAlign }]}>
                {format(new Date(c.startTime), 'HH:mm:ss')}
              </Text>
              <Text style={[styles.contractionLogDur, { textAlign }]}>
                {c.durationSeconds !== undefined ? formatSecs(c.durationSeconds) : '—'}
              </Text>
              {c.intervalSeconds !== undefined && (
                <Text style={[styles.contractionLogInt, { textAlign }]}>
                  +{formatSecs(c.intervalSeconds)}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

// ─── Weight Tracker ────────────────────────────────────────────────────────

function WeightTracker({ t, isRTL }: { t: (k: string) => string; isRTL: boolean }) {
  const weights = usePregnancyStore((s) => s.weights);
  const profile = usePregnancyStore((s) => s.profile);
  const addWeight = usePregnancyStore((s) => s.addWeight);
  const [weightInput, setWeightInput] = useState('');
  const [bellyInput, setBellyInput] = useState('');
  const [bpInput, setBpInput] = useState('');
  const textAlign = isRTL ? 'right' : 'left';

  async function handleSave() {
    if (!weightInput) return;
    const w = parseFloat(weightInput);
    if (isNaN(w)) return;
    await addWeight({
      date: new Date().toISOString(),
      weightKg: w,
      bellyCircumferenceCm: bellyInput ? parseFloat(bellyInput) : undefined,
      bloodPressure: bpInput || undefined,
    });
    setWeightInput('');
    setBellyInput('');
    setBpInput('');
  }

  const preWeight = profile.prePregnancyWeightKg;
  const latestWeight = weights.length > 0 ? weights[weights.length - 1].weightKg : null;
  const gained = preWeight && latestWeight ? (latestWeight - preWeight).toFixed(1) : null;

  return (
    <ScrollView contentContainerStyle={styles.trackerContent} showsVerticalScrollIndicator={false}>
      {/* Log Form */}
      <View style={styles.weightFormCard}>
        <Text style={[styles.weightFormTitle, { textAlign }]}>{t('tracker.logWeight')}</Text>

        <Text style={[styles.weightLabel, { textAlign }]}>{t('tracker.weightKg')}</Text>
        <TextInput
          style={[styles.weightInput, { textAlign }]}
          placeholder="70.5"
          placeholderTextColor="#B8A0A0"
          value={weightInput}
          onChangeText={setWeightInput}
          keyboardType="decimal-pad"
          accessibilityLabel="Weight in kilograms"
        />

        <Text style={[styles.weightLabel, { textAlign }]}>{t('tracker.bellyCircumference')}</Text>
        <TextInput
          style={[styles.weightInput, { textAlign }]}
          placeholder="95"
          placeholderTextColor="#B8A0A0"
          value={bellyInput}
          onChangeText={setBellyInput}
          keyboardType="decimal-pad"
          accessibilityLabel="Belly circumference in centimeters"
        />

        <Text style={[styles.weightLabel, { textAlign }]}>{t('tracker.bloodPressure')}</Text>
        <TextInput
          style={[styles.weightInput, { textAlign }]}
          placeholder="120/80"
          placeholderTextColor="#B8A0A0"
          value={bpInput}
          onChangeText={setBpInput}
          accessibilityLabel="Blood pressure reading"
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          accessibilityLabel="Save weight entry"
        >
          <Text style={styles.saveButtonText}>{t('tracker.save')}</Text>
        </TouchableOpacity>
      </View>

      {/* Summary */}
      {gained !== null && (
        <View style={styles.gainSummaryCard}>
          <Text style={[styles.gainLabel, { textAlign: 'center' }]}>{t('tracker.recommendedGain')}</Text>
          <Text style={[styles.gainValue, { textAlign: 'center' }]}>
            +{gained} kg
          </Text>
          <Text style={[styles.gainNote, { textAlign: 'center' }]}>
            {isRTL ? 'עלייה מומלצת: 11-16 ק"ג' : 'Recommended gain: 11-16 kg'}
          </Text>
        </View>
      )}

      {/* Weight History */}
      {weights.length > 0 ? (
        <View style={styles.historyCard}>
          <Text style={[styles.historyTitle, { textAlign }]}>{t('tracker.weightHistory')}</Text>
          {weights.slice(-10).reverse().map((entry) => (
            <View
              key={entry.id}
              style={[styles.weightHistoryRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}
            >
              <Text style={[styles.weightHistoryDate, { textAlign }]}>
                {format(new Date(entry.date), 'dd/MM/yyyy')}
              </Text>
              <Text style={[styles.weightHistoryKg, { textAlign }]}>
                {entry.weightKg} kg
              </Text>
              {entry.bellyCircumferenceCm && (
                <Text style={[styles.weightHistoryBelly, { textAlign }]}>
                  ⊙ {entry.bellyCircumferenceCm} cm
                </Text>
              )}
              {entry.bloodPressure && (
                <Text style={[styles.weightHistoryBP, { textAlign }]}>
                  ♥ {entry.bloodPressure}
                </Text>
              )}
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.noDataCard}>
          <Text style={[styles.noDataText, { textAlign: 'center' }]}>{t('tracker.noData')}</Text>
        </View>
      )}
    </ScrollView>
  );
}

// ─── Main Tracker Screen ──────────────────────────────────────────────────────

export default function TrackerScreen() {
  const { t, isRTL, language } = useI18n();
  const [activeTab, setActiveTab] = useState<TrackerTab>('kicks');

  const tabs: { key: TrackerTab; label: string; emoji: string }[] = [
    { key: 'kicks', label: t('tracker.kicks'), emoji: '🦵' },
    { key: 'contractions', label: t('tracker.contractions'), emoji: '⏱️' },
    { key: 'weight', label: t('tracker.weight'), emoji: '⚖️' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.screenTitle, { textAlign: isRTL ? 'right' : 'left' }]}>
          {t('tracker.title')}
        </Text>
      </View>

      {/* Tabs */}
      <View style={[styles.tabsRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
            accessibilityLabel={tab.label}
          >
            <Text style={styles.tabEmoji}>{tab.emoji}</Text>
            <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {activeTab === 'kicks' && <KickCounter t={t} isRTL={isRTL} language={language} />}
      {activeTab === 'contractions' && <ContractionTimer t={t} isRTL={isRTL} />}
      {activeTab === 'weight' && <WeightTracker t={t} isRTL={isRTL} />}
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
  tabsRow: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#F0DED8',
  },
  tabActive: {
    backgroundColor: '#E8A598',
    borderColor: '#E8A598',
  },
  tabEmoji: {
    fontSize: 18,
    marginBottom: 2,
  },
  tabText: {
    fontSize: 11,
    fontFamily: 'Nunito_600SemiBold',
    color: '#7A5C5C',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  trackerContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    alignItems: 'center',
  },
  // Kick Counter
  kickButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#E8A598',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: '#E8A598',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  kickButtonGoal: {
    backgroundColor: '#A8C5A0',
    shadowColor: '#A8C5A0',
  },
  kickButtonEmoji: {
    fontSize: 40,
    marginBottom: 4,
  },
  kickButtonLabel: {
    fontSize: 12,
    fontFamily: 'Nunito_600SemiBold',
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 8,
  },
  kickCountNumber: {
    fontSize: 52,
    fontFamily: 'Nunito_700Bold',
    color: '#FFFFFF',
    lineHeight: 56,
  },
  kickCountLabel: {
    fontSize: 14,
    fontFamily: 'Nunito_600SemiBold',
    color: 'rgba(255,255,255,0.85)',
  },
  kickInfoRow: {
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  kickInfoBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#F0DED8',
  },
  kickInfoValue: {
    fontSize: 18,
    fontFamily: 'Nunito_700Bold',
    color: '#E8A598',
    marginBottom: 4,
  },
  kickInfoLabel: {
    fontSize: 11,
    fontFamily: 'Nunito_400Regular',
    color: '#7A5C5C',
  },
  // Contraction Timer
  contractionButton: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    borderWidth: 4,
    borderColor: '#E8A598',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  contractionButtonActive: {
    backgroundColor: '#E8A598',
    borderColor: '#E8A598',
  },
  contractionButtonEmoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  contractionButtonLabel: {
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
    color: '#E8A598',
  },
  contractionElapsed: {
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    color: '#FFFFFF',
    marginTop: 4,
  },
  contractionStatsRow: {
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  contractionStat: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#F0DED8',
    alignItems: 'center',
  },
  contractionStatValue: {
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',
    color: '#E8A598',
    marginBottom: 4,
  },
  contractionStatLabel: {
    fontSize: 10,
    fontFamily: 'Nunito_400Regular',
    color: '#7A5C5C',
  },
  contractionLogRow: {
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: '#F0DED8',
    flexWrap: 'wrap',
    gap: 6,
  },
  contractionLogNum: {
    fontSize: 12,
    fontFamily: 'Nunito_700Bold',
    color: '#E8A598',
    width: 30,
  },
  contractionLogTime: {
    fontSize: 12,
    fontFamily: 'Nunito_400Regular',
    color: '#3D2C2C',
    width: 60,
  },
  contractionLogDur: {
    fontSize: 12,
    fontFamily: 'Nunito_400Regular',
    color: '#7A5C5C',
    flex: 1,
  },
  contractionLogInt: {
    fontSize: 11,
    fontFamily: 'Nunito_400Regular',
    color: '#B8A0A0',
  },
  // Weight
  weightFormCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0DED8',
  },
  weightFormTitle: {
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
    color: '#3D2C2C',
    marginBottom: 14,
  },
  weightLabel: {
    fontSize: 13,
    fontFamily: 'Nunito_600SemiBold',
    color: '#7A5C5C',
    marginBottom: 6,
  },
  weightInput: {
    backgroundColor: '#FDF6F0',
    borderWidth: 1.5,
    borderColor: '#F0DED8',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    fontSize: 15,
    fontFamily: 'Nunito_400Regular',
    color: '#3D2C2C',
    marginBottom: 12,
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#E8A598',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
    color: '#FFFFFF',
  },
  gainSummaryCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0DED8',
    alignItems: 'center',
  },
  gainLabel: {
    fontSize: 13,
    fontFamily: 'Nunito_600SemiBold',
    color: '#7A5C5C',
    marginBottom: 4,
  },
  gainValue: {
    fontSize: 32,
    fontFamily: 'Nunito_700Bold',
    color: '#E8A598',
    marginBottom: 4,
  },
  gainNote: {
    fontSize: 12,
    fontFamily: 'Nunito_400Regular',
    color: '#B8A0A0',
  },
  weightHistoryRow: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0DED8',
    flexWrap: 'wrap',
    gap: 6,
  },
  weightHistoryDate: {
    fontSize: 13,
    fontFamily: 'Nunito_400Regular',
    color: '#7A5C5C',
    width: 80,
  },
  weightHistoryKg: {
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',
    color: '#E8A598',
    width: 60,
  },
  weightHistoryBelly: {
    fontSize: 12,
    fontFamily: 'Nunito_400Regular',
    color: '#7A5C5C',
  },
  weightHistoryBP: {
    fontSize: 12,
    fontFamily: 'Nunito_400Regular',
    color: '#7A5C5C',
  },
  // Shared
  alertCard: {
    width: '100%',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  alertGreen: {
    backgroundColor: '#F0F7EF',
    borderWidth: 1,
    borderColor: '#A8C5A0',
  },
  alertOrange: {
    backgroundColor: '#FFF8EC',
    borderWidth: 1,
    borderColor: '#F4C87A',
  },
  alertRed: {
    backgroundColor: '#FFF0F0',
    borderWidth: 1,
    borderColor: '#E88080',
  },
  alertText: {
    fontSize: 14,
    fontFamily: 'Nunito_600SemiBold',
    lineHeight: 20,
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#E8A598',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 16,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontFamily: 'Nunito_600SemiBold',
    color: '#E8A598',
  },
  historyCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#F0DED8',
    marginBottom: 16,
  },
  historyTitleRow: {
    alignItems: 'center',
    marginBottom: 8,
  },
  historyTitle: {
    fontSize: 15,
    fontFamily: 'Nunito_700Bold',
    color: '#3D2C2C',
    marginBottom: 8,
  },
  historyRow: {
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: '#F0DED8',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  historyDate: {
    fontSize: 13,
    fontFamily: 'Nunito_400Regular',
    color: '#7A5C5C',
  },
  historyValue: {
    fontSize: 13,
    fontFamily: 'Nunito_600SemiBold',
    color: '#3D2C2C',
  },
  noDataCard: {
    width: '100%',
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
    color: '#B8A0A0',
  },
});
