import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Contact } from '@/types/contacts';

interface ContactsStore {
  contacts: Contact[];
  addContact: (contact: Contact) => void;
  addContacts: (contacts: Contact[]) => void;
  updateContact: (id: string, contact: Partial<Contact>) => void;
  removeContact: (id: string) => void;
  removeContacts: (ids: string[]) => void;
}

export const useContacts = create<ContactsStore>()(
  persist(
    (set) => ({
      contacts: [],
      addContact: (contact) =>
        set((state) => ({
          contacts: [...state.contacts, contact],
        })),
      addContacts: (newContacts) =>
        set((state) => ({
          contacts: [...state.contacts, ...newContacts],
        })),
      updateContact: (id, updatedContact) =>
        set((state) => ({
          contacts: state.contacts.map((contact) =>
            contact.id === id
              ? { ...contact, ...updatedContact }
              : contact
          ),
        })),
      removeContact: (id) =>
        set((state) => ({
          contacts: state.contacts.filter((contact) => contact.id !== id),
        })),
      removeContacts: (ids) =>
        set((state) => ({
          contacts: state.contacts.filter(
            (contact) => !ids.includes(contact.id)
          ),
        })),
    }),
    {
      name: 'contacts-storage',
    }
  )
);
