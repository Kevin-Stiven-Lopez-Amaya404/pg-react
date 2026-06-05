import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { palette, radius, spacing } from '@/constants/design';

type SectionCardProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function SectionCard({ title, description, children }: SectionCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {!!description && <Text style={styles.description}>{description}</Text>}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.md,
    width: '100%',
    minWidth: 0,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: palette.surface,
    borderColor: palette.border,
    borderWidth: 1,
  },
  header: {
    gap: 4,
  },
  title: {
    color: palette.text,
    flexShrink: 1,
    fontSize: 17,
    fontWeight: '800',
  },
  description: {
    color: palette.textMuted,
    flexShrink: 1,
    fontSize: 13,
    lineHeight: 18,
  },
});
