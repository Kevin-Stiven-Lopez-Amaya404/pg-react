import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { AppShell } from '@/components/app-shell';
import { ActionButton } from '@/components/ui/action-button';
import { radius, spacing } from '@/constants/design';
import { useAppPreferences } from '@/contexts/app-preferences';

export default function ProfileScreen() {
  const { colors, t } = useAppPreferences();
  const [name, setName] = useState('Stiven');
  const [email, setEmail] = useState('stiven@email.com');
  const [program, setProgram] = useState('React Native');
  const [city, setCity] = useState('Bogota');

  return (
    <AppShell title={t('profile')} subtitle={t('profileSubtitle')}>
      <ScrollView contentContainerStyle={[styles.page, { backgroundColor: colors.background }]}>
        <View style={[styles.avatar, { backgroundColor: colors.surfaceMuted }]}>
          <MaterialIcons name="person" size={42} color={colors.primary} />
        </View>

        <View style={styles.summary}>
          <Text style={[styles.title, { color: colors.text }]}>{name || 'Nombre del perfil'}</Text>
          <Text style={[styles.text, { color: colors.textMuted }]}>
            {program || 'Programa'} | {city || 'Ciudad'}
          </Text>
          <Text style={[styles.email, { color: colors.primary }]}>{email || 'correo@ejemplo.com'}</Text>
        </View>

        <View
          style={[
            styles.form,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}>
          <ProfileInput label="Nombre" value={name} onChangeText={setName} placeholder="Escribe tu nombre" />
          <ProfileInput
            label="Correo"
            value={email}
            onChangeText={setEmail}
            placeholder="correo@ejemplo.com"
            keyboardType="email-address"
          />
          <ProfileInput
            label="Programa"
            value={program}
            onChangeText={setProgram}
            placeholder="Ej: React Native"
          />
          <ProfileInput label="Ciudad" value={city} onChangeText={setCity} placeholder="Ej: Bogota" />
        </View>

        <ActionButton label="Ver detalle" icon="open-in-new" onPress={() => router.push('/detail')} />
      </ScrollView>
    </AppShell>
  );
}

function ProfileInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  keyboardType?: 'default' | 'email-address';
}) {
  const { colors } = useAppPreferences();

  return (
    <View style={styles.field}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TextInput
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#7b8b87"
        style={[
          styles.input,
          {
            backgroundColor: colors.background,
            borderColor: colors.borderStrong,
            color: colors.text,
          },
        ]}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    flexGrow: 1,
    gap: spacing.md,
    padding: spacing.lg,
    paddingBottom: 96,
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  summary: {
    alignItems: 'center',
    gap: spacing.xs,
    width: '100%',
  },
  title: {
    maxWidth: 520,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  text: {
    maxWidth: 520,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  email: {
    maxWidth: 520,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  form: {
    gap: spacing.md,
    width: '100%',
    maxWidth: 520,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  field: {
    gap: spacing.xs,
  },
  label: {
    fontSize: 14,
    fontWeight: '800',
  },
  input: {
    minHeight: 48,
    width: '100%',
    paddingHorizontal: 12,
    borderRadius: radius.md,
    borderWidth: 1,
  },
});
