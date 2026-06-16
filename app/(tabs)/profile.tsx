import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { memo, useCallback, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { AppShell } from '@/components/app-shell';
import { ActionButton } from '@/components/ui/action-button';
import { SectionCard } from '@/components/ui/section-card';
import { radius, spacing } from '@/constants/design';
import { useAppPreferences } from '@/contexts/app-preferences';

type ProfileData = {
  bio: string;
  city: string;
  email: string;
  name: string;
  phone: string;
  program: string;
};

type ProfileFieldKey = keyof ProfileData;

type ProfileField = {
  key: ProfileFieldKey;
  label: string;
  placeholder: string;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  multiline?: boolean;
};

const initialProfile: ProfileData = {
  bio: 'Estudiante enfocado en crear interfaces moviles claras y faciles de usar.',
  city: 'Bogota',
  email: 'stiven@email.com',
  name: 'Stiven',
  phone: '300 123 4567',
  program: 'React Native',
};

const mainFields: ProfileField[] = [
  { key: 'name', label: 'Nombre', placeholder: 'Escribe tu nombre' },
  { key: 'email', label: 'Correo', placeholder: 'correo@ejemplo.com', keyboardType: 'email-address' },
  { key: 'program', label: 'Programa', placeholder: 'Ej: React Native' },
  { key: 'city', label: 'Ciudad', placeholder: 'Ej: Bogota' },
  { key: 'phone', label: 'Telefono', placeholder: 'Ej: 300 123 4567', keyboardType: 'phone-pad' },
];

const imagePickerOptions: ImagePicker.ImagePickerOptions = {
  allowsEditing: true,
  aspect: [1, 1],
  mediaTypes: ['images'],
  quality: 0.85,
};

export default function ProfileScreen() {
  const { colors, t } = useAppPreferences();
  const [profile, setProfile] = useState(initialProfile);
  const [profileImage, setProfileImage] = useState('');

  const updateField = useCallback((key: ProfileFieldKey, value: string) => {
    setProfile((current) => ({ ...current, [key]: value }));
  }, []);

  const pickProfileImage = useCallback(async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permiso requerido', 'Necesitas permitir el acceso a la galeria para elegir una foto.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync(imagePickerOptions);

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  }, []);

  const clearProfile = useCallback(() => {
    setProfile({
      bio: '',
      city: '',
      email: '',
      name: '',
      phone: '',
      program: '',
    });
    setProfileImage('');
  }, []);

  const clearProfileImage = useCallback(() => setProfileImage(''), []);
  const openDetail = useCallback(() => router.push('/detail'), []);

  return (
    <AppShell title={t('profile')} subtitle={t('profileSubtitle')}>
      <ScrollView contentContainerStyle={[styles.page, { backgroundColor: colors.background }]}>
        <View style={[styles.hero, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.heroTop}>
            <AvatarButton imageUri={profileImage} name={profile.name} onPress={pickProfileImage} />

            <View style={styles.summary}>
              <Text style={[styles.eyebrow, { color: colors.primary }]}>Perfil personal</Text>
              <Text style={[styles.title, { color: colors.text }]}>{profile.name || 'Nombre del perfil'}</Text>
              <Text style={[styles.text, { color: colors.textMuted }]}>
                {profile.program || 'Programa'} | {profile.city || 'Ciudad'}
              </Text>
              <Text style={[styles.email, { color: colors.primary }]}>{profile.email || 'correo@ejemplo.com'}</Text>
            </View>
          </View>

          <Text style={[styles.bioPreview, { color: colors.textMuted }]}>
            {profile.bio || 'Agrega una descripcion corta.'}
          </Text>

          <View style={styles.photoActions}>
            <Pressable
              accessibilityRole="button"
              onPress={pickProfileImage}
              style={({ pressed }) => [
                styles.photoButton,
                { backgroundColor: colors.surfaceMuted, borderColor: colors.border },
                pressed && styles.pressed,
              ]}>
              <MaterialIcons name="photo-library" size={18} color={colors.primary} />
              <Text style={[styles.photoButtonText, { color: colors.primary }]}>Cambiar foto</Text>
            </Pressable>
            {!!profileImage && (
              <Pressable
                accessibilityRole="button"
                onPress={clearProfileImage}
                style={({ pressed }) => [
                  styles.photoButton,
                  { backgroundColor: colors.surfaceMuted, borderColor: colors.border },
                  pressed && styles.pressed,
                ]}>
                <MaterialIcons name="delete-outline" size={18} color={colors.primary} />
                <Text style={[styles.photoButtonText, { color: colors.primary }]}>Quitar foto</Text>
              </Pressable>
            )}
          </View>
        </View>

        <SectionCard title="Datos principales" description="Edita la informacion que aparece en el resumen superior.">
          <View style={styles.formGrid}>
            {mainFields.map((field) => (
              <ProfileInput
                key={field.key}
                fieldKey={field.key}
                label={field.label}
                placeholder={field.placeholder}
                keyboardType={field.keyboardType}
                onUpdate={updateField}
                value={profile[field.key]}
              />
            ))}
          </View>
        </SectionCard>

        <SectionCard title="Descripcion" description="Agrega una presentacion breve para completar el perfil.">
          <ProfileInput
            fieldKey="bio"
            label="Sobre mi"
            onUpdate={updateField}
            placeholder="Escribe una descripcion corta"
            value={profile.bio}
            multiline
          />
        </SectionCard>

        <View style={styles.actions}>
          <ActionButton label="Ver detalle" icon="open-in-new" onPress={openDetail} />
          <ActionButton label="Limpiar campos" icon="refresh" onPress={clearProfile} variant="outline" />
        </View>
      </ScrollView>
    </AppShell>
  );
}

const AvatarButton = memo(function AvatarButton({
  imageUri,
  name,
  onPress,
  size = 'large',
}: {
  imageUri: string;
  name: string;
  onPress: () => void;
  size?: 'large' | 'small';
}) {
  const { colors } = useAppPreferences();
  const initials = useMemo(
    () =>
      name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join(''),
    [name],
  );
  const avatarSize = size === 'large' ? styles.avatarLarge : styles.avatarSmall;
  const iconSize = size === 'large' ? 42 : 30;

  return (
    <Pressable
      accessibilityLabel="Elegir foto de perfil"
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.avatarButton, pressed && styles.pressed]}>
      <View
        style={[
          styles.avatar,
          avatarSize,
          { backgroundColor: colors.surfaceMuted, borderColor: colors.borderStrong },
        ]}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.avatarImage} contentFit="cover" transition={150} />
        ) : initials ? (
          <Text style={[styles.initials, { color: colors.primary }]}>{initials}</Text>
        ) : (
          <MaterialIcons name="person" size={iconSize} color={colors.primary} />
        )}
        <View style={[styles.cameraBadge, { backgroundColor: colors.primary, borderColor: colors.surface }]}>
          <MaterialIcons name="photo-camera" size={15} color={colors.surface} />
        </View>
      </View>
    </Pressable>
  );
});

const ProfileInput = memo(function ProfileInput({
  fieldKey,
  label,
  onUpdate,
  placeholder,
  value,
  keyboardType = 'default',
  multiline = false,
}: {
  fieldKey: ProfileFieldKey;
  label: string;
  onUpdate: (key: ProfileFieldKey, value: string) => void;
  placeholder: string;
  value: string;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  multiline?: boolean;
}) {
  const { colors } = useAppPreferences();
  const handleChangeText = useCallback((nextValue: string) => onUpdate(fieldKey, nextValue), [fieldKey, onUpdate]);

  return (
    <View style={styles.field}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TextInput
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
        keyboardType={keyboardType}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        placeholderTextColor="#7b8b87"
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        style={[
          styles.input,
          multiline && styles.inputMultiline,
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
});

const styles = StyleSheet.create({
  page: {
    alignItems: 'stretch',
    flexGrow: 1,
    gap: spacing.md,
    padding: spacing.lg,
    paddingBottom: 96,
  },
  hero: {
    gap: spacing.md,
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  heroTop: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
  },
  avatarButton: {
    alignSelf: 'flex-start',
    borderRadius: 52,
  },
  avatarLarge: {
    width: 104,
    height: 104,
    borderRadius: 52,
  },
  avatarSmall: {
    width: 76,
    height: 76,
    borderRadius: 38,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  cameraBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 4,
    bottom: 4,
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
  },
  initials: {
    fontSize: 28,
    fontWeight: '900',
  },
  summary: {
    alignItems: 'flex-start',
    flex: 1,
    gap: spacing.xs,
    minWidth: 220,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  title: {
    maxWidth: 560,
    fontSize: 22,
    fontWeight: '800',
  },
  text: {
    maxWidth: 560,
    fontSize: 15,
    lineHeight: 22,
  },
  email: {
    maxWidth: 560,
    fontSize: 14,
    fontWeight: '700',
  },
  bioPreview: {
    maxWidth: 620,
    fontSize: 14,
    lineHeight: 21,
  },
  formGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  photoActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  photoButton: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    minHeight: 40,
    paddingHorizontal: 12,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  photoButtonText: {
    fontSize: 14,
    fontWeight: '800',
  },
  actions: {
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    width: '100%',
    maxWidth: 720,
  },
  field: {
    flexGrow: 1,
    flexBasis: 250,
    gap: spacing.xs,
    minWidth: 0,
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
  inputMultiline: {
    minHeight: 96,
    paddingTop: 12,
  },
  pressed: {
    opacity: 0.75,
  },
});
