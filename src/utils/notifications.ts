import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { addDays } from 'date-fns';
import i18n from '../i18n';
import { calculateCurrentWeek } from './dateCalculations';

const isNative = Platform.OS !== 'web';

if (isNative) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

export async function requestNotificationPermissions(): Promise<boolean> {
  if (!isNative) return false;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  return finalStatus === 'granted';
}

export async function scheduleWeeklyNotifications(lmpDate: Date): Promise<void> {
  if (!isNative) return;
  await Notifications.cancelAllScheduledNotificationsAsync();

  const currentWeek = calculateCurrentWeek(lmpDate);

  for (let week = currentWeek; week <= 40; week++) {
    const weekStartDate = addDays(lmpDate, (week - 1) * 7);
    if (weekStartDate > new Date()) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: i18n.t('notifications.newWeek.title', { week }),
          body: i18n.t('notifications.newWeek.body', { week }),
          sound: true,
        },
        trigger: {
          date: weekStartDate,
        },
      });
    }
  }

  // Milestone notifications
  const milestones = [
    { week: 14, key: 'trimester2' },
    { week: 20, key: 'anatomyScan' },
    { week: 28, key: 'trimester3' },
    { week: 37, key: 'fullTerm' },
  ];

  for (const milestone of milestones) {
    if (milestone.week > currentWeek) {
      const milestoneDate = addDays(lmpDate, (milestone.week - 1) * 7);
      await Notifications.scheduleNotificationAsync({
        content: {
          title: i18n.t('app.name'),
          body: i18n.t(`notifications.milestone.${milestone.key}`),
          sound: true,
        },
        trigger: { date: milestoneDate },
      });
    }
  }
}

export async function scheduleKickCountReminders(lmpDate: Date): Promise<void> {
  if (!isNative) return;
  const currentWeek = calculateCurrentWeek(lmpDate);
  if (currentWeek < 28) return;

  // Daily 9pm reminder from week 28
  await Notifications.scheduleNotificationAsync({
    content: {
      title: i18n.t('notifications.kickCount.title'),
      body: i18n.t('notifications.kickCount.body'),
      sound: true,
    },
    trigger: {
      hour: 21,
      minute: 0,
      repeats: true,
    },
  });
}
