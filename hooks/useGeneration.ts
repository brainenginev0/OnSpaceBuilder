// Powered by OnSpace.AI
import { useState, useRef, useCallback } from 'react';
import { getInitialSteps, generateResult, BuildStep, GenerationResult } from '@/services/generationService';
import { analyzePrompt, AppPlan } from '@/services/aiPlanService';

export type GenerationPhase = 'idle' | 'analyzing' | 'planning' | 'building' | 'done' | 'error';

export function useGeneration() {
  const [phase, setPhase] = useState<GenerationPhase>('idle');
  const [steps, setSteps] = useState<BuildStep[]>(getInitialSteps());
  const [currentStep, setCurrentStep] = useState(-1);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [plan, setPlan] = useState<AppPlan | null>(null);
  const [progress, setProgress] = useState(0);
  const [analyzeError, setAnalyzeError] = useState<string | null>(null);
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Legacy alias for backward compat
  const state: 'idle' | 'building' | 'done' | 'error' = 
    phase === 'idle' ? 'idle'
    : phase === 'done' ? 'done'
    : phase === 'error' ? 'error'
    : 'building';

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhase('idle');
    setSteps(getInitialSteps());
    setCurrentStep(-1);
    setResult(null);
    setPlan(null);
    setProgress(0);
    setAnalyzeError(null);
  }, []);

  const runBuildSimulation = useCallback((prompt: string, resolvedPlan: AppPlan | null) => {
    const initialSteps = getInitialSteps();
    setSteps(initialSteps);
    setCurrentStep(-1);
    setProgress(0);

    const stepDurations = [1200, 1800, 2200, 1500, 2000, 1300];
    let cumulative = 0;
    const totalTime = stepDurations.reduce((a, b) => a + b, 0);

    stepDurations.forEach((duration, index) => {
      const startOffset = cumulative;
      cumulative += duration;

      timerRef.current = setTimeout(() => {
        setCurrentStep(index);
        setSteps(prev =>
          prev.map((s, i) => ({
            ...s,
            status: i < index ? 'done' : i === index ? 'running' : 'pending',
          }))
        );

        const progressStart = (startOffset / totalTime) * 100;
        const progressEnd = (cumulative / totalTime) * 100;
        const ticks = 20;
        for (let tick = 0; tick <= ticks; tick++) {
          setTimeout(() => {
            setProgress(progressStart + ((progressEnd - progressStart) * tick) / ticks);
          }, (duration / ticks) * tick);
        }
      }, startOffset);
    });

    // Done
    timerRef.current = setTimeout(() => {
      setSteps(prev => prev.map(s => ({ ...s, status: 'done' })));
      setCurrentStep(stepDurations.length);
      setProgress(100);
      const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);

      // Use AI plan data for the result if available
      const enrichedResult = generateResult(prompt, elapsed);
      if (resolvedPlan) {
        enrichedResult.appName = resolvedPlan.appName;
        enrichedResult.description = resolvedPlan.tagline || resolvedPlan.description;
        enrichedResult.screens = resolvedPlan.estimatedScreens;
        enrichedResult.components = resolvedPlan.estimatedComponents;
      }

      setResult(enrichedResult);
      setPhase('done');
    }, cumulative + 300);
  }, []);

  const startGeneration = useCallback(async (prompt: string) => {
    reset();
    startTimeRef.current = Date.now();

    // Phase 1: AI Analysis
    setPhase('analyzing');

    const { plan: aiPlan, error } = await analyzePrompt(prompt);

    if (error) {
      console.warn('AI analysis failed, proceeding without plan:', error);
      setAnalyzeError(error);
    }

    // Phase 2: Show plan briefly, then build
    if (aiPlan) {
      setPlan(aiPlan);
      setPhase('planning');

      // Brief pause to let user read the plan before build starts
      await new Promise<void>(resolve => {
        timerRef.current = setTimeout(resolve, 1800);
      });
    }

    // Phase 3: Build simulation
    setPhase('building');
    runBuildSimulation(prompt, aiPlan);
  }, [reset, runBuildSimulation]);

  return {
    // New phase-based API
    phase,
    plan,
    analyzeError,
    // Legacy API (for existing UI compatibility)
    state,
    steps,
    currentStep,
    result,
    progress,
    startGeneration,
    reset,
  };
}
