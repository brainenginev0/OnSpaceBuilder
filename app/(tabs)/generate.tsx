// Powered by OnSpace.AI
import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Pressable, StatusBar,
  KeyboardAvoidingView, Platform, ActivityIndicator, Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, Typography } from '@/constants/theme';
import { PromptInput } from '@/components/ui/PromptInput';
import { BuildStepItem } from '@/components/feature/BuildStepItem';
import { ResultCard } from '@/components/feature/ResultCard';
import { AIPlanCard } from '@/components/feature/AIPlanCard';
import { useGeneration } from '@/hooks/useGeneration';
import { SAMPLE_PROMPTS } from '@/constants/config';

export default function GenerateScreen() {
  const [prompt, setPrompt] = useState('');
  const { phase, plan, analyzeError, steps, currentStep, result, progress, startGeneration, reset } = useGeneration();
  const planOpacity = useRef(new Animated.Value(0)).current;
  const analyzeDotsRef = useRef(0);
  const [analyzeDots, setAnalyzeDots] = useState('');

  // Animate plan card appearance
  useEffect(() => {
    if (plan && phase === 'planning') {
      Animated.timing(planOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else if (phase === 'idle') {
      planOpacity.setValue(0);
    }
  }, [plan, phase]);

  // Animate "Analyzing..." dots
  useEffect(() => {
    if (phase !== 'analyzing') return;
    const interval = setInterval(() => {
      analyzeDotsRef.current = (analyzeDotsRef.current + 1) % 4;
      setAnalyzeDots('.'.repeat(analyzeDotsRef.current));
    }, 400);
    return () => clearInterval(interval);
  }, [phase]);

  const handleBuild = () => {
    if (!prompt.trim()) return;
    startGeneration(prompt.trim());
  };

  const handleReset = () => {
    reset();
    setPrompt('');
  };

  const isActive = phase !== 'idle' && phase !== 'done';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Build an App</Text>
            <Text style={styles.subtitle}>Describe your app in plain English</Text>
          </View>

          {/* Input */}
          <View style={styles.inputSection}>
            <PromptInput
              value={prompt}
              onChangeText={setPrompt}
              onSubmit={handleBuild}
              placeholder="e.g. A habit tracker with streaks and daily reminders"
              disabled={isActive}
            />
          </View>

          {/* Sample prompts (idle only) */}
          {phase === 'idle' ? (
            <View style={styles.samplesSection}>
              <Text style={styles.samplesLabel}>Try a sample prompt</Text>
              <View style={styles.chips}>
                {SAMPLE_PROMPTS.map(sample => (
                  <Pressable
                    key={sample}
                    style={({ pressed }) => [styles.chip, pressed && { opacity: 0.7 }]}
                    onPress={() => setPrompt(sample)}
                  >
                    <Text style={styles.chipText} numberOfLines={1}>{sample}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          ) : null}

          {/* ── Phase: Analyzing ── */}
          {phase === 'analyzing' ? (
            <View style={styles.analyzeCard}>
              <View style={styles.analyzeRow}>
                <View style={styles.aiOrb}>
                  <ActivityIndicator size="small" color={Colors.neon} />
                </View>
                <View style={styles.analyzeInfo}>
                  <Text style={styles.analyzeTitle}>Analyzing your prompt{analyzeDots}</Text>
                  <Text style={styles.analyzeSubtitle}>AI is designing your app architecture</Text>
                </View>
              </View>
              <View style={styles.analyzePromptWrap}>
                <MaterialIcons name="auto-awesome" size={12} color={Colors.primary} />
                <Text style={styles.analyzePromptText} numberOfLines={2}>{prompt}</Text>
              </View>
              <View style={styles.analyzeStepRow}>
                {['Parsing intent', 'Planning screens', 'Defining components'].map((step, i) => (
                  <View key={step} style={styles.analyzeStep}>
                    <View style={[styles.analyzeStepDot, { backgroundColor: Colors.neon + (i === 0 ? 'FF' : i === 1 ? '80' : '35') }]} />
                    <Text style={styles.analyzeStepText}>{step}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {/* ── Phase: Planning ── (show plan, transition to build) */}
          {plan && (phase === 'planning' || phase === 'building' || phase === 'done') ? (
            <Animated.View style={{ opacity: planOpacity }}>
              <AIPlanCard plan={plan} />
            </Animated.View>
          ) : null}

          {/* AI analysis warning (if it failed but we continued) */}
          {analyzeError && (phase === 'building' || phase === 'done') ? (
            <View style={styles.warnCard}>
              <MaterialIcons name="warning-amber" size={14} color={Colors.warning} />
              <Text style={styles.warnText}>AI plan unavailable — building with defaults</Text>
            </View>
          ) : null}

          {/* ── Phase: Building ── */}
          {phase === 'building' ? (
            <View style={styles.buildingSection}>
              <View style={styles.buildingHeader}>
                <View style={styles.buildingIndicator} />
                <Text style={styles.buildingTitle}>Building your app...</Text>
              </View>

              {/* Progress bar */}
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${Math.round(progress)}%` }]} />
              </View>
              <Text style={styles.progressText}>{Math.round(progress)}% complete</Text>

              {/* Steps */}
              <View style={styles.stepsContainer}>
                {steps.map((step, index) => (
                  <BuildStepItem
                    key={step.id}
                    step={step}
                    isActive={index === currentStep}
                  />
                ))}
              </View>
            </View>
          ) : null}

          {/* ── Phase: Done ── */}
          {phase === 'done' && result ? (
            <View style={styles.resultSection}>
              <ResultCard result={result} onReset={handleReset} />
            </View>
          ) : null}

          {/* Idle info card */}
          {phase === 'idle' ? (
            <View style={styles.infoCard}>
              <MaterialIcons name="info-outline" size={18} color={Colors.primary} />
              <Text style={styles.infoText}>
                OnSpace AI analyzes your prompt, designs the architecture, writes the code, and packages a ready-to-install APK — all in under 60 seconds.
              </Text>
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: 48, gap: Spacing.lg },

  header: { gap: 4 },
  title: { ...Typography.h1, color: Colors.textPrimary },
  subtitle: { ...Typography.body, color: Colors.textSecondary },

  inputSection: {},

  samplesSection: { gap: Spacing.sm },
  samplesLabel: { ...Typography.label, color: Colors.textSecondary },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  chip: {
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    maxWidth: '90%',
  },
  chipText: { ...Typography.bodySmall, color: Colors.textSecondary },

  // Analyze card
  analyzeCard: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.neon + '35',
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  analyzeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  aiOrb: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.neonDim,
    borderWidth: 1,
    borderColor: Colors.neon + '50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  analyzeInfo: { flex: 1, gap: 3 },
  analyzeTitle: { ...Typography.h3, color: Colors.neon },
  analyzeSubtitle: { ...Typography.bodySmall, color: Colors.textSecondary },
  analyzePromptWrap: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'flex-start',
    backgroundColor: Colors.primaryDim,
    borderRadius: Radius.md,
    padding: Spacing.sm,
  },
  analyzePromptText: {
    flex: 1,
    ...Typography.bodySmall,
    color: Colors.primary,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  analyzeStepRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    flexWrap: 'wrap',
  },
  analyzeStep: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  analyzeStepDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  analyzeStepText: {
    ...Typography.caption,
    color: Colors.textMuted,
  },

  // Warning
  warnCard: {
    flexDirection: 'row',
    gap: Spacing.sm,
    backgroundColor: Colors.warning + '12',
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.warning + '30',
    padding: Spacing.sm,
    alignItems: 'center',
  },
  warnText: {
    ...Typography.caption,
    color: Colors.warning,
    flex: 1,
  },

  // Building
  buildingSection: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.borderBright,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  buildingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  buildingIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.neon,
  },
  buildingTitle: { ...Typography.h3, color: Colors.neon },
  progressBar: {
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.neon,
    borderRadius: 2,
  },
  progressText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'right',
  },
  stepsContainer: { gap: 2 },

  resultSection: {},

  // Info
  infoCard: {
    flexDirection: 'row',
    gap: Spacing.sm,
    backgroundColor: Colors.primaryDim,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
    padding: Spacing.md,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});
