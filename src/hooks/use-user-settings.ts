import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserSettings {
  name: string;
  email: string;
  avatarUrl: string;
}

interface UserSettingsStore {
  settings: UserSettings;
  updateSettings: (settings: Partial<UserSettings>) => void;
}

export const useUserSettings = create<UserSettingsStore>()(
  persist(
    (set) => ({
      settings: {
        name: 'test1111',
        email: '',
        avatarUrl: '',
      },
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: {
            ...state.settings,
            ...newSettings,
          },
        })),
    }),
    {
      name: 'user-settings-storage',
    }
  )
);
