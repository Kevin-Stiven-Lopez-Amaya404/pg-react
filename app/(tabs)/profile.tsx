import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AppShell } from '@/components/app-shell';
import { ActionButton } from '@/components/ui/action-button';
import { palette, spacing } from '@/constants/design';

export default function ProfileScreen() {
  return (
    <AppShell title="Perfil" subtitle="Pantalla conectada al bottom menu">
      <View style={styles.page}>
        <View style={styles.avatar}>
          <MaterialIcons name="person" size={42} color={palette.primary} />
        </View>
        <Text style={styles.title}>Aprendiz React Native</Text>
        <Text style={styles.text}>
          Esta vista evidencia el cambio de pantalla usando Bottom Tabs y el drawer lateral.
        </Text>
        <ActionButton label="Ver detalle" icon="open-in-new" onPress={() => router.push('/detail')} />
      </View>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: palette.surfaceMuted,
  },
  title: {
    color: palette.text,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  text: {
    color: palette.textMuted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
});
