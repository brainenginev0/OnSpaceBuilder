// Powered by OnSpace.AI
import { BUILD_STEPS } from '@/constants/config';

export type BuildStep = {
  id: string;
  label: string;
  detail: string;
  status: 'pending' | 'running' | 'done';
};

export type GenerationResult = {
  appName: string;
  description: string;
  screens: number;
  components: number;
  linesOfCode: number;
  buildTime: string;
  apkSize: string;
};

export function generateAppName(prompt: string): string {
  const words = prompt.split(' ').filter(w => w.length > 3);
  const base = words[0] ? words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase() : 'My';
  const suffixes = ['AI', 'Pro', 'Go', 'Hub', 'App', 'Wise', 'Mate'];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  return `${base}${suffix}`;
}

export function generateResult(prompt: string, buildSeconds: number): GenerationResult {
  const screens = Math.floor(Math.random() * 5) + 4;
  const components = Math.floor(Math.random() * 20) + 15;
  const linesOfCode = Math.floor(Math.random() * 1500) + 800;
  const apkMb = (Math.random() * 8 + 12).toFixed(1);

  return {
    appName: generateAppName(prompt),
    description: `A fully functional ${prompt.toLowerCase()} built with React Native & Expo`,
    screens,
    components,
    linesOfCode,
    buildTime: `${buildSeconds}s`,
    apkSize: `${apkMb} MB`,
  };
}

export function getInitialSteps(): BuildStep[] {
  return BUILD_STEPS.map(s => ({ ...s, status: 'pending' as const }));
}
