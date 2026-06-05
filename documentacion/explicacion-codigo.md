# Explicacion del codigo y elementos usados

## 1. Tecnologias usadas

El proyecto usa estas tecnologias principales:

- `Expo`: entorno para crear y ejecutar la app.
- `React Native`: framework para construir interfaces moviles.
- `Expo Router`: sistema de navegacion basado en archivos.
- `TypeScript`: tipado para escribir codigo mas seguro.
- `React Hooks`: funciones como `useState`, `useMemo`, `useRef` y `useContext`.
- `MaterialIcons`: iconos usados en botones, tabs y menu.
- `Context API`: estado global para idioma y tema.

## 2. Estructura principal del proyecto

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
  design.ts
  activity-data.ts
```

Explicacion:

- `app/` guarda las pantallas.
- `components/` guarda piezas reutilizables.
- `contexts/` guarda estado global.
- `constants/` guarda datos y estilos reutilizables.

## 3. Layout raiz

Archivo: `app/_layout.tsx`

Este archivo envuelve toda la aplicacion con el proveedor de preferencias y define la navegacion principal.

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

- `AppPreferencesProvider` permite que toda la app acceda al idioma y tema.
- `RootNavigation` contiene el `Stack`.
- Al envolver la app aqui, cualquier pantalla puede usar `useAppPreferences()`.

```tsx
<Stack>
  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  <Stack.Screen name="detail" options={{ headerShown: false }} />
  <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal informativo' }} />
</Stack>
```

Explicacion:

- `(tabs)` contiene el menu inferior.
- `detail` es una pantalla normal del Stack.
- `modal` se abre como pantalla modal.

## 4. Navegacion por tabs

Archivo: `app/(tabs)/_layout.tsx`

```tsx
<Tabs
  screenOptions={{
    headerShown: false,
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.textMuted,
  }}>
```

Explicacion:

- `Tabs` crea el menu inferior.
- `headerShown: false` oculta el header automatico.
- Los colores vienen del tema activo.

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
- `title: t('profile')` cambia segun el idioma.
- `MaterialIcons` coloca el icono de perfil.

## 5. Pantalla principal

Archivo: `app/(tabs)/index.tsx`

```tsx
export default function HomeScreen() {
  const { colors, t } = useAppPreferences();
  const { width } = useWindowDimensions();
  const listRef = useRef<ScrollLoadingListHandle>(null);
```

Explicacion:

- `useAppPreferences()` trae colores e idioma global.
- `useWindowDimensions()` obtiene el ancho de pantalla para adaptar el diseno.
- `useRef()` permite controlar la lista dinamica desde Home.

```tsx
const openDetail = () => router.push('/detail');
const openModal = () => router.push('/modal');
```

Explicacion:

- `router.push('/detail')` abre la pantalla de detalle.
- `router.push('/modal')` abre la pantalla modal.

```tsx
<ButtonsDemo onOpenDetail={openDetail} />
<ModalDemo />
<DropdownDemo />
<CalculatorCard />
<ScrollLoadingList ref={listRef} />
<NavigationDemo onOpenDetail={openDetail} onOpenModal={openModal} />
```

Explicacion:

- Home solo organiza las actividades.
- Cada actividad tiene su propio archivo.
- Esto evita mezclar toda la logica en una sola pantalla.

## 6. Uso de botones

Archivo: `components/activities/buttons-demo.tsx`

```tsx
const [message, setMessage] = useState('Presiona un boton para ver la interaccion.');
```

Explicacion:

- `message` guarda el texto actual.
- `setMessage` cambia el texto.
- `useState` permite que la interfaz se actualice.

```tsx
<ActionButton
  label="Saludar"
  icon="waving-hand"
  onPress={() => setMessage('Hola, onPress activo.')}
/>
```

Explicacion:

- `ActionButton` es un boton reutilizable.
- `onPress` se ejecuta cuando el usuario presiona.
- Al presionar, cambia el mensaje en pantalla.

```tsx
<ActionButton label="Detalle" icon="open-in-new" variant="outline" onPress={onOpenDetail} />
```

Explicacion:

- Este boton no cambia texto.
- Ejecuta `onOpenDetail`.
- Esa funcion viene desde Home y abre `/detail`.

## 7. Dialogo o modal

Archivo: `components/activities/modal-demo.tsx`

```tsx
const [visible, setVisible] = useState(false);
```

Explicacion:

- `visible` indica si el modal se muestra.
- `false` significa cerrado.
- `true` significa abierto.

```tsx
<ActionButton label="Abrir modal" icon="chat-bubble-outline" onPress={() => setVisible(true)} />
```

Explicacion:

- Al presionar, `visible` pasa a `true`.
- Esto hace que el modal aparezca.

```tsx
<Modal transparent visible={visible} animationType="slide" onRequestClose={() => setVisible(false)}>
```

Explicacion:

- `Modal` es un componente nativo de React Native.
- `transparent` permite ver una capa oscura detras.
- `animationType="slide"` da una animacion.
- `onRequestClose` permite cerrar en Android.

## 8. Dropdown

Archivo: `components/activities/dropdown-demo.tsx`

```tsx
const [visible, setVisible] = useState(false);
const [selectedCourse, setSelectedCourse] = useState(courseOptions[0]);
```

Explicacion:

- `visible` abre o cierra el menu.
- `selectedCourse` guarda la opcion seleccionada.

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

- `options` recibe las opciones.
- `value` muestra la seleccion actual.
- `onSelect` cambia la opcion seleccionada.

## 9. Calculadora

Archivo: `components/activities/calculator-card.tsx`

```tsx
const [firstValue, setFirstValue] = useState('');
const [secondValue, setSecondValue] = useState('');
const [operation, setOperation] = useState<CalculatorOperation>('sum');
```

Explicacion:

- `firstValue` guarda el primer numero.
- `secondValue` guarda el segundo numero.
- `operation` guarda la operacion seleccionada.

```tsx
const result = useMemo(() => calculate(firstValue, secondValue, operation), [
  firstValue,
  operation,
  secondValue,
]);
```

Explicacion:

- `useMemo` recalcula solo cuando cambian los valores.
- Se usa para obtener el resultado final.

```tsx
function calculate(firstValue: string, secondValue: string, operation: CalculatorOperation) {
  const a = Number(firstValue);
  const b = Number(secondValue);
```

Explicacion:

- La funcion convierte los textos a numeros.
- Luego valida y calcula.

```tsx
if (operation === 'div' && b === 0) {
  return 'No se puede dividir entre cero.';
}
```

Explicacion:

- Evita el error matematico de dividir entre cero.

## 10. Scroll loading

Archivo: `components/activities/scroll-loading-list.tsx`

```tsx
const [items, setItems] = useState(() => createListItems(1, 12));
const [loading, setLoading] = useState(false);
const loadingRef = useRef(false);
```

Explicacion:

- `items` guarda los registros.
- `loading` controla el indicador de carga.
- `loadingRef` evita cargas repetidas al mismo tiempo.

```tsx
setItems((current) => [...current, ...createListItems(current.length + 1, 6)]);
```

Explicacion:

- Toma los registros actuales.
- Agrega 6 registros nuevos.
- Actualiza la lista en pantalla.

```tsx
export function shouldLoadMore({ viewportHeight, offsetY, contentHeight }) {
  return viewportHeight + offsetY >= contentHeight - 90;
}
```

Explicacion:

- Detecta si el usuario esta cerca del final del scroll.
- Si devuelve `true`, se cargan mas registros.

## 11. Navegacion

Archivo: `components/activities/navigation-demo.tsx`

```tsx
type NavigationDemoProps = {
  onOpenDetail: () => void;
  onOpenModal: () => void;
};
```

Explicacion:

- El componente recibe funciones desde Home.
- No decide directamente la ruta.
- Esto permite reutilizarlo mejor.

```tsx
<ActionButton label="Ir a detalle" icon="arrow-forward" onPress={onOpenDetail} />
<ActionButton label="Abrir modal" icon="open-in-new" variant="outline" onPress={onOpenModal} />
```

Explicacion:

- El primer boton abre `/detail`.
- El segundo boton abre `/modal`.
- Ambos usan funciones enviadas por props.

## 12. Perfil editable

Archivo: `app/(tabs)/profile.tsx`

```tsx
const [name, setName] = useState('Stiven');
const [email, setEmail] = useState('stiven@email.com');
const [program, setProgram] = useState('React Native');
const [city, setCity] = useState('Bogota');
```

Explicacion:

- Cada dato del perfil tiene su propio estado.
- Cuando el usuario escribe, se actualiza automaticamente.

```tsx
<ProfileInput label="Nombre" value={name} onChangeText={setName} placeholder="Escribe tu nombre" />
```

Explicacion:

- `ProfileInput` es un campo reutilizable.
- Recibe el valor y la funcion para cambiarlo.
- Usa `TextInput` internamente.

## 13. Configuracion funcional

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

- Trae datos y funciones del contexto global.
- `colors` cambia con el tema.
- `t()` traduce textos.
- `setLanguageByLabel()` cambia idioma.
- `setThemeMode()` cambia claro u oscuro.

```tsx
<DropdownSelect
  label={t('selectedLanguage')}
  options={languageOptions}
  value={selectedLanguageLabel}
  onSelect={setLanguageByLabel}
/>
```

Explicacion:

- El dropdown cambia el idioma global.
- Al cambiar idioma, cambian textos en la app.

```tsx
onPress={() => setThemeMode(option.value)}
```

Explicacion:

- Cambia el tema global.
- Si selecciona `dark`, la app usa colores oscuros.
- Si selecciona `light`, la app usa colores claros.

## 14. Contexto global

Archivo: `contexts/app-preferences.tsx`

```tsx
export function AppPreferencesProvider({ children }: PropsWithChildren) {
  const [language, setLanguage] = useState<LanguageCode>('es');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
```

Explicacion:

- Guarda idioma y tema.
- Este estado esta disponible para toda la app.

```tsx
colors: themeMode === 'dark' ? darkPalette : palette,
```

Explicacion:

- Si el tema es oscuro, usa `darkPalette`.
- Si el tema es claro, usa `palette`.

```tsx
t: (key) => translations[language][key],
```

Explicacion:

- `t()` recibe una clave.
- Devuelve el texto en el idioma seleccionado.

## 15. Estilos

Los estilos se definen con `StyleSheet.create`.

Ejemplo:

```tsx
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});
```

Explicacion:

- `flexDirection: 'row'` coloca elementos en fila.
- `flexWrap: 'wrap'` permite que bajen de linea si no caben.
- `gap` separa los elementos.

## 16. Elementos de React Native usados

Se usaron estos elementos principales:

- `View`: contenedor visual.
- `Text`: textos en pantalla.
- `TextInput`: campos editables.
- `Pressable`: elementos presionables.
- `ScrollView`: contenido desplazable.
- `Modal`: ventanas emergentes.
- `Switch`: interruptor de configuracion.
- `ActivityIndicator`: indicador de carga.
- `SafeAreaView`: evita que el contenido choque con bordes del dispositivo.
- `StyleSheet`: estilos organizados.

## 17. Hooks usados

### `useState`

Sirve para guardar datos que cambian.

Se usa en:

- Botones.
- Modal.
- Dropdown.
- Calculadora.
- Perfil.
- Configuracion.

### `useMemo`

Sirve para recalcular un valor solo cuando cambian sus dependencias.

Se usa en:

- Calculadora.

### `useRef`

Sirve para guardar una referencia que no reinicia el render.

Se usa en:

- Home para controlar `ScrollLoadingList`.
- Scroll loading para evitar cargas repetidas.

### `useImperativeHandle`

Sirve para exponer funciones de un componente hijo al padre.

Se usa en:

- `ScrollLoadingList`, para exponer `loadMore()`.

### `useContext`

Sirve para leer datos globales.

Se usa mediante:

- `useAppPreferences()`.

## 18. Explicacion corta para exponer

Puedes explicar asi:

> En este proyecto use Expo con React Native y Expo Router. La app esta organizada por componentes. Cada actividad tiene su propio archivo, los botones y tarjetas son reutilizables, la navegacion usa Stack y Bottom Tabs, y el menu lateral fue hecho con Modal. Tambien use Context API para manejar idioma y tema claro/oscuro de forma global. Los elementos principales de React Native que use fueron View, Text, Pressable, Modal, ScrollView, TextInput, Switch y ActivityIndicator.

## 19. Conclusion

El codigo esta dividido para que cada parte tenga una funcion clara.

La idea principal es:

- Home organiza las actividades.
- Cada actividad maneja su propia logica.
- Los componentes UI evitan repetir codigo.
- El contexto global maneja preferencias.
- Expo Router maneja la navegacion.

Esto hace que el proyecto sea mas facil de entender, mantener y explicar.
