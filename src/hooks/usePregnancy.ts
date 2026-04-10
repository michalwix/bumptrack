import { useMemo } from 'react';
import { usePregnancyStore } from '../store/pregnancyStore';
import {
  calculateCurrentWeek,
  calculateCurrentDay,
  getDaysUntilDueDate,
  getTrimester,
} from '../utils/dateCalculations';
import { getFetalSizeForWeek } from '../data/fetalSizes';
import { weeklyData } from '../data/weeklyData';

export function usePregnancy() {
  const profile = usePregnancyStore((s) => s.profile);

  const lmpDate = useMemo(
    () => (profile.lmpDate ? new Date(profile.lmpDate) : null),
    [profile.lmpDate]
  );

  const dueDate = useMemo(
    () => (profile.dueDate ? new Date(profile.dueDate) : null),
    [profile.dueDate]
  );

  const currentWeek = useMemo(
    () => (lmpDate ? calculateCurrentWeek(lmpDate) : 0),
    [lmpDate]
  );

  const currentDay = useMemo(
    () => (lmpDate ? calculateCurrentDay(lmpDate) : 0),
    [lmpDate]
  );

  const daysUntilDue = useMemo(
    () => (dueDate ? getDaysUntilDueDate(dueDate) : null),
    [dueDate]
  );

  const trimester = useMemo(
    () => (currentWeek > 0 ? getTrimester(currentWeek) : 1),
    [currentWeek]
  );

  const fetalSize = useMemo(
    () => getFetalSizeForWeek(Math.min(Math.max(currentWeek, 4), 40)),
    [currentWeek]
  );

  const weekData = useMemo(
    () => weeklyData.find((w) => w.week === currentWeek) ?? null,
    [currentWeek]
  );

  return {
    profile,
    lmpDate,
    dueDate,
    currentWeek,
    currentDay,
    daysUntilDue,
    trimester,
    fetalSize,
    weekData,
    isSetup: !!lmpDate && !!dueDate,
  };
}
