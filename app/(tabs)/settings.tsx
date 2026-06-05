import { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';

import { AppShell } from '@/components/app-shell';
import { palette, radius, spacing } from '@/constants/design';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  return (
    <AppShell title="Configuracion" subtitle="Opciones simples con estado local">
      <View style={styles.page}>
        <SettingRow
          label="Notificaciones"
          value={notifications}
          onValueChange={setNotifications}
        />
        <SettingRow label="Modo compacto" value={compactMode} onValueChange={setCompactMode} />
        <Pressable style={styles.note}>
          <Text style={styles.noteTitle}>Estado actual</Text>
          <Text style={styles.noteText}>
            Notificaciones: {notifications ? 'activas' : 'inactivas'} | Modo compacto:{' '}
            {compactMode ? 'activo' : 'inactivo'}
          </Text>
        </Pressable>
      </View>
    </AppShell>
  );
}

function SettingRow({
  label,
  value,
  onValueChange,
}: {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowText}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={palette.surface}
        trackColor={{ false: palette.borderStrong, true: palette.primary }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    gap: 12,
    padding: spacing.md,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 58,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    backgroundColor: palette.surface,
    borderColor: palette.border,
    borderWidth: 1,
  },
  rowText: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '700',
  },
  note: {
    gap: 6,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: palette.surfaceMuted,
  },
  noteTitle: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '800',
  },
  noteText: {
    color: palette.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
});
