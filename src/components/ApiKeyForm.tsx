import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useApiKeys } from '@/hooks/use-api-keys';
import { Loader2 } from 'lucide-react';

interface Field {
  name: string;
  label: string;
  placeholder: string;
  description: string;
}

interface ApiKeyFormProps {
  type: 'openai' | 'twilio';
  showKeys: boolean;
  fields: Field[];
}

export function ApiKeyForm({ type, showKeys, fields }: ApiKeyFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { getKeys, setKeys } = useApiKeys();
  const currentKeys = getKeys(type);

  // Dynamically create schema based on fields
  const schemaFields = fields.reduce((acc, field) => {
    acc[field.name] = z.string().min(1, `${field.label} is required`);
    return acc;
  }, {} as Record<string, z.ZodString>);

  const formSchema = z.object(schemaFields);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: currentKeys || {},
  });

  async function testConnection(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      
      // Test OpenAI connection
      if (type === 'openai') {
        const response = await fetch('/api/test-openai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ apiKey: values.apiKey }),
        });
        
        if (!response.ok) throw new Error('Failed to connect to OpenAI');
      }
      
      // Test Twilio connection
      if (type === 'twilio') {
        const response = await fetch('/api/test-twilio', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accountSid: values.accountSid,
            authToken: values.authToken,
          }),
        });
        
        if (!response.ok) throw new Error('Failed to connect to Twilio');
      }

      toast({
        title: "Connection successful",
        description: `Successfully connected to ${type === 'openai' ? 'OpenAI' : 'Twilio'} API`,
      });

      // Save the keys
      setKeys(type, values);
      
    } catch (error) {
      toast({
        title: "Connection failed",
        description: error instanceof Error ? error.message : "Failed to test connection",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(testConnection)} className="space-y-6">
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input
                    {...formField}
                    type={showKeys ? "text" : "password"}
                    placeholder={field.placeholder}
                  />
                </FormControl>
                <FormDescription>{field.description}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Testing Connection..." : "Test & Save Connection"}
        </Button>
      </form>
    </Form>
  );
}
