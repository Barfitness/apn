import { Analytics } from '@/components/Analytics';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CallHistory } from './CallHistory';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Voice Agent Analytics</h1>
          <p className="text-sm text-muted-foreground">Connected</p>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="text-sm text-muted-foreground">
            Dec 1 - 9, 2024
          </div>
        </div>
      </div>

      <Tabs defaultValue="analytics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="calls" onClick={() => navigate('/calls')}>
            Call History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <Analytics />
        </TabsContent>

        <TabsContent value="calls">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Calls</h2>
            <ScrollArea className="h-[600px]">
              <CallHistory />
            </ScrollArea>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
