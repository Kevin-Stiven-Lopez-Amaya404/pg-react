import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { radius, spacing } from '@/constants/design';
import { useAppPreferences } from '@/contexts/app-preferences';

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
  const { colors } = useAppPreferences();

  return (
    <>
      <Pressable
        accessibilityRole="button"
        style={[
          styles.button,
          {
            backgroundColor: colors.background,
            borderColor: colors.borderStrong,
          },
        ]}
        onPress={onOpen}>
        <View style={styles.textBlock}>
          <Text style={[styles.label, { color: colors.textMuted }]}>{label}</Text>
          <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-down" size={24} color={colors.primary} />
      </Pressable>

      <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
        <Pressable style={[styles.layer, { backgroundColor: colors.overlay }]} onPress={onClose}>
          <View style={[styles.menu, { backgroundColor: colors.surface }]}>
            {options.map((option) => (
              <Pressable
                key={option}
                style={[styles.option, { borderBottomColor: colors.border }]}
                onPress={() => {
                  onSelect(option);
                  onClose();
                }}>
                <Text style={[styles.optionText, { color: colors.text }]}>{option}</Text>
                {value === option && <MaterialIcons name="check" size={20} color={colors.primary} />}
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
    gap: spacing.sm,
    minHeight: 58,
    minWidth: 0,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  textBlock: {
    flex: 1,
    minWidth: 0,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
  },
  value: {
    flexShrink: 1,
    fontSize: 16,
    fontWeight: '700',
  },
  layer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  menu: {
    width: '100%',
    maxWidth: 380,
    maxHeight: '86%',
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  option: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  optionText: {
    flex: 1,
    minWidth: 0,
    fontSize: 16,
    fontWeight: '600',
  },
});
