import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { palette, radius } from '@/constants/design';

type IconName = ComponentProps<typeof MaterialIcons>['name'];

type ActionButtonProps = {
  label: string;
  onPress: () => void;
  icon?: IconName;
  variant?: 'primary' | 'soft' | 'outline';
};

export function ActionButton({ label, onPress, icon, variant = 'primary' }: ActionButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        pressed && styles.pressed,
      ]}>
      {!!icon && (
        <MaterialIcons
          name={icon}
          size={19}
          color={isPrimary ? palette.surface : palette.primary}
          style={styles.icon}
        />
      )}
      <Text style={[styles.text, isPrimary ? styles.primaryText : styles.secondaryText]}>{label}</Text>
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
  primary: {
    backgroundColor: palette.primary,
  },
  soft: {
    backgroundColor: palette.surfaceMuted,
  },
  outline: {
    backgroundColor: palette.surface,
    borderColor: palette.borderStrong,
    borderWidth: 1,
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
  primaryText: {
    color: palette.surface,
  },
  secondaryText: {
    color: palette.primary,
  },
});
