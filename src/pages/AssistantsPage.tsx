import { useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { AssistantsList } from '@/components/AssistantsList';
import { CreateAssistantDialog } from '@/components/CreateAssistantDialog';

export function AssistantsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">AI Assistants</h1>
          <p className="text-sm text-muted-foreground">Manage your AI assistants</p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Create Assistant
          </Button>
          <ThemeToggle />
        </div>
      </div>

      <Card className="p-6">
        <ScrollArea className="h-[calc(100vh-280px)]">
          <AssistantsList />
        </ScrollArea>
      </Card>

      <CreateAssistantDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}
