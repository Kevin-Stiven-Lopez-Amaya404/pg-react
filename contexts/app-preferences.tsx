import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

import { darkPalette, palette } from '@/constants/design';

export type LanguageCode = 'es' | 'en' | 'fr' | 'pt';
export type ThemeMode = 'light' | 'dark';

export const languages: { code: LanguageCode; label: string }[] = [
  { code: 'es', label: 'Espanol' },
  { code: 'en', label: 'Ingles' },
  { code: 'fr', label: 'Frances' },
  { code: 'pt', label: 'Portugues' },
];

const translations = {
  es: {
    home: 'Actividad stiven',
    profile: 'Perfil',
    profileSubtitle: 'Datos personales editables',
    settings: 'Configuracion',
    settingsSubtitle: 'Preferencias de la aplicacion',
    drawerMenu: 'Menu',
    drawerHome: 'Home',
    drawerProfile: 'Perfil',
    drawerSettings: 'Configuracion',
    drawerDetail: 'Detalle',
    language: 'Idioma',
    selectedLanguage: 'Idioma seleccionado',
    appearance: 'Apariencia',
    light: 'Claro',
    dark: 'Oscuro',
    preview: 'Vista previa',
    selectedMode: 'Modo seleccionado',
    preferences: 'Preferencias',
    notifications: 'Notificaciones',
    currentState: 'Estado actual',
    active: 'activas',
    inactive: 'inactivas',
  },
  en: {
    home: 'Stiven activity',
    profile: 'Profile',
    profileSubtitle: 'Editable personal data',
    settings: 'Settings',
    settingsSubtitle: 'Application preferences',
    drawerMenu: 'Menu',
    drawerHome: 'Home',
    drawerProfile: 'Profile',
    drawerSettings: 'Settings',
    drawerDetail: 'Detail',
    language: 'Language',
    selectedLanguage: 'Selected language',
    appearance: 'Appearance',
    light: 'Light',
    dark: 'Dark',
    preview: 'Preview',
    selectedMode: 'Selected mode',
    preferences: 'Preferences',
    notifications: 'Notifications',
    currentState: 'Current state',
    active: 'active',
    inactive: 'inactive',
  },
  fr: {
    home: 'Activite Stiven',
    profile: 'Profil',
    profileSubtitle: 'Donnees personnelles modifiables',
    settings: 'Configuration',
    settingsSubtitle: "Preferences de l'application",
    drawerMenu: 'Menu',
    drawerHome: 'Accueil',
    drawerProfile: 'Profil',
    drawerSettings: 'Configuration',
    drawerDetail: 'Detail',
    language: 'Langue',
    selectedLanguage: 'Langue selectionnee',
    appearance: 'Apparence',
    light: 'Clair',
    dark: 'Sombre',
    preview: 'Apercu',
    selectedMode: 'Mode selectionne',
    preferences: 'Preferences',
    notifications: 'Notifications',
    currentState: 'Etat actuel',
    active: 'actives',
    inactive: 'inactives',
  },
  pt: {
    home: 'Atividade Stiven',
    profile: 'Perfil',
    profileSubtitle: 'Dados pessoais editaveis',
    settings: 'Configuracao',
    settingsSubtitle: 'Preferencias do aplicativo',
    drawerMenu: 'Menu',
    drawerHome: 'Inicio',
    drawerProfile: 'Perfil',
    drawerSettings: 'Configuracao',
    drawerDetail: 'Detalhe',
    language: 'Idioma',
    selectedLanguage: 'Idioma selecionado',
    appearance: 'Aparencia',
    light: 'Claro',
    dark: 'Escuro',
    preview: 'Previa',
    selectedMode: 'Modo selecionado',
    preferences: 'Preferencias',
    notifications: 'Notificacoes',
    currentState: 'Estado atual',
    active: 'ativas',
    inactive: 'inativas',
  },
};

type AppPreferencesContextValue = {
  colors: typeof palette;
  language: LanguageCode;
  selectedLanguageLabel: string;
  setLanguage: (language: LanguageCode) => void;
  setLanguageByLabel: (label: string) => void;
  setThemeMode: (themeMode: ThemeMode) => void;
  t: (key: keyof typeof translations.es) => string;
  themeMode: ThemeMode;
};

const AppPreferencesContext = createContext<AppPreferencesContextValue | null>(null);

export function AppPreferencesProvider({ children }: PropsWithChildren) {
  const [language, setLanguage] = useState<LanguageCode>('es');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  const value = useMemo<AppPreferencesContextValue>(() => {
    const selectedLanguageLabel = languages.find((item) => item.code === language)?.label ?? languages[0].label;

    return {
      colors: themeMode === 'dark' ? darkPalette : palette,
      language,
      selectedLanguageLabel,
      setLanguage,
      setLanguageByLabel: (label: string) => {
        const nextLanguage = languages.find((item) => item.label === label);
        if (nextLanguage) setLanguage(nextLanguage.code);
      },
      setThemeMode,
      t: (key) => translations[language][key],
      themeMode,
    };
  }, [language, themeMode]);

  return <AppPreferencesContext.Provider value={value}>{children}</AppPreferencesContext.Provider>;
}

export function useAppPreferences() {
  const context = useContext(AppPreferencesContext);

  if (!context) {
    throw new Error('useAppPreferences debe usarse dentro de AppPreferencesProvider');
  }

  return context;
}
