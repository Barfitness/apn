import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useContacts } from '@/hooks/use-contacts';
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';

interface ImportContactsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImportContactsDialog({
  open,
  onOpenChange,
}: ImportContactsDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { addContacts } = useContacts();
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const text = await file.text();
      const rows = text.split('\n');
      const headers = rows[0].split(',');
      
      const contacts = rows.slice(1).map((row) => {
        const values = row.split(',');
        const contact: any = {
          id: crypto.randomUUID(),
          createdAt: new Date(),
        };
        
        headers.forEach((header, index) => {
          contact[header.trim().toLowerCase()] = values[index]?.trim() || '';
        });
        
        return contact;
      });

      addContacts(contacts);

      toast({
        title: 'Contacts imported',
        description: `Successfully imported ${contacts.length} contacts.`,
      });

      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to import contacts. Please check your CSV file format.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import Contacts</DialogTitle>
          <DialogDescription>
            Upload a CSV file to import contacts. The file should include columns for name,
            company, category, phone, and address.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Input
              id="file-upload"
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              disabled={isLoading}
            />
            <p className="text-sm text-muted-foreground">
              Download our{" "}
              <a
                href="/template.csv"
                className="text-primary underline-offset-4 hover:underline"
              >
                template CSV file
              </a>{" "}
              to see the required format.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button disabled={isLoading}>
            {isLoading ? (
              "Importing..."
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Import Contacts
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
