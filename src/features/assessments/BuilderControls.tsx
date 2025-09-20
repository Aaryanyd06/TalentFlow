"use client";

import { useAssessmentBuilderStore } from "@/store/assessmentBuilderStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { QuestionType } from "@/types";
import { FileText, ListChecks, Plus, Text, Type, Hash, Trash2, X } from "lucide-react";

const QUESTION_TYPES: { type: QuestionType, label: string, icon: React.ReactNode }[] = [
  { type: "short-text", label: "Short Text", icon: <Type className="h-4 w-4 mr-2" /> },
  { type: "long-text", label: "Long Text", icon: <FileText className="h-4 w-4 mr-2" /> },
  { type: "single-choice", label: "Single Choice", icon: <ListChecks className="h-4 w-4 mr-2" /> },
  { type: "numeric", label: "Numeric", icon: <Hash className="h-4 w-4 mr-2" /> },
];

export function BuilderControls() {
  const store = useAssessmentBuilderStore();

  return (
    <div className="bg-card rounded-lg border h-full flex flex-col">
      <div className="p-4 font-semibold border-b">Controls</div>
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        <Accordion type="multiple" defaultValue={store.assessment.sections.map(s => s.id)}>
          {store.assessment.sections.map((section) => (
            <AccordionItem key={section.id} value={section.id}>
              <div className="flex items-center">
                <AccordionTrigger className="flex-grow">
                  <Input
                    value={section.title}
                    onChange={(e) => store.updateSectionTitle(section.id, e.target.value)}
                    className="text-md font-semibold border-none focus-visible:ring-1 bg-transparent"
                  />
                </AccordionTrigger>
                <Button variant="ghost" size="icon" onClick={() => store.removeSection(section.id)}>
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
              <AccordionContent>
                <div className="space-y-3">
                  {section.questions.map((q) => (
                    <div key={q.id} className="p-3 rounded-md border bg-background space-y-3">
                      <div className="flex items-center gap-2">
                        <Input
                          value={q.label}
                          onChange={(e) => store.updateQuestionLabel(section.id, q.id, e.target.value)}
                          className="flex-grow bg-transparent border-none focus-visible:ring-0"
                        />
                        <span className="text-xs text-muted-foreground">({q.type})</span>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => store.removeQuestion(section.id, q.id)}>
                          <Trash2 className="h-3 w-3 text-muted-foreground" />
                        </Button>
                      </div>

                      {q.type === 'single-choice' && (
                        <div className="space-y-2 border-t pt-3">
                           <Label className="text-xs text-muted-foreground">Options</Label>
                           {q.options?.map((opt, optIndex) => (
                             <div key={optIndex} className="flex items-center gap-2">
                               <Input
                                 value={opt}
                                 onChange={(e) => store.updateQuestionOption(section.id, q.id, optIndex, e.target.value)}
                                 className="h-8"
                               />
                               <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => store.removeQuestionOption(section.id, q.id, optIndex)}>
                                 <X className="h-3 w-3" />
                               </Button>
                             </div>
                           ))}
                           <Button variant="outline" size="sm" className="w-full" onClick={() => store.addQuestionOption(section.id, q.id)}>Add Option</Button>
                        </div>
                      )}

                      {q.type === 'numeric' && (
                        <div className="flex items-center gap-4 border-t pt-3">
                          <div className="space-y-1.5">
                            <Label htmlFor={`min-${q.id}`} className="text-xs text-muted-foreground">Min Value</Label>
                            <Input id={`min-${q.id}`} type="number" value={q.min ?? ''} onChange={(e) => store.updateQuestionNumericRange(section.id, q.id, 'min', parseInt(e.target.value))} className="h-8" />
                          </div>
                           <div className="space-y-1.5">
                            <Label htmlFor={`max-${q.id}`} className="text-xs text-muted-foreground">Max Value</Label>
                            <Input id={`max-${q.id}`} type="number" value={q.max ?? ''} onChange={(e) => store.updateQuestionNumericRange(section.id, q.id, 'max', parseInt(e.target.value))} className="h-8" />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-2 border-t pt-3">
                        <Switch
                          id={`required-${q.id}`}
                          checked={q.isRequired}
                          onCheckedChange={() => store.toggleQuestionRequired(section.id, q.id)}
                        />
                        <Label htmlFor={`required-${q.id}`}>Required</Label>
                      </div>
                    </div>
                  ))}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full mt-2">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Question
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {QUESTION_TYPES.map(qType => (
                         <DropdownMenuItem key={qType.type} onSelect={() => store.addQuestion(section.id, qType.type)}>
                           {qType.icon} {qType.label}
                         </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Button variant="secondary" onClick={store.addSection} className="w-full">
          Add New Section
        </Button>
      </div>
    </div>
  );
}