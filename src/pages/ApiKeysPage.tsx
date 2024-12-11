import { ThemeToggle } from '@/components/ThemeToggle';
import { Card } from '@/components/ui/card';
import { ApiKeyForm } from '@/components/ApiKeyForm';
import { useApiKeys } from '@/hooks/use-api-keys';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export function ApiKeysPage() {
  const [showKeys, setShowKeys] = useState(false);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">API Keys</h1>
          <p className="text-sm text-muted-foreground">Manage your API credentials</p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowKeys(!showKeys)}
            className="gap-2"
          >
            {showKeys ? (
              <>
                <EyeOff className="h-4 w-4" /> Hide Keys
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" /> Show Keys
              </>
            )}
          </Button>
          <ThemeToggle />
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">OpenAI Configuration</h2>
          <ApiKeyForm
            type="openai"
            showKeys={showKeys}
            fields={[
              {
                name: 'apiKey',
                label: 'API Key',
                placeholder: 'sk-...',
                description: 'Your OpenAI API key'
              }
            ]}
          />
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Twilio Configuration</h2>
          <ApiKeyForm
            type="twilio"
            showKeys={showKeys}
            fields={[
              {
                name: 'accountSid',
                label: 'Account SID',
                placeholder: 'AC...',
                description: 'Your Twilio Account SID'
              },
              {
                name: 'authToken',
                label: 'Auth Token',
                placeholder: 'Enter your auth token',
                description: 'Your Twilio Auth Token'
              }
            ]}
          />
        </Card>
      </div>
    </div>
  );
}
