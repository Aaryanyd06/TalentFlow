import { create } from "zustand";
import type { Assessment, AssessmentQuestion, QuestionType } from "@/types";

type AssessmentState = {
  assessment: Assessment;
  setAssessment: (assessment: Assessment) => void;
  addSection: () => void;
  updateSectionTitle: (sectionId: string, title: string) => void;
  removeSection: (sectionId: string) => void;
  addQuestion: (sectionId: string, type: QuestionType) => void;
  updateQuestionLabel: (sectionId: string, questionId: string, label: string) => void;
  removeQuestion: (sectionId: string, questionId: string) => void;
  toggleQuestionRequired: (sectionId: string, questionId: string) => void;
  updateQuestionOption: (sectionId: string, questionId: string, optionIndex: number, value: string) => void;
  addQuestionOption: (sectionId: string, questionId: string) => void;
  removeQuestionOption: (sectionId: string, questionId: string, optionIndex: number) => void;
  updateQuestionNumericRange: (sectionId: string, questionId: string, key: 'min' | 'max', value: number) => void;
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
              id: crypto.randomUUID(), type, label: "New Question", isRequired: false,
              options: type === 'single-choice' ? ['Option 1'] : undefined,
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
  
  toggleQuestionRequired: (sectionId, questionId) =>
    set((state) => ({
      assessment: {
        ...state.assessment,
        sections: state.assessment.sections.map(s => {
          if (s.id === sectionId) {
            return {
              ...s,
              questions: s.questions.map(q => 
                q.id === questionId ? { ...q, isRequired: !q.isRequired } : q
              ),
            };
          }
          return s;
        }),
      },
    })),

  updateQuestionOption: (sectionId, questionId, optionIndex, value) =>
    set((state) => ({
      assessment: {
        ...state.assessment,
        sections: state.assessment.sections.map(s => {
          if (s.id === sectionId) {
            return {
              ...s,
              questions: s.questions.map(q => {
                if (q.id === questionId && q.options) {
                  const newOptions = [...q.options];
                  newOptions[optionIndex] = value;
                  return { ...q, options: newOptions };
                }
                return q;
              })
            };
          }
          return s;
        }),
      },
    })),
    
  addQuestionOption: (sectionId, questionId) =>
    set((state) => ({
      assessment: {
        ...state.assessment,
        sections: state.assessment.sections.map(s => {
          if (s.id === sectionId) {
            return {
              ...s,
              questions: s.questions.map(q => 
                q.id === questionId ? { ...q, options: [...(q.options || []), `New Option`] } : q
              ),
            };
          }
          return s;
        }),
      },
    })),
    
  removeQuestionOption: (sectionId, questionId, optionIndex) =>
    set((state) => ({
      assessment: {
        ...state.assessment,
        sections: state.assessment.sections.map(s => {
          if (s.id === sectionId) {
            return {
              ...s,
              questions: s.questions.map(q => {
                if (q.id === questionId && q.options) {
                  return { ...q, options: q.options.filter((_, i) => i !== optionIndex) };
                }
                return q;
              })
            };
          }
          return s;
        }),
      },
    })),
  
  updateQuestionNumericRange: (sectionId, questionId, key, value) =>
    set((state) => ({
      assessment: {
        ...state.assessment,
        sections: state.assessment.sections.map(s => {
          if (s.id === sectionId) {
            return {
              ...s,
              questions: s.questions.map(q => 
                q.id === questionId ? { ...q, [key]: value } : q
              ),
            };
          }
          return s;
        }),
      },
    })),
}));