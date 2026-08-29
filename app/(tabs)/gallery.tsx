// Powered by OnSpace.AI
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, Typography } from '@/constants/theme';
import { AppCard } from '@/components/feature/AppCard';
import { NeonBadge } from '@/components/ui/NeonBadge';
import { GALLERY_APPS } from '@/constants/config';

const CATEGORIES = ['All', 'Health', 'Finance', 'Food', 'Wellness', 'Shopping', 'Education'];

export default function GalleryScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = selectedCategory === 'All'
    ? GALLERY_APPS
    : GALLERY_APPS.filter(app => app.category === selectedCategory);

  const totalDownloads = GALLERY_APPS.reduce((acc, app) => {
    const n = parseFloat(app.downloads.replace('K', ''));
    return acc + n;
  }, 0);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.title}>App Gallery</Text>
              <Text style={styles.subtitle}>Built by OnSpace AI</Text>
            </View>
            <NeonBadge label={`${GALLERY_APPS.length} APPS`} color={Colors.primary} />
          </View>

          {/* Summary strip */}
          <View style={styles.summary}>
            <View style={styles.summaryItem}>
              <MaterialIcons name="apps" size={16} color={Colors.neon} />
              <Text style={styles.summaryValue}>{GALLERY_APPS.length}</Text>
              <Text style={styles.summaryLabel}>Apps</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <MaterialIcons name="download" size={16} color={Colors.primary} />
              <Text style={styles.summaryValue}>{totalDownloads.toFixed(0)}K+</Text>
              <Text style={styles.summaryLabel}>Downloads</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <MaterialIcons name="star" size={16} color={Colors.warning} />
              <Text style={styles.summaryValue}>4.8</Text>
              <Text style={styles.summaryLabel}>Avg Rating</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <MaterialIcons name="timer" size={16} color={Colors.accent} />
              <Text style={styles.summaryValue}>42s</Text>
              <Text style={styles.summaryLabel}>Avg Build</Text>
            </View>
          </View>
        </View>

        {/* Category Filter */}
        <View style={styles.filterOuter}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterContent}
          >
            {CATEGORIES.map(cat => {
              const isSelected = cat === selectedCategory;
              return (
                <Pressable
                  key={cat}
                  style={({ pressed }) => [
                    styles.filterChip,
                    isSelected && styles.filterChipSelected,
                    pressed && { opacity: 0.75 },
                  ]}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text style={[styles.filterChipText, isSelected && styles.filterChipTextSelected]}>
                    {cat}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* App List */}
        <View style={styles.list}>
          {filtered.map(app => (
            <AppCard key={app.id} app={app} />
          ))}
        </View>

        {/* Build your own CTA */}
        <View style={styles.buildCta}>
          <View style={styles.buildCtaIcon}>
            <MaterialIcons name="add-circle-outline" size={32} color={Colors.neon} />
          </View>
          <Text style={styles.buildCtaTitle}>Build your own app</Text>
          <Text style={styles.buildCtaDesc}>Every app above was generated from a single text prompt. Yours is next.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  content: { paddingBottom: 32 },

  header: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: { ...Typography.h1, color: Colors.textPrimary },
  subtitle: { ...Typography.body, color: Colors.textSecondary, marginTop: 2 },

  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing.md,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  summaryValue: { ...Typography.h3, color: Colors.textPrimary },
  summaryLabel: { ...Typography.caption, color: Colors.textMuted },
  summaryDivider: {
    width: 1,
    height: 36,
    backgroundColor: Colors.border,
  },

  filterOuter: {
    minHeight: 52,
    marginBottom: Spacing.md,
  },
  filterContent: {
    paddingHorizontal: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  filterChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipSelected: {
    backgroundColor: Colors.neonDim,
    borderColor: Colors.neon + '70',
  },
  filterChipText: {
    ...Typography.label,
    color: Colors.textSecondary,
    fontSize: 13,
  },
  filterChipTextSelected: {
    color: Colors.neon,
  },

  list: {
    paddingHorizontal: Spacing.lg,
  },

  buildCta: {
    margin: Spacing.lg,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.neon + '30',
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  buildCtaIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.neonDim,
    borderWidth: 1,
    borderColor: Colors.neon + '40',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  buildCtaTitle: { ...Typography.h2, color: Colors.textPrimary, textAlign: 'center' },
  buildCtaDesc: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 },
});
