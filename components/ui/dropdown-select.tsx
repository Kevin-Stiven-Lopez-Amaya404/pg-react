import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { palette, radius, spacing } from '@/constants/design';

type DropdownSelectProps = {
  label: string;
  options: string[];
  value: string;
  visible: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelect: (value: string) => void;
};

export function DropdownSelect({
  label,
  options,
  value,
  visible,
  onOpen,
  onClose,
  onSelect,
}: DropdownSelectProps) {
  return (
    <>
      <Pressable accessibilityRole="button" style={styles.button} onPress={onOpen}>
        <View>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-down" size={24} color={palette.primary} />
      </Pressable>

      <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
        <Pressable style={styles.layer} onPress={onClose}>
          <View style={styles.menu}>
            {options.map((option) => (
              <Pressable
                key={option}
                style={styles.option}
                onPress={() => {
                  onSelect(option);
                  onClose();
                }}>
                <Text style={styles.optionText}>{option}</Text>
                {value === option && <MaterialIcons name="check" size={20} color={palette.primary} />}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 58,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderColor: palette.borderStrong,
    borderWidth: 1,
    backgroundColor: palette.background,
  },
  label: {
    color: palette.textMuted,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
  },
  value: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '700',
  },
  layer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: palette.overlay,
  },
  menu: {
    width: '100%',
    maxWidth: 380,
    borderRadius: radius.lg,
    backgroundColor: palette.surface,
    overflow: 'hidden',
  },
  option: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomColor: palette.border,
    borderBottomWidth: 1,
  },
  optionText: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '600',
  },
});
