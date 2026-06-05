import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import { AppShell } from '@/components/app-shell';
import { DropdownSelect } from '@/components/ui/dropdown-select';
import { radius, spacing } from '@/constants/design';
import {
  languages,
  type ThemeMode,
  useAppPreferences,
} from '@/contexts/app-preferences';

const languageOptions = languages.map((item) => item.label);

export default function SettingsScreen() {
  const {
    colors,
    selectedLanguageLabel,
    setLanguageByLabel,
    setThemeMode,
    t,
    themeMode,
  } = useAppPreferences();
  const [notifications, setNotifications] = useState(true);
  const [languageMenuVisible, setLanguageMenuVisible] = useState(false);
  const themeOptions: { label: string; value: ThemeMode }[] = [
    { label: t('light'), value: 'light' },
    { label: t('dark'), value: 'dark' },
  ];
  const selectedThemeLabel = themeOptions.find((item) => item.value === themeMode)?.label ?? t('light');
  const isDarkMode = themeMode === 'dark';

  return (
    <AppShell title={t('settings')} subtitle={t('settingsSubtitle')}>
      <ScrollView contentContainerStyle={[styles.page, { backgroundColor: colors.background }]}>
        <View style={[styles.module, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.moduleTitle, { color: colors.text }]}>{t('language')}</Text>
          <DropdownSelect
            label={t('selectedLanguage')}
            options={languageOptions}
            value={selectedLanguageLabel}
            visible={languageMenuVisible}
            onOpen={() => setLanguageMenuVisible(true)}
            onClose={() => setLanguageMenuVisible(false)}
            onSelect={setLanguageByLabel}
          />
        </View>

        <View style={[styles.module, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.moduleTitle, { color: colors.text }]}>{t('appearance')}</Text>
          <View style={styles.segmented}>
            {themeOptions.map((option) => {
              const selected = themeMode === option.value;

              return (
                <Pressable
                  accessibilityRole="button"
                  key={option.value}
                  onPress={() => setThemeMode(option.value)}
                  style={[
                    styles.segment,
                    {
                      backgroundColor: selected ? colors.surfaceMuted : colors.background,
                      borderColor: selected ? colors.primary : colors.borderStrong,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.segmentText,
                      { color: selected ? colors.primary : colors.textMuted },
                    ]}>
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <View style={[styles.preview, isDarkMode && styles.previewDark]}>
            <Text style={[styles.previewTitle, isDarkMode && styles.previewTextDark]}>
              {t('preview')}
            </Text>
            <Text style={[styles.previewText, isDarkMode && styles.previewTextDark]}>
              {t('selectedMode')}: {selectedThemeLabel}
            </Text>
          </View>
        </View>

        <View style={[styles.module, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.moduleTitle, { color: colors.text }]}>{t('preferences')}</Text>
          <SettingRow
            label={t('notifications')}
            value={notifications}
            onValueChange={setNotifications}
          />
        </View>

        <View style={[styles.note, { backgroundColor: colors.surfaceMuted }]}>
          <Text style={[styles.noteTitle, { color: colors.text }]}>{t('currentState')}</Text>
          <Text style={[styles.noteText, { color: colors.textMuted }]}>
            {t('language')}: {selectedLanguageLabel} | {t('appearance')}: {selectedThemeLabel} |{' '}
            {t('notifications')}: {notifications ? t('active') : t('inactive')}
          </Text>
        </View>
      </ScrollView>
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
  const { colors } = useAppPreferences();

  return (
    <View
      style={[
        styles.row,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}>
      <Text style={[styles.rowText, { color: colors.text }]}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={colors.surface}
        trackColor={{ false: colors.borderStrong, true: colors.primary }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    gap: spacing.md,
    padding: spacing.md,
    paddingBottom: 96,
  },
  module: {
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  moduleTitle: {
    fontSize: 17,
    fontWeight: '800',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    minHeight: 58,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  rowText: {
    flex: 1,
    minWidth: 0,
    fontSize: 16,
    fontWeight: '700',
  },
  segmented: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  segment: {
    flex: 1,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 46,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  segmentText: {
    fontSize: 15,
    fontWeight: '800',
  },
  preview: {
    gap: 4,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: '#f4f7f6',
  },
  previewDark: {
    backgroundColor: '#101615',
  },
  previewTitle: {
    color: '#102027',
    fontSize: 15,
    fontWeight: '800',
  },
  previewText: {
    color: '#53635f',
    fontSize: 14,
    lineHeight: 20,
  },
  previewTextDark: {
    color: '#f4fbf9',
  },
  note: {
    gap: 6,
    padding: spacing.md,
    borderRadius: radius.md,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  noteText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
