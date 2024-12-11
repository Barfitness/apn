import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { useAssistants } from '@/hooks/use-assistants';
import { Badge } from '@/components/ui/badge';
import { EditAssistantDialog } from './EditAssistantDialog';
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

export function AssistantsList() {
  const { assistants, removeAssistant } = useAssistants();
  const [editingAssistant, setEditingAssistant] = useState<any>(null);
  const [deletingAssistant, setDeletingAssistant] = useState<any>(null);

  if (assistants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
        <p>No assistants created yet</p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Voice</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Instructions</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assistants.map((assistant) => (
            <TableRow key={assistant.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {assistant.name}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{assistant.voice}</Badge>
              </TableCell>
              <TableCell>
                {formatDistanceToNow(new Date(assistant.createdAt), { addSuffix: true })}
              </TableCell>
              <TableCell className="max-w-[300px] truncate">
                {assistant.instructions}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingAssistant(assistant)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeletingAssistant(assistant)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingAssistant && (
        <EditAssistantDialog
          assistant={editingAssistant}
          open={!!editingAssistant}
          onOpenChange={() => setEditingAssistant(null)}
        />
      )}

      <AlertDialog 
        open={!!deletingAssistant} 
        onOpenChange={() => setDeletingAssistant(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the assistant. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deletingAssistant) {
                  removeAssistant(deletingAssistant.id);
                  setDeletingAssistant(null);
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
