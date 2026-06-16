import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { radius } from '@/constants/design';
import { useAppPreferences } from '@/contexts/app-preferences';

type IconName = ComponentProps<typeof MaterialIcons>['name'];

type ActionButtonProps = {
  label: string;
  onPress: () => void;
  icon?: IconName;
  variant?: 'primary' | 'soft' | 'outline';
};

export function ActionButton({ label, onPress, icon, variant = 'primary' }: ActionButtonProps) {
  const { colors } = useAppPreferences();
  const isPrimary = variant === 'primary';
  const variantStyle = {
    primary: { backgroundColor: colors.primary },
    soft: { backgroundColor: colors.surfaceMuted },
    outline: {
      backgroundColor: colors.surface,
      borderColor: colors.borderStrong,
      borderWidth: 1,
    },
  }[variant];

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variantStyle,
        pressed && styles.pressed,
      ]}>
      {!!icon && (
        <MaterialIcons
          name={icon}
          size={19}
          color={isPrimary ? colors.surface : colors.primary}
          style={styles.icon}
        />
      )}
      <Text style={[styles.text, { color: isPrimary ? colors.surface : colors.primary }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    flexShrink: 1,
    gap: 8,
    minHeight: 44,
    minWidth: 0,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radius.md,
  },
  icon: {
    flexShrink: 0,
  },
  pressed: {
    opacity: 0.75,
  },
  text: {
    flexShrink: 1,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
});
