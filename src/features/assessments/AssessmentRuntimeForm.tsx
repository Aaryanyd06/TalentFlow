"use client";

import { useMemo } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAssessmentByJobId, submitAssessment } from "@/services/api";
import { useForm, type Control, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Assessment, AssessmentQuestion } from "@/types";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

function buildZodSchema(assessment: Assessment) {
  const schemaShape: Record<string, z.ZodTypeAny> = {};

  assessment.sections.forEach(section => {
    section.questions.forEach(question => {
      let rule: z.ZodString | z.ZodOptional<z.ZodString> = z.string();
      
      if (question.isRequired) {
        rule = rule.min(1, { message: "This field is required." });
      } else {
        rule = rule.optional();
      }

      if (question.type !== 'short-text' && question.type !== 'long-text' && question.type !== 'single-choice') {
         schemaShape[question.id] = z.any().optional();
      } else {
         schemaShape[question.id] = rule;
      }
    });
  });
  return z.object(schemaShape);
}

type QuestionRendererProps = {
  question: AssessmentQuestion;
  control: Control<FieldValues>;
};

function QuestionRenderer({ question, control }: QuestionRendererProps) {
  const labelContent = (
    <>
      {question.label}
      {question.isRequired && <span className="text-red-500 ml-1">*</span>}
    </>
  );

  switch (question.type) {
    case "short-text":
      return (
        <FormField control={control} name={question.id} render={({ field }) => (
          <FormItem><FormLabel>{labelContent}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
      );
    case "long-text":
       return (
        <FormField control={control} name={question.id} render={({ field }) => (
          <FormItem><FormLabel>{labelContent}</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
        )} />
      );
    case "single-choice":
       return (
        <FormField control={control} name={question.id} render={({ field }) => (
          <FormItem className="space-y-3"><FormLabel>{labelContent}</FormLabel><FormControl>
            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
              {(question.options ?? ['Option 1', 'Option 2']).map(opt => (
                 <FormItem key={opt} className="flex items-center space-x-3 space-y-0">
                   <FormControl><RadioGroupItem value={opt} /></FormControl>
                   <FormLabel className="font-normal">{opt}</FormLabel>
                 </FormItem>
              ))}
            </RadioGroup>
          </FormControl><FormMessage /></FormItem>
        )} />
      );
    default:
      return null;
  }
}

export function AssessmentRuntimeForm({ jobId }: { jobId: string }) {
  const { data: assessment, isLoading } = useQuery({
    queryKey: ["assessment", jobId],
    queryFn: () => getAssessmentByJobId(jobId),
  });

  // 👇 THIS IS THE ONLY LINE THAT CHANGED
  const validationSchema = useMemo(() => assessment ? buildZodSchema(assessment) : z.record(z.string(), z.any()), [assessment]);
  
  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  });

  const submitMutation = useMutation({
    mutationFn: (data: z.infer<typeof validationSchema>) => submitAssessment(jobId, data),
    onSuccess: () => {
      toast.success("Assessment submitted successfully!");
      form.reset();
    },
    onError: () => {
      toast.error("There was an error submitting your assessment.");
    }
  });

  if (isLoading) {
    return <div className="space-y-4"><Skeleton className="h-8 w-1/2" /><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /></div>;
  }
  if (!assessment) {
    return <div>Assessment not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto my-12 p-8 bg-white rounded-lg border">
      <h1 className="text-2xl font-bold mb-6">Assessment</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(data => submitMutation.mutate(data))} className="space-y-8">
          {assessment.sections.map(section => (
            <div key={section.id}>
              <h3 className="text-xl font-semibold mb-4 border-b pb-2">{section.title}</h3>
              <div className="space-y-6">
                {section.questions.map(q => <QuestionRenderer key={q.id} question={q} control={form.control} />)}
              </div>
            </div>
          ))}
          <Button type="submit" disabled={submitMutation.isPending}>
            {submitMutation.isPending ? "Submitting..." : "Submit Assessment"}
          </Button>
        </form>
      </Form>
    </div>
  );
}