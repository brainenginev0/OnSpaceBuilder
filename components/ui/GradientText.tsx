// Powered by OnSpace.AI
import React from 'react';
import { Text, TextStyle } from 'react-native';
import { Colors } from '@/constants/theme';

interface GradientTextProps {
  children: string;
  style?: TextStyle | TextStyle[];
}

// Simulated gradient via color — for true gradient text use MaskedView in production
export function GradientText({ children, style }: GradientTextProps) {
  return (
    <Text style={[{ color: Colors.neon }, style]}>
      {children}
    </Text>
  );
}
