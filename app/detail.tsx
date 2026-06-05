import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActionButton } from '@/components/ui/action-button';
import { palette, radius, spacing } from '@/constants/design';

export default function DetailScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable accessibilityLabel="Volver" onPress={() => router.back()} style={styles.iconButton}>
          <MaterialIcons name="arrow-back" size={24} color={palette.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Detalle</Text>
      </View>
      <View style={styles.page}>
        <Text style={styles.title}>Stack Navigation</Text>
        <Text style={styles.text}>
          Esta pantalla se abre encima de las tabs usando el Stack configurado en el layout raiz.
        </Text>
        <ActionButton label="Regresar" icon="arrow-back" onPress={() => router.back()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: palette.surface,
    borderBottomColor: palette.border,
    borderBottomWidth: 1,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 42,
    height: 42,
    borderRadius: radius.md,
    backgroundColor: palette.surfaceMuted,
  },
  headerTitle: {
    color: palette.text,
    fontSize: 20,
    fontWeight: '800',
  },
  page: {
    gap: spacing.md,
    padding: spacing.lg,
  },
  title: {
    color: palette.text,
    fontSize: 24,
    fontWeight: '800',
  },
  text: {
    color: palette.textMuted,
    fontSize: 16,
    lineHeight: 23,
  },
});
