import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { PropsWithChildren, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { radius, spacing } from '@/constants/design';
import { useAppPreferences } from '@/contexts/app-preferences';

type AppShellProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
}>;

const drawerItems = [
  { labelKey: 'drawerHome', icon: 'home', href: '/' },
  { labelKey: 'drawerProfile', icon: 'person', href: '/profile' },
  { labelKey: 'drawerSettings', icon: 'settings', href: '/settings' },
  { labelKey: 'drawerDetail', icon: 'article', href: '/detail' },
] as const;

export function AppShell({ title, subtitle, children }: AppShellProps) {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { width } = useWindowDimensions();
  const { colors, t } = useAppPreferences();
  const drawerWidth = Math.min(290, Math.max(240, width * 0.82));

  const goTo = (href: (typeof drawerItems)[number]['href']) => {
    setDrawerVisible(false);
    router.push(href);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.header,
          { backgroundColor: colors.surface, borderBottomColor: colors.border },
        ]}>
        <Pressable
          accessibilityLabel="Abrir menu lateral"
          onPress={() => setDrawerVisible(true)}
          style={[styles.iconButton, { backgroundColor: colors.surfaceMuted }]}>
          <MaterialIcons name="menu" size={24} color={colors.text} />
        </Pressable>
        <View style={styles.titleBlock}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          {!!subtitle && <Text style={[styles.subtitle, { color: colors.textMuted }]}>{subtitle}</Text>}
        </View>
      </View>

      <View style={styles.content}>{children}</View>

      <Modal transparent visible={drawerVisible} animationType="fade">
        <View style={styles.drawerLayer}>
          <Pressable
            style={[styles.backdrop, { backgroundColor: colors.overlay }]}
            onPress={() => setDrawerVisible(false)}
          />
          <SafeAreaView
            style={[
              styles.drawer,
              { width: drawerWidth, backgroundColor: colors.surface, borderRightColor: colors.border },
            ]}>
            <ScrollView contentContainerStyle={styles.drawerContent}>
              <Text style={[styles.drawerTitle, { color: colors.text }]}>{t('drawerMenu')}</Text>
              {drawerItems.map((item) => (
                <Pressable
                  key={item.href}
                  onPress={() => goTo(item.href)}
                  style={[styles.drawerItem, { borderBottomColor: colors.border }]}>
                  <MaterialIcons name={item.icon} size={22} color={colors.primary} style={styles.drawerIcon} />
                  <Text style={[styles.drawerText, { color: colors.text }]}>{t(item.labelKey)}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </SafeAreaView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
  titleBlock: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    flexShrink: 1,
    fontSize: 20,
    fontWeight: '700',
  },
  subtitle: {
    flexShrink: 1,
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
  },
  drawer: {
    maxWidth: '92%',
    borderRightWidth: 1,
    elevation: 8,
  },
  drawerContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: 16,
    paddingBottom: spacing.xl,
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 18,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    minWidth: 0,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  drawerIcon: {
    flexShrink: 0,
  },
  drawerText: {
    flex: 1,
    minWidth: 0,
    fontSize: 16,
    fontWeight: '600',
  },
});
