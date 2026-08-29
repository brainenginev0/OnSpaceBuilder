// Powered by OnSpace.AI
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, Typography } from '@/constants/theme';
import { AppPlan } from '@/services/aiPlanService';

interface AIPlanCardProps {
  plan: AppPlan;
}

export function AIPlanCard({ plan }: AIPlanCardProps) {
  const accent = plan.primaryColor || Colors.neon;

  return (
    <View style={[styles.card, { borderColor: accent + '40' }]}>
      {/* Plan header */}
      <View style={[styles.planHeader, { backgroundColor: accent + '12' }]}>
        <View style={styles.planHeaderLeft}>
          <View style={[styles.aiTag, { backgroundColor: accent + '25', borderColor: accent + '60' }]}>
            <MaterialIcons name="auto-awesome" size={11} color={accent} />
            <Text style={[styles.aiTagText, { color: accent }]}>AI PLAN READY</Text>
          </View>
          <Text style={styles.appName}>{plan.appName}</Text>
          <Text style={styles.tagline}>{plan.tagline}</Text>
        </View>
        <View style={[styles.complexityBadge, { borderColor: accent + '50', backgroundColor: accent + '15' }]}>
          <Text style={[styles.complexityText, { color: accent }]}>{plan.complexity}</Text>
        </View>
      </View>

      <View style={styles.body}>
        {/* Description */}
        <Text style={styles.description}>{plan.description}</Text>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <MaterialIcons name="phone-android" size={15} color={accent} />
            <Text style={styles.statValue}>{plan.estimatedScreens}</Text>
            <Text style={styles.statLabel}>Screens</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <MaterialIcons name="widgets" size={15} color={Colors.primary} />
            <Text style={styles.statValue}>{plan.estimatedComponents}</Text>
            <Text style={styles.statLabel}>Components</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <MaterialIcons name="category" size={15} color={Colors.accent} />
            <Text style={styles.statValue} numberOfLines={1}>{plan.category}</Text>
            <Text style={styles.statLabel}>Category</Text>
          </View>
        </View>

        {/* Screens */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="layers" size={14} color={Colors.textSecondary} />
            <Text style={styles.sectionTitle}>SCREENS</Text>
          </View>
          <View style={styles.screenList}>
            {plan.screens.map((screen, i) => (
              <View key={i} style={styles.screenItem}>
                <View style={[styles.screenBullet, { backgroundColor: accent }]} />
                <View style={styles.screenInfo}>
                  <Text style={styles.screenName}>{screen.name}</Text>
                  <Text style={styles.screenPurpose}>{screen.purpose}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="star-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.sectionTitle}>KEY FEATURES</Text>
          </View>
          <View style={styles.featureList}>
            {plan.features.map((feature, i) => (
              <View key={i} style={styles.featureItem}>
                <MaterialIcons name="check-circle-outline" size={14} color={accent} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Tech highlights */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="code" size={14} color={Colors.textSecondary} />
            <Text style={styles.sectionTitle}>TECH STACK</Text>
          </View>
          <View style={styles.techList}>
            {plan.techHighlights.map((tech, i) => (
              <View key={i} style={styles.techChip}>
                <Text style={styles.techText}>{tech}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.xl,
    borderWidth: 1,
    overflow: 'hidden',
  },
  planHeader: {
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  planHeaderLeft: { flex: 1, gap: 6 },
  aiTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  aiTagText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  appName: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  tagline: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  complexityBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.md,
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  complexityText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  body: {
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  description: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    ...Typography.h3,
    color: Colors.textPrimary,
    fontSize: 15,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: Colors.border,
  },
  section: { gap: Spacing.sm },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  sectionTitle: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  screenList: { gap: 8 },
  screenItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  screenBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
    flexShrink: 0,
  },
  screenInfo: { flex: 1 },
  screenName: {
    ...Typography.label,
    color: Colors.textPrimary,
  },
  screenPurpose: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 1,
    lineHeight: 15,
  },
  featureList: { gap: 7 },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 7,
  },
  featureText: {
    flex: 1,
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  techList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  techChip: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 5,
  },
  techText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontFamily: 'monospace',
  },
});
