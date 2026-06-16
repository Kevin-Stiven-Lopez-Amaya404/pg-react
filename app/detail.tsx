import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActionButton } from '@/components/ui/action-button';
import { radius, spacing } from '@/constants/design';
import { useAppPreferences } from '@/contexts/app-preferences';

export default function DetailScreen() {
  const { colors } = useAppPreferences();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.header,
          { backgroundColor: colors.surface, borderBottomColor: colors.border },
        ]}>
        <Pressable
          accessibilityLabel="Volver"
          onPress={() => router.back()}
          style={[styles.iconButton, { backgroundColor: colors.surfaceMuted }]}>
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Detalle</Text>
      </View>
      <ScrollView contentContainerStyle={styles.page}>
        <Text style={[styles.title, { color: colors.text }]}>Stack Navigation</Text>
        <Text style={[styles.text, { color: colors.textMuted }]}>
          Esta pantalla se abre encima de las tabs usando el Stack configurado en el layout raiz.
        </Text>
        <ActionButton label="Regresar" icon="arrow-back" onPress={() => router.back()} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 42,
    height: 42,
    flexShrink: 0,
    borderRadius: radius.md,
  },
  headerTitle: {
    flex: 1,
    minWidth: 0,
    fontSize: 20,
    fontWeight: '800',
  },
  page: {
    gap: spacing.md,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
  },
  text: {
    fontSize: 16,
    lineHeight: 23,
  },
});
