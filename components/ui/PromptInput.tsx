// Powered by OnSpace.AI
import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, Typography } from '@/constants/theme';

interface PromptInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export function PromptInput({ value, onChangeText, onSubmit, placeholder, disabled }: PromptInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.container, focused && styles.containerFocused]}>
      <MaterialIcons name="auto-awesome" size={20} color={Colors.primary} style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || 'Describe your app...'}
        placeholderTextColor={Colors.textMuted}
        multiline
        numberOfLines={3}
        textAlignVertical="top"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        editable={!disabled}
      />
      <Pressable
        style={({ pressed }) => [styles.buildBtn, disabled && styles.buildBtnDisabled, pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] }]}
        onPress={onSubmit}
        disabled={disabled || !value.trim()}
      >
        <MaterialIcons name="bolt" size={20} color={disabled ? Colors.textMuted : Colors.textOnPrimary} />
        <Text style={[styles.buildBtnText, disabled && { color: Colors.textMuted }]}>Build</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  containerFocused: {
    borderColor: Colors.primary + '80',
  },
  icon: {
    marginTop: 2,
  },
  input: {
    flex: 1,
    ...Typography.body,
    color: Colors.textPrimary,
    minHeight: 60,
    includeFontPadding: false,
  },
  buildBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    alignSelf: 'flex-end',
  },
  buildBtnDisabled: {
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  buildBtnText: {
    ...Typography.label,
    color: Colors.textOnPrimary,
  },
});
