import { useState } from 'react';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Contact } from '@/types/contacts';
import { Badge } from '@/components/ui/badge';
import { EditContactDialog } from './EditContactDialog';
import { useContacts } from '@/hooks/use-contacts';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ContactsListProps {
  contacts: Contact[];
  selectedContacts: string[];
  onSelectionChange: (selectedIds: string[]) => void;
}

export function ContactsList({
  contacts,
  selectedContacts,
  onSelectionChange,
}: ContactsListProps) {
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [deletingContact, setDeletingContact] = useState<Contact | null>(null);
  const { removeContact } = useContacts();

  const toggleSelectAll = () => {
    if (selectedContacts.length === contacts.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(contacts.map(contact => contact.id));
    }
  };

  const toggleSelect = (contactId: string) => {
    if (selectedContacts.includes(contactId)) {
      onSelectionChange(selectedContacts.filter(id => id !== contactId));
    } else {
      onSelectionChange([...selectedContacts, contactId]);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedContacts.length === contacts.length && contacts.length > 0}
                onCheckedChange={toggleSelectAll}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>
                <Checkbox
                  checked={selectedContacts.includes(contact.id)}
                  onCheckedChange={() => toggleSelect(contact.id)}
                  aria-label={`Select ${contact.name}`}
                />
              </TableCell>
              <TableCell className="font-medium">{contact.name}</TableCell>
              <TableCell>{contact.company}</TableCell>
              <TableCell>
                <Badge variant="secondary">{contact.category}</Badge>
              </TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell className="max-w-[200px] truncate">
                {contact.address}
              </TableCell>
              <TableCell>
                {format(new Date(contact.createdAt), 'MMM d, yyyy')}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingContact(contact)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeletingContact(contact)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingContact && (
        <EditContactDialog
          contact={editingContact}
          open={!!editingContact}
          onOpenChange={() => setEditingContact(null)}
        />
      )}

      <AlertDialog open={!!deletingContact} onOpenChange={() => setDeletingContact(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the contact. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deletingContact) {
                  removeContact(deletingContact.id);
                  setDeletingContact(null);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
