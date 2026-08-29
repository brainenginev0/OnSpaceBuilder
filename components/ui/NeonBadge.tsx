// Powered by OnSpace.AI
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Radius, Typography } from '@/constants/theme';

interface NeonBadgeProps {
  label: string;
  color?: string;
}

export function NeonBadge({ label, color = Colors.neon }: NeonBadgeProps) {
  return (
    <View style={[styles.badge, { borderColor: color + '50', backgroundColor: color + '15' }]}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  text: {
    ...Typography.caption,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
