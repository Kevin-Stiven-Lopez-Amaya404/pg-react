import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActionButton } from '@/components/ui/action-button';
import { radius, spacing } from '@/constants/design';
import { useAppPreferences } from '@/contexts/app-preferences';

export default function ModalScreen() {
  const { colors } = useAppPreferences();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View
          style={[
            styles.box,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}>
          <Text style={[styles.title, { color: colors.text }]}>Modal informativo</Text>
          <Text style={[styles.text, { color: colors.textMuted }]}>
            Pantalla modal configurada en el Stack. En Home tambien hay un modal nativo con
            apertura y cierre desde botones.
          </Text>
          <ActionButton label="Cerrar" icon="close" onPress={() => router.back()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  box: {
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
  },
  text: {
    fontSize: 16,
    lineHeight: 23,
  },
});
