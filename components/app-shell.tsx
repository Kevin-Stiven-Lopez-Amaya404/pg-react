import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { PropsWithChildren, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { palette, radius, spacing } from '@/constants/design';

type AppShellProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
}>;

const drawerItems = [
  { label: 'Home', icon: 'home', href: '/' },
  { label: 'Perfil', icon: 'person', href: '/profile' },
  { label: 'Configuracion', icon: 'settings', href: '/settings' },
  { label: 'Detalle', icon: 'article', href: '/detail' },
] as const;

export function AppShell({ title, subtitle, children }: AppShellProps) {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const goTo = (href: (typeof drawerItems)[number]['href']) => {
    setDrawerVisible(false);
    router.push(href);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable
          accessibilityLabel="Abrir menu lateral"
          onPress={() => setDrawerVisible(true)}
          style={styles.iconButton}>
          <MaterialIcons name="menu" size={24} color={palette.text} />
        </Pressable>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>{title}</Text>
          {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>

      <View style={styles.content}>{children}</View>

      <Modal transparent visible={drawerVisible} animationType="fade">
        <View style={styles.drawerLayer}>
          <Pressable style={styles.backdrop} onPress={() => setDrawerVisible(false)} />
          <SafeAreaView style={styles.drawer}>
            <Text style={styles.drawerTitle}>Menu</Text>
            {drawerItems.map((item) => (
              <Pressable key={item.href} onPress={() => goTo(item.href)} style={styles.drawerItem}>
                <MaterialIcons name={item.icon} size={22} color={palette.primary} />
                <Text style={styles.drawerText}>{item.label}</Text>
              </Pressable>
            ))}
          </SafeAreaView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
  titleBlock: {
    flex: 1,
  },
  title: {
    color: palette.text,
    fontSize: 20,
    fontWeight: '700',
  },
  subtitle: {
    color: palette.textMuted,
    fontSize: 13,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  drawerLayer: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: palette.overlay,
  },
  drawer: {
    width: 290,
    maxWidth: '82%',
    backgroundColor: palette.surface,
    paddingHorizontal: spacing.lg,
    paddingTop: 16,
    borderRightColor: palette.border,
    borderRightWidth: 1,
    elevation: 8,
  },
  drawerTitle: {
    color: palette.text,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 18,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: 14,
    borderBottomColor: palette.border,
    borderBottomWidth: 1,
  },
  drawerText: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '600',
  },
});
