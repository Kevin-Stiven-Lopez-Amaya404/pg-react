import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActionButton } from '@/components/ui/action-button';
import { palette, radius, spacing } from '@/constants/design';

export default function ModalScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.box}>
        <Text style={styles.title}>Modal informativo</Text>
        <Text style={styles.text}>
          Pantalla modal configurada en el Stack. En Home tambien hay un modal nativo con
          apertura y cierre desde botones.
        </Text>
        <ActionButton label="Cerrar" icon="close" onPress={() => router.back()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: palette.background,
  },
  box: {
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: palette.surface,
    borderColor: palette.border,
    borderWidth: 1,
  },
  title: {
    color: palette.text,
    fontSize: 22,
    fontWeight: '800',
  },
  text: {
    color: palette.textMuted,
    fontSize: 16,
    lineHeight: 23,
  },
});
