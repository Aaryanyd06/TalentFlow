"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTimelineNote } from "@/services/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

export function AddNoteForm({ candidateId }: { candidateId: string }) {
  const queryClient = useQueryClient();
  const form = useForm({ defaultValues: { note: "" } });

  const mutation = useMutation({
    mutationFn: (note: string) => addTimelineNote(candidateId, note),
    onSuccess: () => {
      toast.success("Note added successfully.");
      queryClient.invalidateQueries({ queryKey: ["candidateTimeline", candidateId] });
      form.reset();
    },
    onError: () => {
      toast.error("Failed to add note.");
    },
  });

  const onSubmit = (data: { note: string }) => {
    if (data.note && data.note.trim()) {
      mutation.mutate(data.note);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-8">
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add a Note</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add a note... You can use @ to mention users."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Adding Note..." : "Add Note"}
        </Button>
      </form>
    </Form>
  );
}