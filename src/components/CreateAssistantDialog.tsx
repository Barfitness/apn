import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAssistants } from '@/hooks/use-assistants';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Assistant name must be at least 2 characters.",
  }),
  voice: z.string({
    required_error: "Please select a voice.",
  }),
  instructions: z.string().min(10, {
    message: "Instructions must be at least 10 characters.",
  }),
});

interface CreateAssistantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateAssistantDialog({ 
  open, 
  onOpenChange 
}: CreateAssistantDialogProps) {
  const { toast } = useToast();
  const { addAssistant } = useAssistants();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      voice: "",
      instructions: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      // Add the assistant to the store
      addAssistant({
        id: crypto.randomUUID(),
        ...values,
        createdAt: new Date(),
      });
      
      toast({
        title: "Assistant created",
        description: "Your new AI assistant has been created successfully.",
      });
      
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error creating the assistant.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create AI Assistant</DialogTitle>
          <DialogDescription>
            Create a new AI assistant with custom voice and instructions.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Assistant name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is how your assistant will be identified.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="voice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Voice</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a voice" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="alloy">Alloy</SelectItem>
                      <SelectItem value="echo">Echo</SelectItem>
                      <SelectItem value="fable">Fable</SelectItem>
                      <SelectItem value="onyx">Onyx</SelectItem>
                      <SelectItem value="nova">Nova</SelectItem>
                      <SelectItem value="shimmer">Shimmer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the voice for your AI assistant.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter detailed instructions for your assistant..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide specific instructions about how the assistant should behave and respond.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Assistant"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
