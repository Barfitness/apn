import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ApiKeys {
  openai?: {
    apiKey: string;
  };
  twilio?: {
    accountSid: string;
    authToken: string;
  };
}

interface ApiKeysStore {
  keys: ApiKeys;
  getKeys: (type: keyof ApiKeys) => any;
  setKeys: (type: keyof ApiKeys, values: any) => void;
}

export const useApiKeys = create<ApiKeysStore>()(
  persist(
    (set, get) => ({
      keys: {},
      getKeys: (type) => get().keys[type],
      setKeys: (type, values) =>
        set((state) => ({
          keys: {
            ...state.keys,
            [type]: values,
          },
        })),
    }),
    {
      name: 'api-keys-storage',
    }
  )
);
