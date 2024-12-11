import { create } from 'zustand';

interface CallState {
  isCallActive: boolean;
  currentCallSid: string | null;
  setCallActive: (active: boolean) => void;
  setCurrentCallSid: (sid: string | null) => void;
}

export const useCallStore = create<CallState>((set) => ({
  isCallActive: false,
  currentCallSid: null,
  setCallActive: (active) => set({ isCallActive: active }),
  setCurrentCallSid: (sid) => set({ currentCallSid: sid }),
}));

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
}));
