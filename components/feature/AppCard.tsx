// Powered by OnSpace.AI
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, Typography } from '@/constants/theme';

interface AppCardData {
  id: string;
  name: string;
  description: string;
  prompt: string;
  category: string;
  downloads: string;
  rating: number;
  color: string;
  buildTime: string;
  icon: string;
}

interface AppCardProps {
  app: AppCardData;
  onPress?: () => void;
}

export function AppCard({ app, onPress }: AppCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] }]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <View style={[styles.iconWrap, { backgroundColor: app.color + '20', borderColor: app.color + '40' }]}>
          <MaterialIcons name={app.icon as any} size={24} color={app.color} />
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{app.name}</Text>
          <View style={styles.categoryRow}>
            <Text style={[styles.category, { color: app.color }]}>{app.category}</Text>
            <Text style={styles.dot}>·</Text>
            <MaterialIcons name="timer" size={11} color={Colors.textMuted} />
            <Text style={styles.buildTime}>{app.buildTime}</Text>
          </View>
        </View>
        <View style={styles.ratingWrap}>
          <MaterialIcons name="star" size={13} color={Colors.warning} />
          <Text style={styles.rating}>{app.rating}</Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>{app.description}</Text>

      <View style={styles.promptWrap}>
        <MaterialIcons name="auto-awesome" size={11} color={Colors.primary} />
        <Text style={styles.prompt} numberOfLines={1}>{app.prompt}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.downloadsWrap}>
          <MaterialIcons name="download" size={13} color={Colors.textMuted} />
          <Text style={styles.downloads}>{app.downloads} downloads</Text>
        </View>
        <Pressable style={({ pressed }) => [styles.getBtn, { backgroundColor: app.color + '20', borderColor: app.color + '60' }, pressed && { opacity: 0.7 }]}>
          <Text style={[styles.getBtnText, { color: app.color }]}>Get APK</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  headerInfo: { flex: 1 },
  name: { ...Typography.h3, color: Colors.textPrimary },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  category: { ...Typography.caption, fontWeight: '600' },
  dot: { color: Colors.textMuted, ...Typography.caption },
  buildTime: { ...Typography.caption, color: Colors.textMuted },
  ratingWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rating: { ...Typography.label, color: Colors.textPrimary },
  description: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  promptWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.primaryDim,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 5,
  },
  prompt: {
    ...Typography.caption,
    color: Colors.primary,
    flex: 1,
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  downloadsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  downloads: { ...Typography.caption, color: Colors.textMuted },
  getBtn: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  getBtnText: { ...Typography.caption, fontWeight: '700' },
});
