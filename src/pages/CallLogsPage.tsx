import { ThemeToggle } from '@/components/ThemeToggle';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CallHistory } from '@/components/CallHistory';

export function CallLogsPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Call Logs</h1>
          <p className="text-sm text-muted-foreground">View your call history</p>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="text-sm text-muted-foreground">
            Last 30 days
          </div>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Calls</h2>
          <div className="flex gap-2">
            {/* Add any additional controls here */}
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-280px)]">
          <CallHistory />
        </ScrollArea>
      </Card>
    </div>
  );
}
