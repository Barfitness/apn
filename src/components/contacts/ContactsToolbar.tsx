import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Download,
  Upload,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';

interface ContactsToolbarProps {
  onCreateNew: () => void;
  onImport: () => void;
  onExport: () => void;
  onBulkDelete: () => void;
  selectedCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function ContactsToolbar({
  onCreateNew,
  onImport,
  onExport,
  onBulkDelete,
  selectedCount,
  searchQuery,
  onSearchChange,
}: ContactsToolbarProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={onCreateNew} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Contact
          </Button>
          <Button variant="outline" onClick={onImport} className="gap-2">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" onClick={onExport} className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
        {selectedCount > 0 && (
          <Button
            variant="destructive"
            onClick={onBulkDelete}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete Selected ({selectedCount})
          </Button>
        )}
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
    </div>
  );
}
