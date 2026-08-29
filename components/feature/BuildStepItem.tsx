// Powered by OnSpace.AI
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '@/constants/theme';
import { BuildStep } from '@/services/generationService';

interface BuildStepItemProps {
  step: BuildStep;
  isActive: boolean;
}

export function BuildStepItem({ step, isActive }: BuildStepItemProps) {
  const pulseAnim = useRef(new Animated.Value(0.4)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isActive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 0.4, duration: 600, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(step.status === 'done' ? 1 : 0.3);
    }
  }, [isActive, step.status]);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const isDone = step.status === 'done';
  const isPending = step.status === 'pending';

  return (
    <Animated.View
      style={[
        styles.container,
        isActive && styles.containerActive,
        { opacity: slideAnim, transform: [{ translateX: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [-10, 0] }) }] },
      ]}
    >
      <Animated.View
        style={[
          styles.iconContainer,
          isDone && styles.iconDone,
          isActive && styles.iconActive,
          isPending && styles.iconPending,
          { opacity: isActive ? pulseAnim : 1 },
        ]}
      >
        {isDone ? (
          <MaterialIcons name="check" size={14} color={Colors.success} />
        ) : isActive ? (
          <MaterialIcons name="settings" size={14} color={Colors.neon} />
        ) : (
          <View style={styles.dot} />
        )}
      </Animated.View>

      <View style={styles.content}>
        <Text style={[styles.label, isDone && styles.labelDone, isActive && styles.labelActive, isPending && styles.labelPending]}>
          {step.label}
        </Text>
        {isActive ? (
          <Text style={styles.detail}>{step.detail}</Text>
        ) : null}
      </View>

      {isDone ? (
        <Text style={styles.done}>✓</Text>
      ) : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    paddingHorizontal: Spacing.md,
    borderRadius: 10,
    marginBottom: 4,
  },
  containerActive: {
    backgroundColor: Colors.neon + '08',
    borderWidth: 1,
    borderColor: Colors.neon + '20',
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  iconDone: {
    borderColor: Colors.success + '60',
    backgroundColor: Colors.success + '15',
  },
  iconActive: {
    borderColor: Colors.neon + '60',
    backgroundColor: Colors.neon + '15',
  },
  iconPending: {
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.textMuted,
  },
  content: { flex: 1 },
  label: { ...Typography.label },
  labelDone: { color: Colors.textSecondary },
  labelActive: { color: Colors.neon },
  labelPending: { color: Colors.textMuted },
  detail: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  done: {
    ...Typography.label,
    color: Colors.success,
  },
});
