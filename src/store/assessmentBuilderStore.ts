import { create } from "zustand";
import type { Assessment, AssessmentQuestion, AssessmentSection, QuestionType } from "@/types";

type AssessmentState = {
  assessment: Assessment;
  setAssessment: (assessment: Assessment) => void;
  addSection: () => void;
  updateSectionTitle: (sectionId: string, title: string) => void;
  removeSection: (sectionId: string) => void;
  addQuestion: (sectionId: string, type: QuestionType) => void;
  updateQuestionLabel: (sectionId: string, questionId: string, label: string) => void;
  removeQuestion: (sectionId: string, questionId: string) => void;
};

const createInitialState = (jobId: string): Assessment => ({
  id: crypto.randomUUID(),
  jobId: jobId,
  sections: [],
});

export const useAssessmentBuilderStore = create<AssessmentState>((set) => ({
  assessment: createInitialState("temp-job-id"),
  
  setAssessment: (assessment) => set({ assessment }),

  addSection: () =>
    set((state) => ({
      assessment: {
        ...state.assessment,
        sections: [
          ...state.assessment.sections,
          { id: crypto.randomUUID(), title: "New Section", questions: [] },
        ],
      },
    })),
  
  updateSectionTitle: (sectionId, title) =>
    set((state) => ({
      assessment: {
        ...state.assessment,
        sections: state.assessment.sections.map(s => 
          s.id === sectionId ? { ...s, title } : s
        ),
      },
    })),

  removeSection: (sectionId) =>
    set((state) => ({
      assessment: {
        ...state.assessment,
        sections: state.assessment.sections.filter(s => s.id !== sectionId),
      },
    })),

  addQuestion: (sectionId, type) =>
    set((state) => ({
      assessment: {
        ...state.assessment,
        sections: state.assessment.sections.map((section) => {
          if (section.id === sectionId) {
            const newQuestion: AssessmentQuestion = {
              id: crypto.randomUUID(), type, label: "New Question",
            };
            return { ...section, questions: [...section.questions, newQuestion] };
          }
          return section;
        }),
      },
    })),

  updateQuestionLabel: (sectionId, questionId, label) =>
    set((state) => ({
      assessment: {
        ...state.assessment,
        sections: state.assessment.sections.map(s => {
          if (s.id === sectionId) {
            return {
              ...s,
              questions: s.questions.map(q => 
                q.id === questionId ? { ...q, label } : q
              ),
            };
          }
          return s;
        }),
      },
    })),
    
  removeQuestion: (sectionId, questionId) =>
    set((state) => ({
      assessment: {
        ...state.assessment,
        sections: state.assessment.sections.map(s => {
          if (s.id === sectionId) {
            return { ...s, questions: s.questions.filter(q => q.id !== questionId) };
          }
          return s;
        }),
      },
    })),
}));