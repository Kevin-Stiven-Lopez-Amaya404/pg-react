import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { radius, spacing } from '@/constants/design';
import { useAppPreferences } from '@/contexts/app-preferences';

type SectionCardProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function SectionCard({ title, description, children }: SectionCardProps) {
  const { colors } = useAppPreferences();

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {!!description && <Text style={[styles.description, { color: colors.textMuted }]}>{description}</Text>}
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
    borderWidth: 1,
  },
  header: {
    gap: 4,
  },
  title: {
    flexShrink: 1,
    fontSize: 17,
    fontWeight: '800',
  },
  description: {
    flexShrink: 1,
    fontSize: 13,
    lineHeight: 18,
  },
});
