import { useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Card } from '@/components/ui/card';
import { ContactsList } from '@/components/contacts/ContactsList';
import { ContactsToolbar } from '@/components/contacts/ContactsToolbar';
import { CreateContactDialog } from '@/components/contacts/CreateContactDialog';
import { ImportContactsDialog } from '@/components/contacts/ImportContactsDialog';
import { useContacts } from '@/hooks/use-contacts';
import { exportToCSV } from '@/lib/export-utils';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export function ContactsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { contacts } = useContacts();
  const { toast } = useToast();

  const handleBulkDelete = () => {
    removeContacts(selectedContacts);
    setSelectedContacts([]);
  };

  const handleExport = () => {
    try {
      const contactsToExport = selectedContacts.length > 0
        ? contacts.filter(contact => selectedContacts.includes(contact.id))
        : contacts;

      if (contactsToExport.length === 0) {
        toast({
          title: "No contacts to export",
          description: "Please select contacts or make sure you have contacts to export.",
          variant: "destructive",
        });
        return;
      }

      const timestamp = format(new Date(), 'yyyy-MM-dd-HHmm');
      const filename = `contacts-${timestamp}.csv`;
      
      exportToCSV(contactsToExport, filename);

      toast({
        title: "Export successful",
        description: `${contactsToExport.length} contacts exported to ${filename}`,
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting the contacts.",
        variant: "destructive",
      });
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      contact.name.toLowerCase().includes(searchTerm) ||
      contact.company.toLowerCase().includes(searchTerm) ||
      contact.category.toLowerCase().includes(searchTerm) ||
      contact.phone.includes(searchTerm)
    );
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Contacts</h1>
          <p className="text-sm text-muted-foreground">
            {contacts.length} total contacts
          </p>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>

      <Card className="p-6">
        <ContactsToolbar
          onCreateNew={() => setIsCreateDialogOpen(true)}
          onImport={() => setIsImportDialogOpen(true)}
          onExport={handleExport}
          onBulkDelete={handleBulkDelete}
          selectedCount={selectedContacts.length}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <div className="mt-6">
          <ContactsList
            contacts={filteredContacts}
            selectedContacts={selectedContacts}
            onSelectionChange={setSelectedContacts}
          />
        </div>
      </Card>

      <CreateContactDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
      />

      <ImportContactsDialog
        open={isImportDialogOpen}
        onOpenChange={setIsImportDialogOpen}
      />
    </div>
  );
}
