# Documentacion del proyecto

## 1. Resumen general

Este proyecto es una aplicacion desarrollada con Expo, React Native y Expo Router.

La aplicacion funciona como una guia de actividades practicas donde se demuestran varios conceptos importantes del desarrollo movil:

- Uso de botones.
- Dialogos y modales.
- Dropdown o selector de opciones.
- Calculadora basica.
- Scroll con carga dinamica.
- Navegacion entre pantallas.
- Perfil editable.
- Configuracion funcional con idioma y tema claro/oscuro.

La pantalla principal se llama `Actividad stiven` y muestra las actividades en forma de tarjetas.

## 2. Arquitectura utilizada

La arquitectura usada es una arquitectura basada en componentes, propia de React Native.

El proyecto esta organizado por responsabilidades:

- `app/`: contiene las pantallas y la configuracion de rutas.
- `app/(tabs)/`: contiene las pantallas que pertenecen al menu inferior.
- `components/activities/`: contiene cada actividad separada en su propio componente.
- `components/ui/`: contiene componentes reutilizables de interfaz.
- `components/app-shell.tsx`: contiene la estructura visual general de las pantallas.
- `contexts/`: contiene el estado global de preferencias.
- `constants/`: contiene datos, colores y valores reutilizables.
- `hooks/`: contiene hooks auxiliares del proyecto base.

Esta organizacion permite separar la logica por partes. La pantalla principal no tiene toda la logica mezclada, sino que importa componentes como `ButtonsDemo`, `ModalDemo`, `CalculatorCard` y `NavigationDemo`.

## 3. Patron principal aplicado

El patron principal usado es composicion de componentes.

Esto significa que la interfaz se construye uniendo piezas pequenas:

- `AppShell` da la estructura general.
- `SectionCard` crea tarjetas para cada actividad.
- `ActionButton` crea botones reutilizables.
- `DropdownSelect` crea selectores de opciones.
- Cada archivo en `components/activities/` representa una actividad independiente.

Ejemplo:

`app/(tabs)/index.tsx` no crea cada boton, modal o calculadora directamente. Solo organiza los componentes:

- `<ButtonsDemo />`
- `<ModalDemo />`
- `<DropdownDemo />`
- `<CalculatorCard />`
- `<ScrollLoadingList />`
- `<NavigationDemo />`

Esto hace que el codigo sea mas limpio y facil de explicar.

## 4. Navegacion utilizada

La navegacion se maneja con Expo Router.

Expo Router usa la estructura de carpetas para crear rutas. Cada archivo dentro de `app/` representa una pantalla o grupo de pantallas.

### Stack Navigation

Archivo principal: `app/_layout.tsx`

Aqui se define un `Stack`, que permite abrir pantallas encima de otras.

Pantallas registradas:

- `(tabs)`: grupo de pantallas con menu inferior.
- `detail`: pantalla de detalle.
- `modal`: pantalla configurada como modal.

El `Stack` permite abrir rutas como:

- `/detail`
- `/modal`

### Bottom Tabs

Archivo: `app/(tabs)/_layout.tsx`

Aqui se define el menu inferior de la aplicacion.

Las tabs son:

- Home.
- Perfil.
- Configuracion.

Cada pestana tiene un icono de `MaterialIcons`.

### Drawer lateral

Archivo: `components/app-shell.tsx`

El menu lateral no usa una libreria externa. Se implemento con un `Modal` de React Native.

El boton superior abre el drawer y desde ahi se puede navegar a:

- Home.
- Perfil.
- Configuracion.
- Detalle.

### Navegacion programatica

Se usa `router.push()` de Expo Router.

Ejemplos:

- `router.push('/detail')`
- `router.push('/modal')`
- `router.back()`

Esto permite navegar desde botones y funciones.

## 5. Estado global

Archivo: `contexts/app-preferences.tsx`

Se creo un contexto global llamado `AppPreferencesProvider`.

Este contexto guarda preferencias de la aplicacion:

- Idioma actual.
- Tema actual: claro u oscuro.
- Colores activos.
- Traducciones.

Tambien expone funciones para modificar esas preferencias:

- `setLanguage()`
- `setLanguageByLabel()`
- `setThemeMode()`
- `t()`, que devuelve textos segun el idioma seleccionado.

Gracias a este contexto, cuando se cambia el idioma en Configuracion, cambian textos en otras partes de la app. Y cuando se cambia el tema, tambien cambia la apariencia general.

## 6. Configuracion funcional

Archivo: `app/(tabs)/settings.tsx`

La pantalla de Configuracion permite modificar preferencias reales de la app.

Funciones implementadas:

- Seleccionar idioma.
- Cambiar entre modo claro y modo oscuro.
- Activar o desactivar notificaciones.
- Ver el estado actual de las preferencias.

Idiomas disponibles:

- Espanol.
- Ingles.
- Frances.
- Portugues.

El selector de idioma usa `DropdownSelect`. Cuando el usuario escoge un idioma, se llama `setLanguageByLabel()` y el contexto actualiza los textos.

El modo claro/oscuro usa botones segmentados. Cuando el usuario selecciona un modo, se llama `setThemeMode()`, y los colores cambian en la aplicacion.

## 7. Tema claro y oscuro

Archivo: `constants/design.ts`

Se definieron dos paletas de colores:

- `palette`: colores del modo claro.
- `darkPalette`: colores del modo oscuro.

El contexto decide cual usar segun `themeMode`.

Ejemplo:

- Si `themeMode` es `light`, se usa `palette`.
- Si `themeMode` es `dark`, se usa `darkPalette`.

Componentes como `AppShell`, `DropdownSelect`, `ProfileScreen` y `SettingsScreen` usan `colors` desde el contexto para cambiar de apariencia.

## 8. Componentes principales

### `AppShell`

Archivo: `components/app-shell.tsx`

Es el contenedor general de varias pantallas.

Incluye:

- `SafeAreaView` para respetar zonas seguras del dispositivo.
- Header con titulo y subtitulo.
- Boton de menu.
- Drawer lateral.
- Area para renderizar el contenido de cada pantalla.

Tambien usa el contexto de preferencias para cambiar colores y textos segun el idioma y el tema.

### `ActionButton`

Archivo: `components/ui/action-button.tsx`

Es un boton reutilizable.

Recibe:

- `label`: texto del boton.
- `icon`: icono opcional.
- `variant`: estilo visual.
- `onPress`: funcion que se ejecuta al presionar.

Variantes disponibles:

- `primary`.
- `soft`.
- `outline`.

### `SectionCard`

Archivo: `components/ui/section-card.tsx`

Es una tarjeta reutilizable para agrupar cada actividad.

Recibe:

- `title`.
- `description`.
- `children`.

Sirve para mantener una interfaz uniforme.

### `DropdownSelect`

Archivo: `components/ui/dropdown-select.tsx`

Es un selector personalizado.

Funciona con un `Modal` que muestra una lista de opciones. Cuando el usuario selecciona una opcion, llama a `onSelect()`.

Se usa en:

- La actividad de dropdown.
- La pantalla de Configuracion para elegir idioma.

## 9. Actividades implementadas

### 1. Uso de botones

Archivo: `components/activities/buttons-demo.tsx`

Demuestra el uso de botones y eventos `onPress`.

Funciones:

- Cambiar un mensaje con `useState`.
- Mostrar respuesta visual al usuario.
- Navegar a la pantalla de detalle.

Conceptos aplicados:

- Estado local.
- Eventos.
- Reutilizacion de `ActionButton`.

### 2. Dialogo o Modal

Archivo: `components/activities/modal-demo.tsx`

Demuestra como abrir y cerrar un modal nativo de React Native.

Usa:

- `useState` para controlar si el modal esta visible.
- `Modal` de React Native.
- `ActionButton` para abrir y cerrar.

### 3. Dropdown

Archivo: `components/activities/dropdown-demo.tsx`

Permite seleccionar una opcion de una lista.

Usa:

- `DropdownSelect`.
- Estado local para guardar la opcion seleccionada.
- Datos desde `constants/activity-data.ts`.

### 4. Calculadora basica

Archivo: `components/activities/calculator-card.tsx`

Permite ingresar dos numeros y realizar:

- Suma.
- Resta.
- Multiplicacion.
- Division.

Tambien valida:

- Campos vacios.
- Valores no numericos.
- Division entre cero.

Usa `useMemo` para recalcular el resultado solo cuando cambian los valores o la operacion.

### 5. Scroll Loading

Archivo: `components/activities/scroll-loading-list.tsx`

Muestra una lista dinamica de registros.

Funciones:

- Inicia con 12 elementos.
- Carga 6 elementos mas cuando el usuario llega al final.
- Muestra un `ActivityIndicator` mientras carga.

Tambien expone la funcion `loadMore()` hacia el componente padre usando `forwardRef` y `useImperativeHandle`.

### 6. Navegacion

Archivo: `components/activities/navigation-demo.tsx`

Demuestra la navegacion de la app.

Incluye:

- Boton para ir a `/detail`.
- Boton para abrir `/modal`.
- Indicadores visuales de rutas.

Conceptos aplicados:

- Navegacion con `router.push()`.
- Stack Navigation.
- Modal screen.
- Bottom Tabs.
- Drawer lateral.

## 10. Pantallas principales

### Home

Archivo: `app/(tabs)/index.tsx`

Es la pantalla principal.

Funciones:

- Muestra todas las actividades.
- Usa `ScrollView`.
- Detecta cuando el usuario llega al final del scroll.
- Llama `loadMore()` en la lista dinamica.
- Abre `/detail` y `/modal` desde funciones compartidas.

### Perfil

Archivo: `app/(tabs)/profile.tsx`

Muestra un perfil editable.

Campos:

- Nombre.
- Correo.
- Programa.
- Ciudad.

Cada campo usa `TextInput` y `useState`. Al cambiar un campo, tambien se actualiza el resumen superior del perfil.

### Configuracion

Archivo: `app/(tabs)/settings.tsx`

Permite cambiar preferencias funcionales.

Opciones:

- Idioma.
- Apariencia clara u oscura.
- Notificaciones.

Esta pantalla se comunica con `contexts/app-preferences.tsx`.

### Detalle

Archivo: `app/detail.tsx`

Pantalla abierta por Stack.

Tiene:

- Header.
- Texto explicativo.
- Boton para regresar con `router.back()`.

### Modal informativo

Archivo: `app/modal.tsx`

Pantalla configurada como modal dentro del Stack principal.

Tiene:

- Titulo.
- Texto.
- Boton para cerrar con `router.back()`.

## 11. Datos y constantes

### `constants/activity-data.ts`

Guarda datos reutilizables:

- Opciones del dropdown.
- Operaciones de la calculadora.
- Funcion `createListItems()` para crear registros de la lista dinamica.

### `constants/design.ts`

Guarda valores de diseno:

- Colores claros.
- Colores oscuros.
- Radios de borde.
- Espaciados.

Esto evita repetir valores en muchos archivos.

## 12. Principios SOLID

SOLID es un conjunto de principios de diseno orientado a objetos, pero algunas ideas tambien pueden aplicarse a componentes en React.

En este proyecto se aplican parcialmente, especialmente en la separacion de responsabilidades.

### S: Single Responsibility Principle

Si se aplica.

Cada componente tiene una responsabilidad clara:

- `ButtonsDemo`: maneja la actividad de botones.
- `ModalDemo`: maneja el modal.
- `CalculatorCard`: maneja la calculadora.
- `ScrollLoadingList`: maneja la lista dinamica.
- `NavigationDemo`: maneja la actividad de navegacion.
- `ActionButton`: solo representa botones reutilizables.
- `SectionCard`: solo representa tarjetas.
- `AppShell`: solo da estructura general de pantalla.

### O: Open/Closed Principle

Se aplica parcialmente.

Por ejemplo, `ActionButton` permite variantes visuales sin reescribir el componente.

Tambien `DropdownSelect` puede recibir distintas listas de opciones y usarse en diferentes lugares.

### L: Liskov Substitution Principle

No aplica de forma directa.

Este principio se usa mas en herencia de clases. El proyecto usa componentes funcionales y composicion, no clases con herencia.

### I: Interface Segregation Principle

Se aplica parcialmente.

Las props de los componentes son pequenas y especificas.

Ejemplos:

- `NavigationDemo` solo recibe `onOpenDetail` y `onOpenModal`.
- `ActionButton` solo recibe lo necesario para renderizar un boton.
- `DropdownSelect` recibe solo datos y funciones relacionadas con seleccion.

### D: Dependency Inversion Principle

Se aplica parcialmente.

Algunos componentes reciben funciones desde afuera en vez de decidir todo internamente.

Ejemplo:

- `NavigationDemo` no llama directamente a `router.push()`.
- Recibe `onOpenDetail` y `onOpenModal` desde `HomeScreen`.

Esto hace que el componente dependa de una funcion externa, no de una implementacion fija.

## 13. Buenas practicas aplicadas

El proyecto aplica varias buenas practicas:

- Separacion de pantallas y componentes.
- Componentes reutilizables.
- Estado local con `useState`.
- Estado global con Context API.
- Navegacion con Expo Router.
- Uso de constantes para colores y datos.
- Validaciones en la calculadora.
- Diseno responsive con `ScrollView`, `flexWrap` y `useWindowDimensions`.
- Uso de `SafeAreaView` para evitar recortes en dispositivos.
- Documentacion dentro del codigo con comentarios por apartados.

## 14. Explicacion corta para exponer

Una explicacion sencilla seria:

> La aplicacion fue construida con Expo, React Native y Expo Router. Se uso una arquitectura basada en componentes, separando pantallas, actividades, componentes reutilizables, constantes y contexto global. La navegacion combina Stack, Bottom Tabs y un drawer lateral hecho con Modal. Tambien se implemento una configuracion funcional que cambia el idioma y el tema claro u oscuro en toda la app. Se aplican buenas practicas como separacion de responsabilidades, reutilizacion de componentes y manejo de estado local y global.

## 15. Conclusion

El proyecto demuestra una base completa de React Native con Expo.

No es una pantalla estatica, sino una aplicacion funcional con:

- Interacciones.
- Navegacion.
- Formularios.
- Modales.
- Estado local.
- Estado global.
- Tema claro/oscuro.
- Idiomas.
- Componentes reutilizables.

La arquitectura permite entender el codigo por partes y facilita mantener o ampliar el proyecto en el futuro.
