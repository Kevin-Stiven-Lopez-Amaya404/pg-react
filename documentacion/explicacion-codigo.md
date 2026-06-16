# Explicacion del codigo actualizado

## 1. Proposito de este documento

Este documento explica los elementos usados en el proyecto y como se conecta cada parte del codigo.

La idea es que puedas explicar el proyecto sin depender de comentarios largos dentro del codigo. Por eso el codigo quedo mas limpio y la explicacion detallada queda aqui, en la carpeta `documentacion`.

## 2. Tecnologias usadas

El proyecto usa:

- `Expo`: entorno para ejecutar la aplicacion.
- `React Native`: framework para crear la interfaz.
- `Expo Router`: navegacion basada en archivos.
- `expo-image-picker`: seleccion de imagenes desde la galeria del dispositivo.
- `TypeScript`: tipado para evitar errores comunes.
- `React Hooks`: manejo de estado y referencias.
- `Context API`: estado global de idioma y tema.
- `MaterialIcons`: iconos en botones, tabs y menus.

## 3. Arquitectura del codigo

La arquitectura esta basada en componentes.

La estructura principal es:

```txt
app/
  _layout.tsx
  detail.tsx
  modal.tsx
  (tabs)/
    _layout.tsx
    index.tsx
    profile.tsx
    settings.tsx

components/
  app-shell.tsx
  activities/
  ui/

contexts/
  app-preferences.tsx

constants/
  activity-data.ts
  design.ts
```

Cada carpeta tiene una responsabilidad:

- `app/`: pantallas y rutas.
- `components/activities/`: actividades de la pantalla principal.
- `components/ui/`: componentes reutilizables.
- `contexts/`: estado global.
- `constants/`: datos y estilos compartidos.

## 4. Navegacion principal

Archivo: `app/_layout.tsx`

```tsx
export default function RootLayout() {
  return (
    <AppPreferencesProvider>
      <RootNavigation />
    </AppPreferencesProvider>
  );
}
```

Explicacion:

- `AppPreferencesProvider` envuelve toda la app.
- Gracias a eso, cualquier pantalla puede leer el idioma, el tema y los colores.
- `RootNavigation` contiene el Stack principal.

```tsx
<Stack>
  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  <Stack.Screen name="detail" options={{ headerShown: false }} />
  <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal informativo' }} />
</Stack>
```

Explicacion:

- `(tabs)` agrupa las pantallas del menu inferior.
- `detail` abre una pantalla normal.
- `modal` abre una pantalla como modal.

## 5. Tabs inferiores

Archivo: `app/(tabs)/_layout.tsx`

```tsx
const { colors, t } = useAppPreferences();
```

Explicacion:

- `colors` trae los colores del tema activo.
- `t()` trae textos segun el idioma seleccionado.

```tsx
<Tabs.Screen
  name="profile"
  options={{
    title: t('profile'),
    tabBarIcon: ({ color }) => <MaterialIcons name="person" size={24} color={color} />,
  }}
/>
```

Explicacion:

- `name="profile"` conecta con `app/(tabs)/profile.tsx`.
- El titulo cambia con el idioma.
- El icono se renderiza con `MaterialIcons`.

## 6. Pantalla Home

Archivo: `app/(tabs)/index.tsx`

Home organiza todas las actividades.

```tsx
const { colors, t } = useAppPreferences();
const { width } = useWindowDimensions();
const listRef = useRef<ScrollLoadingListHandle>(null);
```

Explicacion:

- `useAppPreferences()` trae tema e idioma.
- `useWindowDimensions()` ayuda a adaptar la pantalla.
- `useRef()` permite llamar funciones de la lista dinamica.

```tsx
const openDetail = () => router.push('/detail');
const openModal = () => router.push('/modal');
```

Explicacion:

- `openDetail` abre la pantalla de detalle.
- `openModal` abre la pantalla modal.

```tsx
<ButtonsDemo onOpenDetail={openDetail} />
<ModalDemo />
<DropdownDemo />
<CalculatorCard />
<ScrollLoadingList ref={listRef} />
```

Explicacion:

- Home no contiene toda la logica.
- Solo organiza las actividades.
- Cada actividad vive en su propio archivo.

## 7. AppShell

Archivo: `components/app-shell.tsx`

`AppShell` es el contenedor visual general.

Incluye:

- Area segura con `SafeAreaView`.
- Header.
- Titulo y subtitulo.
- Boton de menu.
- Drawer lateral.
- Contenido interno de cada pantalla.

Fragmento importante:

```tsx
const { colors, t } = useAppPreferences();
```

Explicacion:

- El shell usa los colores del tema.
- Tambien traduce textos del drawer.

```tsx
const drawerWidth = Math.min(290, Math.max(240, width * 0.82));
```

Explicacion:

- Calcula el ancho del drawer segun el tamano de pantalla.
- Evita que el menu lateral se vea recortado.

## 8. Componentes UI reutilizables

### ActionButton

Archivo: `components/ui/action-button.tsx`

Sirve para crear botones con un estilo uniforme.

```tsx
type ActionButtonProps = {
  label: string;
  onPress: () => void;
  icon?: IconName;
  variant?: 'primary' | 'soft' | 'outline';
};
```

Explicacion:

- `label`: texto del boton.
- `onPress`: funcion que se ejecuta al tocar.
- `icon`: icono opcional.
- `variant`: estilo del boton.

```tsx
const variantStyle = {
  primary: { backgroundColor: colors.primary },
  soft: { backgroundColor: colors.surfaceMuted },
  outline: {
    backgroundColor: colors.surface,
    borderColor: colors.borderStrong,
    borderWidth: 1,
  },
}[variant];
```

Explicacion:

- El boton cambia de color segun su variante.
- Tambien respeta el modo claro u oscuro.

### SectionCard

Archivo: `components/ui/section-card.tsx`

Sirve para mostrar cada actividad dentro de una tarjeta.

```tsx
type SectionCardProps = {
  title: string;
  description?: string;
  children: ReactNode;
};
```

Explicacion:

- `title`: titulo de la tarjeta.
- `description`: descripcion opcional.
- `children`: contenido interno de la tarjeta.

```tsx
<View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
```

Explicacion:

- La tarjeta toma colores del tema global.
- Eso permite que funcione en modo claro y oscuro.

### DropdownSelect

Archivo: `components/ui/dropdown-select.tsx`

Sirve para seleccionar una opcion desde un modal.

Se usa en:

- Actividad de dropdown.
- Configuracion para elegir idioma.

## 9. Actividad 1: Uso de botones

Archivo: `components/activities/buttons-demo.tsx`

```tsx
const [message, setMessage] = useState('Presiona un boton para ver la interaccion.');
```

Explicacion:

- `message` guarda el texto que se muestra.
- `setMessage` actualiza el texto.

```tsx
<ActionButton
  label="Saludar"
  icon="waving-hand"
  onPress={() => setMessage('Hola, el boton esta funcionando.')}
/>
```

Explicacion:

- Al presionar el boton, cambia el mensaje.
- Se usa `ActionButton`, no un boton repetido manualmente.

```tsx
<ActionButton label="Detalle" icon="open-in-new" variant="outline" onPress={onOpenDetail} />
```

Explicacion:

- Este boton usa una funcion recibida por props.
- Esa funcion abre la pantalla `/detail`.

## 10. Actividad 2: Modal

Archivo: `components/activities/modal-demo.tsx`

```tsx
const [visible, setVisible] = useState(false);
```

Explicacion:

- Controla si el modal esta abierto o cerrado.

```tsx
<Modal transparent visible={visible} animationType="slide" onRequestClose={() => setVisible(false)}>
```

Explicacion:

- `Modal` crea una ventana emergente.
- `visible` decide si aparece.
- `animationType="slide"` agrega animacion.
- `onRequestClose` permite cerrar en Android.

## 11. Actividad 3: Dropdown

Archivo: `components/activities/dropdown-demo.tsx`

```tsx
const [visible, setVisible] = useState(false);
const [selectedCourse, setSelectedCourse] = useState(courseOptions[0]);
```

Explicacion:

- `visible` controla si el selector esta abierto.
- `selectedCourse` guarda la opcion elegida.

```tsx
<DropdownSelect
  label="Tema seleccionado"
  options={courseOptions}
  value={selectedCourse}
  visible={visible}
  onOpen={() => setVisible(true)}
  onClose={() => setVisible(false)}
  onSelect={setSelectedCourse}
/>
```

Explicacion:

- El componente recibe opciones y funciones.
- Cuando se selecciona una opcion, se actualiza el estado.

## 12. Actividad 4: Calculadora

Archivo: `components/activities/calculator-card.tsx`

```tsx
const [firstValue, setFirstValue] = useState('');
const [secondValue, setSecondValue] = useState('');
const [operation, setOperation] = useState<CalculatorOperation>('sum');
```

Explicacion:

- Guarda los dos numeros.
- Guarda la operacion seleccionada.

```tsx
const result = useMemo(() => calculate(firstValue, secondValue, operation), [
  firstValue,
  operation,
  secondValue,
]);
```

Explicacion:

- Calcula el resultado solo cuando cambian los datos necesarios.

```tsx
if (operation === 'div' && b === 0) {
  return 'No se puede dividir entre cero.';
}
```

Explicacion:

- Evita dividir entre cero.

## 13. Actividad 5: Scroll Loading

Archivo: `components/activities/scroll-loading-list.tsx`

```tsx
const [items, setItems] = useState(() => createListItems(1, 12));
const [loading, setLoading] = useState(false);
const loadingRef = useRef(false);
```

Explicacion:

- `items` contiene los registros.
- `loading` muestra el indicador de carga.
- `loadingRef` evita cargas duplicadas.

```tsx
setItems((current) => [...current, ...createListItems(current.length + 1, 7)]);
```

Explicacion:

- Agrega 7 registros nuevos.
- Mantiene los registros anteriores.

```tsx
useImperativeHandle(ref, () => ({ loadMore }));
```

Explicacion:

- Permite que Home pueda llamar `loadMore()` desde afuera.

## 14. Perfil editable

Archivo: `app/(tabs)/profile.tsx`

```tsx
const [name, setName] = useState('Stiven');
const [email, setEmail] = useState('stiven@email.com');
const [program, setProgram] = useState('React Native');
const [city, setCity] = useState('Bogota');
const [phone, setPhone] = useState('300 123 4567');
const [profileImage, setProfileImage] = useState('');
const [bio, setBio] = useState('Estudiante enfocado en crear interfaces moviles claras y faciles de usar.');
```

Explicacion:

- Cada dato del perfil tiene su propio estado.
- Al editar un campo, el resumen se actualiza.
- `profileImage` guarda la imagen seleccionada desde la galeria.
- `bio` guarda la descripcion que aparece en el resumen.

```tsx
const pickProfileImage = async () => {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    Alert.alert('Permiso requerido', 'Necesitas permitir el acceso a la galeria para elegir una foto.');
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [1, 1],
    mediaTypes: ['images'],
    quality: 0.85,
  });

  if (!result.canceled) {
    setProfileImage(result.assets[0].uri);
  }
};
```

Explicacion:

- Primero solicita permiso para acceder a la galeria.
- Si el permiso no se concede, muestra una alerta.
- Si el permiso se concede, abre la galeria del dispositivo.
- `allowsEditing` permite recortar la imagen antes de usarla.
- `aspect: [1, 1]` mantiene formato cuadrado para el avatar.
- Cuando se elige una imagen, se guarda su `uri` en `profileImage`.

```tsx
<AvatarButton imageUri={profileImage} name={name} onPress={pickProfileImage} />
```

Explicacion:

- `AvatarButton` muestra la foto del perfil.
- Si no hay foto, muestra las iniciales del nombre.
- Al tocar el avatar se ejecuta `pickProfileImage`.
- El icono de camara indica que la foto se puede cambiar.

```tsx
<ProfileInput label="Nombre" value={name} onChangeText={setName} placeholder="Escribe tu nombre" />
```

Explicacion:

- `ProfileInput` evita repetir codigo de campos.
- Usa `TextInput` internamente.

La pantalla tambien usa `SectionCard` para separar:

- Datos principales.
- Descripcion.

## 15. Configuracion

Archivo: `app/(tabs)/settings.tsx`

```tsx
const {
  colors,
  selectedLanguageLabel,
  setLanguageByLabel,
  setThemeMode,
  t,
  themeMode,
} = useAppPreferences();
```

Explicacion:

- Lee datos globales del contexto.
- Cambia idioma.
- Cambia tema claro u oscuro.
- Traduce textos.

```tsx
<DropdownSelect
  label={t('selectedLanguage')}
  options={languageOptions}
  value={selectedLanguageLabel}
  onSelect={setLanguageByLabel}
/>
```

Explicacion:

- El dropdown modifica el idioma global.
- Al cambiar el idioma, cambian textos de tabs, drawer y configuracion.

```tsx
onPress={() => setThemeMode(option.value)}
```

Explicacion:

- Cambia el tema global.
- La app se actualiza con colores claros u oscuros.

## 16. Contexto global

Archivo: `contexts/app-preferences.tsx`

```tsx
const [language, setLanguage] = useState<LanguageCode>('es');
const [themeMode, setThemeMode] = useState<ThemeMode>('light');
```

Explicacion:

- Guarda idioma y tema.

```tsx
colors: themeMode === 'dark' ? darkPalette : palette,
```

Explicacion:

- Usa colores oscuros o claros segun el tema seleccionado.

```tsx
t: (key) => translations[language][key],
```

Explicacion:

- Devuelve textos traducidos segun el idioma.

## 17. Constantes

### `constants/design.ts`

Contiene:

- `palette`: colores claros.
- `darkPalette`: colores oscuros.
- `radius`: bordes.
- `spacing`: espaciados.

### `constants/activity-data.ts`

Contiene:

- Opciones del dropdown.
- Operaciones de la calculadora.
- Funcion para crear elementos de lista.

## 18. Elementos de React Native usados

Elementos principales:

- `View`: contenedor.
- `Text`: texto.
- `TextInput`: campos editables.
- `Pressable`: elementos presionables.
- `ScrollView`: contenido con scroll.
- `Modal`: ventana emergente.
- `Switch`: interruptor.
- `ActivityIndicator`: indicador de carga.
- `SafeAreaView`: evita recortes con bordes del dispositivo.
- `StyleSheet`: estilos organizados.

## 19. Hooks usados

- `useState`: estado local.
- `useMemo`: calculo memorizado.
- `useRef`: referencias.
- `useImperativeHandle`: expone funciones al padre.
- `useContext`: lectura de estado global mediante `useAppPreferences`.
- `useWindowDimensions`: tamano de pantalla.

## 20. Puntos de mejora y verificacion tecnica

Para mantener el proyecto claro, funcional y facil de sustentar, se deben tener en cuenta estos puntos:

- Optimizar la organizacion del codigo y evitar duplicaciones innecesarias.
- Mantener una arquitectura consistente entre pantallas, componentes, constantes y contexto global.
- Verificar que los selectores tipo `Dropdown` o `Picker` funcionen correctamente en iOS.
- Revisar que la navegacion requerida este implementada segun corresponda: Drawer, Stack y Bottom Navigation.
- Comprobar que el Scroll Loading cargue datos de forma correcta y sin llamadas duplicadas.
- Mejorar la explicacion tecnica para que cada componente pueda sustentarse con claridad.
- Revisar el estado de Git antes de entregar, evitando archivos innecesarios o conflictos pendientes.
- Confirmar que las dependencias instaladas sean compatibles con la version de Expo usada.
- Probar la interfaz en diferentes tamanos de pantalla para detectar problemas de experiencia de usuario.
- Ajustar pantallas con formularios para que el teclado no oculte campos o botones importantes.
- Conservar una estructura de archivos ordenada por responsabilidad.
- Retirar componentes, propiedades o patrones deprecados.
- Revisar apartados no presentados y preparar una nueva entrega cuando sea necesario.
- Subir las correcciones finales en la plataforma o repositorio solicitado.

## 21. Explicacion corta para exponer

Puedes decir:

> El proyecto esta construido con Expo, React Native y Expo Router. La arquitectura esta basada en componentes. Home organiza las actividades, cada actividad tiene su propio archivo y los componentes UI como `ActionButton`, `SectionCard` y `DropdownSelect` evitan repetir codigo. La navegacion usa Stack, Tabs y un drawer lateral hecho con Modal. Tambien se implemento un contexto global para manejar idioma y tema claro u oscuro en toda la app.
