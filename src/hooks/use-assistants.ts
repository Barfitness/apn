import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Assistant {
  id: string;
  name: string;
  voice: string;
  instructions: string;
  createdAt: Date;
}

interface AssistantsStore {
  assistants: Assistant[];
  addAssistant: (assistant: Assistant) => void;
  updateAssistant: (id: string, assistant: Partial<Assistant>) => void;
  removeAssistant: (id: string) => void;
}

export const useAssistants = create<AssistantsStore>()(
  persist(
    (set) => ({
      assistants: [],
      addAssistant: (assistant) =>
        set((state) => ({
          assistants: [...state.assistants, assistant],
        })),
      updateAssistant: (id, updatedAssistant) =>
        set((state) => ({
          assistants: state.assistants.map((assistant) =>
            assistant.id === id
              ? { ...assistant, ...updatedAssistant }
              : assistant
          ),
        })),
      removeAssistant: (id) =>
        set((state) => ({
          assistants: state.assistants.filter((assistant) => assistant.id !== id),
        })),
    }),
    {
      name: 'assistants-storage',
    }
  )
);
