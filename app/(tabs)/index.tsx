// Powered by OnSpace.AI
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Radius, Typography } from '@/constants/theme';
import { NeonBadge } from '@/components/ui/NeonBadge';

const FEATURES = [
  {
    icon: 'auto-awesome' as const,
    title: 'One Prompt, Full App',
    desc: 'Describe your vision in plain English. AI handles the rest — design, code, and packaging.',
    color: Colors.neon,
  },
  {
    icon: 'bolt' as const,
    title: 'Under 60 Seconds',
    desc: 'From prompt to ready-to-install APK in less than a minute. No waiting, no queues.',
    color: Colors.primary,
  },
  {
    icon: 'phone-android' as const,
    title: 'Native Performance',
    desc: 'Every app is built with React Native for true native performance on iOS and Android.',
    color: Colors.accent,
  },
  {
    icon: 'code' as const,
    title: 'Export Full Source',
    desc: 'Take ownership. Download the complete TypeScript source code and customize freely.',
    color: Colors.warning,
  },
];

const STATS = [
  { value: '50K+', label: 'Apps Built' },
  { value: '99.2%', label: 'Success Rate' },
  { value: '42s', label: 'Avg Build Time' },
  { value: '180+', label: 'Countries' },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.topBar}>
          <Text style={styles.logo}>OnSpace</Text>
          <NeonBadge label="APP BUILDER" color={Colors.neon} />
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <Image
            source={require('@/assets/images/hero-bg.png')}
            style={styles.heroImage}
            contentFit="cover"
            transition={300}
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <NeonBadge label="AGENTIC AI" color={Colors.accent} />
            <Text style={styles.heroTitle}>Generate Apps{'\n'}from One Prompt</Text>
            <Text style={styles.heroSubtitle}>
              The world's first agentic mobile app builder. Describe any app, get a ready-to-install APK instantly.
            </Text>
            <Pressable
              style={({ pressed }) => [styles.heroCta, pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] }]}
              onPress={() => router.push('/(tabs)/generate')}
            >
              <MaterialIcons name="bolt" size={20} color={Colors.background} />
              <Text style={styles.heroCtaText}>Start Building Free</Text>
            </Pressable>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {STATS.map(stat => (
            <View key={stat.label} style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* How it works */}
        <View style={styles.section}>
          <Text style={styles.sectionEyebrow}>HOW IT WORKS</Text>
          <Text style={styles.sectionTitle}>Three Steps to Your App</Text>

          {[
            { num: '01', title: 'Describe', desc: 'Type what you want your app to do in plain language' },
            { num: '02', title: 'AI Builds', desc: 'Our agentic AI writes code, designs UI, and generates assets' },
            { num: '03', title: 'Download', desc: 'Get a signed APK ready to install on any Android device' },
          ].map(step => (
            <View key={step.num} style={styles.stepItem}>
              <Text style={styles.stepNum}>{step.num}</Text>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDesc}>{step.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionEyebrow}>CAPABILITIES</Text>
          <Text style={styles.sectionTitle}>Everything You Need</Text>
          <View style={styles.featuresGrid}>
            {FEATURES.map(feature => (
              <View key={feature.title} style={styles.featureCard}>
                <View style={[styles.featureIconWrap, { backgroundColor: feature.color + '18', borderColor: feature.color + '35' }]}>
                  <MaterialIcons name={feature.icon} size={22} color={feature.color} />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDesc}>{feature.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* CTA Banner */}
        <Pressable
          style={({ pressed }) => [styles.ctaBanner, pressed && { opacity: 0.9 }]}
          onPress={() => router.push('/(tabs)/generate')}
        >
          <MaterialIcons name="auto-awesome" size={24} color={Colors.background} />
          <View>
            <Text style={styles.ctaBannerTitle}>Ready to build?</Text>
            <Text style={styles.ctaBannerSub}>Your first app is one prompt away</Text>
          </View>
          <MaterialIcons name="arrow-forward" size={20} color={Colors.background} />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  content: { paddingBottom: 32 },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  logo: {
    ...Typography.h2,
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },

  hero: {
    height: 420,
    marginHorizontal: Spacing.lg,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(8,8,15,0.55)',
  },
  heroContent: {
    flex: 1,
    padding: Spacing.xl,
    justifyContent: 'flex-end',
    gap: Spacing.md,
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
    lineHeight: 40,
  },
  heroSubtitle: {
    ...Typography.body,
    color: Colors.textPrimary + 'CC',
    lineHeight: 24,
  },
  heroCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.neon,
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: Radius.full,
  },
  heroCtaText: {
    ...Typography.label,
    color: Colors.background,
    fontSize: 15,
  },

  statsRow: {
    flexDirection: 'row',
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  statValue: {
    ...Typography.h2,
    color: Colors.neon,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },

  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  sectionEyebrow: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginTop: -4,
  },

  stepItem: {
    flexDirection: 'row',
    gap: Spacing.lg,
    alignItems: 'flex-start',
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
  },
  stepNum: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.primary + '40',
    letterSpacing: -1,
    lineHeight: 32,
  },
  stepContent: { flex: 1 },
  stepTitle: { ...Typography.h3, color: Colors.textPrimary },
  stepDesc: { ...Typography.bodySmall, color: Colors.textSecondary, marginTop: 4, lineHeight: 18 },

  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  featureCard: {
    width: '47%',
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  featureIconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTitle: { ...Typography.label, color: Colors.textPrimary },
  featureDesc: { ...Typography.caption, color: Colors.textSecondary, lineHeight: 16 },

  ctaBanner: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.neon,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  ctaBannerTitle: { ...Typography.h3, color: Colors.background },
  ctaBannerSub: { ...Typography.caption, color: Colors.background + 'BB', marginTop: 2 },
});
