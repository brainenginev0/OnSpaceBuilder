// Powered by OnSpace.AI
import { getSupabaseClient } from '@/template';
import { FunctionsHttpError } from '@supabase/supabase-js';

export interface AppPlan {
  appName: string;
  tagline: string;
  description: string;
  category: string;
  primaryColor: string;
  screens: { name: string; purpose: string }[];
  components: string[];
  features: string[];
  techHighlights: string[];
  estimatedScreens: number;
  estimatedComponents: number;
  complexity: 'Simple' | 'Moderate' | 'Complex';
}

export async function analyzePrompt(prompt: string): Promise<{ plan: AppPlan | null; error: string | null }> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.functions.invoke('analyze-prompt', {
      body: { prompt },
    });

    if (error) {
      let errorMessage = error.message;
      if (error instanceof FunctionsHttpError) {
        try {
          const statusCode = error.context?.status ?? 500;
          const textContent = await error.context?.text();
          errorMessage = `[Code: ${statusCode}] ${textContent || error.message || 'Unknown error'}`;
        } catch {
          errorMessage = error.message || 'Failed to read response';
        }
      }
      return { plan: null, error: errorMessage };
    }

    return { plan: data?.plan ?? null, error: null };
  } catch (err) {
    return { plan: null, error: String(err) };
  }
}
