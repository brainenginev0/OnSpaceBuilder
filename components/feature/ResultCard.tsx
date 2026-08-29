// Powered by OnSpace.AI
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, Typography } from '@/constants/theme';
import { GenerationResult } from '@/services/generationService';

interface ResultCardProps {
  result: GenerationResult;
  onReset: () => void;
}

export function ResultCard({ result, onReset }: ResultCardProps) {
  const stats = [
    { label: 'Screens', value: String(result.screens), icon: 'layers' as const },
    { label: 'Components', value: String(result.components), icon: 'widgets' as const },
    { label: 'Lines', value: String(result.linesOfCode), icon: 'code' as const },
    { label: 'Build Time', value: result.buildTime, icon: 'timer' as const },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.successRow}>
        <View style={styles.successIcon}>
          <MaterialIcons name="check-circle" size={28} color={Colors.success} />
        </View>
        <View>
          <Text style={styles.successLabel}>APK Ready to Install</Text>
          <Text style={styles.appName}>{result.appName}</Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>{result.description}</Text>

      <View style={styles.statsGrid}>
        {stats.map(stat => (
          <View key={stat.label} style={styles.statItem}>
            <MaterialIcons name={stat.icon} size={16} color={Colors.primary} />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sizeRow}>
        <MaterialIcons name="android" size={16} color={Colors.success} />
        <Text style={styles.sizeText}>APK Size: {result.apkSize}</Text>
      </View>

      <Pressable
        style={({ pressed }) => [styles.downloadBtn, pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] }]}
      >
        <MaterialIcons name="download" size={20} color={Colors.background} />
        <Text style={styles.downloadBtnText}>Download APK</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.resetBtn, pressed && { opacity: 0.7 }]}
        onPress={onReset}
      >
        <MaterialIcons name="refresh" size={16} color={Colors.textSecondary} />
        <Text style={styles.resetBtnText}>Build Another App</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.success + '40',
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  successRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  successIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.success + '20',
    borderWidth: 1,
    borderColor: Colors.success + '40',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successLabel: {
    ...Typography.caption,
    color: Colors.success,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  appName: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginTop: 2,
  },
  description: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  statValue: {
    ...Typography.h3,
    color: Colors.textPrimary,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  sizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  sizeText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.success,
    borderRadius: Radius.md,
    paddingVertical: Spacing.md,
  },
  downloadBtnText: {
    ...Typography.label,
    color: Colors.background,
    fontSize: 16,
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  resetBtnText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
});
