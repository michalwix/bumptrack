import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface WeightEntry {
  id: string;
  date: string;
  weightKg: number;
  bellyCircumferenceCm?: number;
  bloodPressure?: string;
}

export interface KickSession {
  id: string;
  date: string;
  kicks: number;
  durationMinutes: number;
  startTime: string;
}

export interface ContractionEntry {
  id: string;
  startTime: number;
  endTime?: number;
  durationSeconds?: number;
  intervalSeconds?: number;
}

export interface UserProfile {
  name: string;
  partnerName: string;
  lmpDate: string | null;
  dueDate: string | null;
  prePregnancyWeightKg: number | null;
  heightCm: number | null;
  language: 'he' | 'en';
  hasCompletedOnboarding: boolean;
}

export interface NotificationPreferences {
  weeklyUpdates: boolean;
  testReminders: boolean;
  dailyTips: boolean;
  kickReminders: boolean;
}

export interface ChecklistState {
  [itemId: string]: boolean;
}

interface PregnancyState {
  profile: UserProfile;
  weights: WeightEntry[];
  kicks: KickSession[];
  contractions: ContractionEntry[];
  currentContractionStart: number | null;
  checklistState: ChecklistState;
  notifications: NotificationPreferences;

  // Actions
  setProfile: (profile: Partial<UserProfile>) => Promise<void>;
  addWeight: (entry: Omit<WeightEntry, 'id'>) => Promise<void>;
  addKickSession: (session: Omit<KickSession, 'id'>) => Promise<void>;
  startContraction: () => void;
  stopContraction: () => void;
  clearContractions: () => Promise<void>;
  toggleChecklistItem: (itemId: string) => Promise<void>;
  setNotificationPreference: (key: keyof NotificationPreferences, value: boolean) => Promise<void>;
  loadFromStorage: () => Promise<void>;
  resetAllData: () => Promise<void>;
}

const defaultProfile: UserProfile = {
  name: '',
  partnerName: '',
  lmpDate: null,
  dueDate: null,
  prePregnancyWeightKg: null,
  heightCm: null,
  language: 'he',
  hasCompletedOnboarding: false,
};

export const usePregnancyStore = create<PregnancyState>((set, get) => ({
  profile: defaultProfile,
  weights: [],
  kicks: [],
  contractions: [],
  currentContractionStart: null,
  checklistState: {},
  notifications: {
    weeklyUpdates: true,
    testReminders: true,
    dailyTips: false,
    kickReminders: true,
  },

  setProfile: async (updates) => {
    const newProfile = { ...get().profile, ...updates };
    set({ profile: newProfile });
    await AsyncStorage.setItem('pregnancy:profile', JSON.stringify(newProfile));
  },

  addWeight: async (entry) => {
    const id = Date.now().toString();
    const newEntry: WeightEntry = { ...entry, id };
    const weights = [...get().weights, newEntry];
    set({ weights });
    await AsyncStorage.setItem('pregnancy:weights', JSON.stringify(weights));
  },

  addKickSession: async (session) => {
    const id = Date.now().toString();
    const newSession: KickSession = { ...session, id };
    const kicks = [newSession, ...get().kicks].slice(0, 30);
    set({ kicks });
    await AsyncStorage.setItem('pregnancy:kicks', JSON.stringify(kicks));
  },

  startContraction: () => {
    set({ currentContractionStart: Date.now() });
  },

  stopContraction: () => {
    const { currentContractionStart, contractions } = get();
    if (!currentContractionStart) return;

    const endTime = Date.now();
    const durationSeconds = Math.round((endTime - currentContractionStart) / 1000);
    const lastContraction = contractions[contractions.length - 1];
    const intervalSeconds = lastContraction?.endTime
      ? Math.round((currentContractionStart - lastContraction.endTime) / 1000)
      : undefined;

    const newContraction: ContractionEntry = {
      id: Date.now().toString(),
      startTime: currentContractionStart,
      endTime,
      durationSeconds,
      intervalSeconds,
    };

    const updated = [...contractions, newContraction].slice(-20);
    set({ contractions: updated, currentContractionStart: null });
    AsyncStorage.setItem('pregnancy:contractions', JSON.stringify(updated));
  },

  clearContractions: async () => {
    set({ contractions: [], currentContractionStart: null });
    await AsyncStorage.removeItem('pregnancy:contractions');
  },

  toggleChecklistItem: async (itemId) => {
    const current = get().checklistState;
    const updated = { ...current, [itemId]: !current[itemId] };
    set({ checklistState: updated });
    await AsyncStorage.setItem('pregnancy:checklist', JSON.stringify(updated));
  },

  setNotificationPreference: async (key, value) => {
    const updated = { ...get().notifications, [key]: value };
    set({ notifications: updated });
    await AsyncStorage.setItem('pregnancy:notifications', JSON.stringify(updated));
  },

  loadFromStorage: async () => {
    try {
      const [profileStr, weightsStr, kicksStr, contractionsStr, checklistStr, notifStr] =
        await Promise.all([
          AsyncStorage.getItem('pregnancy:profile'),
          AsyncStorage.getItem('pregnancy:weights'),
          AsyncStorage.getItem('pregnancy:kicks'),
          AsyncStorage.getItem('pregnancy:contractions'),
          AsyncStorage.getItem('pregnancy:checklist'),
          AsyncStorage.getItem('pregnancy:notifications'),
        ]);

      if (profileStr) set({ profile: JSON.parse(profileStr) });
      if (weightsStr) set({ weights: JSON.parse(weightsStr) });
      if (kicksStr) set({ kicks: JSON.parse(kicksStr) });
      if (contractionsStr) set({ contractions: JSON.parse(contractionsStr) });
      if (checklistStr) set({ checklistState: JSON.parse(checklistStr) });
      if (notifStr) set({ notifications: JSON.parse(notifStr) });
    } catch (e) {
      console.error('Failed to load from storage', e);
    }
  },

  resetAllData: async () => {
    await AsyncStorage.multiRemove([
      'pregnancy:profile',
      'pregnancy:weights',
      'pregnancy:kicks',
      'pregnancy:contractions',
      'pregnancy:checklist',
      'pregnancy:notifications',
    ]);
    set({
      profile: defaultProfile,
      weights: [],
      kicks: [],
      contractions: [],
      currentContractionStart: null,
      checklistState: {},
      notifications: {
        weeklyUpdates: true,
        testReminders: true,
        dailyTips: false,
        kickReminders: true,
      },
    });
  },
}));
