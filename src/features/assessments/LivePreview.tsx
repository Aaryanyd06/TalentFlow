"use client";

import { useAssessmentBuilderStore } from "@/store/assessmentBuilderStore";
import { useForm } from "react-hook-form";
import type { AssessmentQuestion } from "@/types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function QuestionRenderer({ question, control }: { question: AssessmentQuestion, control: any }) {
  const labelContent = (
    <>
      {question.label}
      {question.isRequired && <span className="text-red-500 ml-1">*</span>}
    </>
  );

  switch (question.type) {
    case "short-text":
      return (
        <FormField
          control={control}
          name={question.id}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{labelContent}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "long-text":
       return (
        <FormField
          control={control}
          name={question.id}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{labelContent}</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "single-choice":
       return (
        <FormField
          control={control}
          name={question.id}
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>{labelContent}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {(question.options ?? []).map(opt => (
                     <FormItem key={opt} className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                           <RadioGroupItem value={opt} />
                        </FormControl>
                        <FormLabel className="font-normal">{opt}</FormLabel>
                     </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "numeric":
      return (
        <FormField
          control={control}
          name={question.id}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{labelContent}</FormLabel>
              <FormControl>
                <Input type="number" min={question.min} max={question.max} {...field} onChange={event => field.onChange(+event.target.value)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    default:
      return (
        <div className="p-3 text-sm rounded-md bg-muted text-muted-foreground">
          Preview for "{question.type}" question not implemented yet.
        </div>
      );
  }
}

export function LivePreview() {
  const assessment = useAssessmentBuilderStore((state) => state.assessment);
  const form = useForm();

  return (
    <div className="bg-card rounded-lg border h-full flex flex-col">
      <div className="p-4 font-semibold border-b">Live Preview</div>
      <div className="flex-grow p-4 overflow-y-auto">
        <Form {...form}>
          <form className="space-y-6">
            {assessment.sections.map((section) => (
              <div key={section.id}>
                <h3 className="text-lg font-semibold mb-2 border-b pb-1">{section.title}</h3>
                <div className="space-y-4">
                  {section.questions.map((question) => (
                    <QuestionRenderer key={question.id} question={question} control={form.control} />
                  ))}
                </div>
              </div>
            ))}
          </form>
        </Form>
      </div>
    </div>
  );
}