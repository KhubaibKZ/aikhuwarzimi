import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface ProgressState {
  completedExamples: string[];
  completedExercises: string[];
  totalExamples: number;
  totalExercises: number;
}

interface ProgressContextType extends ProgressState {
  markExampleComplete: (id: string) => void;
  markExerciseComplete: (id: string) => void;
  isCompleted: (id: string) => boolean;
  exampleProgress: number;
  exerciseProgress: number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

interface ProgressProviderProps {
  children: ReactNode;
}

export function ProgressProvider({ children }: ProgressProviderProps) {
  const [state, setState] = useState<ProgressState>({
    completedExamples: [],
    completedExercises: [],
    totalExamples: 4,
    totalExercises: 1,
  });

  const markExampleComplete = useCallback((id: string) => {
    setState(prev => {
      if (prev.completedExamples.includes(id)) return prev;
      return {
        ...prev,
        completedExamples: [...prev.completedExamples, id]
      };
    });
  }, []);

  const markExerciseComplete = useCallback((id: string) => {
    setState(prev => {
      if (prev.completedExercises.includes(id)) return prev;
      return {
        ...prev,
        completedExercises: [...prev.completedExercises, id]
      };
    });
  }, []);

  const isCompleted = useCallback((id: string) => {
    return state.completedExamples.includes(id) || state.completedExercises.includes(id);
  }, [state.completedExamples, state.completedExercises]);

  const exampleProgress = (state.completedExamples.length / state.totalExamples) * 100;
  const exerciseProgress = (state.completedExercises.length / state.totalExercises) * 100;

  return (
    <ProgressContext.Provider value={{
      ...state,
      markExampleComplete,
      markExerciseComplete,
      isCompleted,
      exampleProgress,
      exerciseProgress
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
