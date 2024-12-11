import { useState } from 'react';
import { Phone, PhoneOff, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCallStore } from '@/lib/store';
import { initializeCall } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';

export function CallInterface() {
  const [isMuted, setIsMuted] = useState(false);
  const { isCallActive, setCallActive } = useCallStore();
  const { toast } = useToast();

  const handleCall = async () => {
    try {
      if (!isCallActive) {
        await initializeCall('+1234567890'); // Replace with actual phone input
        setCallActive(true);
        toast({
          title: 'Call Started',
          description: 'Connected to AI Assistant',
        });
      } else {
        setCallActive(false);
        toast({
          title: 'Call Ended',
          description: 'Disconnected from AI Assistant',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to initialize call',
        variant: 'destructive',
      });
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
      <div className="max-w-md mx-auto flex justify-center gap-4">
        <Button
          variant={isMuted ? 'destructive' : 'outline'}
          size="icon"
          onClick={toggleMute}
        >
          {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
        </Button>
        
        <Button
          variant={isCallActive ? 'destructive' : 'default'}
          size="icon"
          onClick={handleCall}
        >
          {isCallActive ? (
            <PhoneOff className="h-6 w-6" />
          ) : (
            <Phone className="h-6 w-6" />
          )}
        </Button>
      </div>
    </div>
  );
}
