# Contexto del proyecto

## Funcion general del codigo

Este proyecto es una aplicacion creada con Expo, React Native y Expo Router. Su objetivo principal es demostrar varias funcionalidades comunes en una app movil: botones, manejo de estado, modales, dropdowns, calculadora, scroll con carga dinamica y navegacion entre pantallas.

La aplicacion funciona como una guia practica de actividades. En la pantalla principal se muestran diferentes secciones, y cada una representa una funcionalidad especifica de React Native.

En resumen, el codigo permite:

- Mostrar una interfaz organizada por actividades.
- Cambiar informacion en pantalla usando estados.
- Ejecutar acciones con botones.
- Abrir y cerrar modales.
- Seleccionar opciones con un dropdown.
- Realizar operaciones matematicas basicas.
- Cargar mas elementos al hacer scroll.
- Navegar entre pantallas usando tabs, stack y menu lateral.

## Que se hizo en el proyecto

Se tomo una base de Expo y se transformo en una aplicacion mas completa, organizada y visualmente consistente.

Los cambios principales fueron:

- Se configuro la navegacion principal con `expo-router`.
- Se crearon pestañas inferiores para navegar entre Home, Perfil y Configuracion.
- Se agrego una pantalla de Detalle.
- Se agrego una pantalla Modal.
- Se creo un contenedor reutilizable llamado `AppShell`.
- Se crearon componentes reutilizables para botones, tarjetas y dropdowns.
- Se separaron las actividades en componentes individuales.
- Se centralizaron colores, espaciados y bordes en constantes de diseno.

## Estructura principal

### `app/_layout.tsx`

Este archivo define la navegacion principal de la aplicacion usando `Stack`.

Aqui se registran:

- `(tabs)`: grupo de pantallas con menu inferior.
- `detail`: pantalla de detalle.
- `modal`: pantalla que se presenta como modal.

Tambien se configura el tema claro u oscuro y la barra de estado.

### `app/(tabs)/_layout.tsx`

Este archivo define las pestañas inferiores de la aplicacion.

Las pestañas son:

- Home.
- Perfil.
- Configuracion.

Cada pestaña tiene un icono usando `MaterialIcons`.

### `app/(tabs)/index.tsx`

Esta es la pantalla principal de la app. Aqui se muestran todas las actividades dentro de un `ScrollView`.

Las actividades que se cargan son:

- Uso de botones.
- Modal.
- Dropdown.
- Calculadora.
- Scroll loading.
- Navegacion.

Tambien se detecta cuando el usuario llega al final del scroll para cargar mas elementos en la lista dinamica.

## Actividades implementadas

### 1. Uso de botones

Archivo: `components/activities/buttons-demo.tsx`

Esta actividad muestra botones que responden al evento `onPress`.

Tiene tres acciones:

- Saludar.
- Cambiar el texto.
- Ir a la pantalla de detalle.

Aqui se usa `useState` para guardar y actualizar el mensaje que se muestra en pantalla.

### 2. Dialog o Modal

Archivo: `components/activities/modal-demo.tsx`

Esta actividad muestra como abrir y cerrar un modal usando estado.

El modal usa el componente nativo `Modal` de React Native. Cuando el usuario presiona el boton, el estado `visible` cambia a `true`, y cuando se cierra vuelve a `false`.

### 3. Dropdown Android/iOS

Archivo: `components/activities/dropdown-demo.tsx`

Esta actividad permite seleccionar un tema de una lista de opciones.

Las opciones vienen desde `constants/activity-data.ts`.

Se usa un componente personalizado llamado `DropdownSelect`, que abre un modal con las opciones y marca la opcion seleccionada.

### 4. Calculadora basica

Archivo: `components/activities/calculator-card.tsx`

Esta actividad permite ingresar dos numeros y seleccionar una operacion:

- Suma.
- Resta.
- Multiplicacion.
- Division.

El resultado se calcula con una funcion llamada `calculate`.

Tambien se validan errores, por ejemplo:

- Si los campos estan vacios.
- Si los valores no son numeros.
- Si se intenta dividir entre cero.

### 5. Scroll Loading

Archivo: `components/activities/scroll-loading-list.tsx`

Esta actividad muestra una lista de registros. Al bajar hasta el final, se cargan mas elementos.

La funcion `shouldLoadMore` verifica si el usuario ya esta cerca del final del scroll.

Tambien se usa `ActivityIndicator` para mostrar una animacion de carga mientras se agregan nuevos registros.

### 6. Navegacion

Archivo: `components/activities/navigation-demo.tsx`

Esta actividad explica y demuestra la navegacion de la app.

La aplicacion usa:

- `Stack`, para abrir pantallas como Detalle.
- `Bottom Tabs`, para moverse entre Home, Perfil y Configuracion.
- Menu lateral, creado dentro del componente `AppShell`.

## Pantallas adicionales

### Perfil

Archivo: `app/(tabs)/profile.tsx`

Muestra una pantalla simple de perfil con un icono, texto descriptivo y un boton para ir a Detalle.

Sirve para demostrar el cambio de pantalla usando el menu inferior.

### Configuracion

Archivo: `app/(tabs)/settings.tsx`

Muestra opciones configurables usando switches.

Tiene dos estados:

- Notificaciones.
- Modo compacto.

Cuando el usuario cambia un switch, el texto de estado actual tambien se actualiza.

### Detalle

Archivo: `app/detail.tsx`

Esta pantalla se abre encima de las pestañas usando navegacion tipo Stack.

Incluye un boton para regresar usando `router.back()`.

### Modal informativo

Archivo: `app/modal.tsx`

Esta pantalla esta configurada como modal dentro del Stack principal.

Sirve para mostrar que Expo Router tambien permite presentar pantallas completas como modales.

## Componentes reutilizables

### `AppShell`

Archivo: `components/app-shell.tsx`

Es el contenedor general de varias pantallas. Incluye:

- Area segura con `SafeAreaView`.
- Encabezado con titulo y subtitulo.
- Boton para abrir menu lateral.
- Drawer lateral creado con `Modal`.

Este componente ayuda a que varias pantallas tengan la misma estructura visual.

### `ActionButton`

Archivo: `components/ui/action-button.tsx`

Es un boton reutilizable con icono, texto y variantes visuales.

Sus variantes son:

- `primary`.
- `soft`.
- `outline`.

Esto evita repetir codigo cada vez que se necesita un boton.

### `SectionCard`

Archivo: `components/ui/section-card.tsx`

Es una tarjeta reutilizable para mostrar cada actividad.

Recibe:

- Titulo.
- Descripcion.
- Contenido interno.

Permite que todas las actividades mantengan una apariencia uniforme.

### `DropdownSelect`

Archivo: `components/ui/dropdown-select.tsx`

Es un selector personalizado.

Muestra el valor actual y, al presionarlo, abre un modal con las opciones disponibles.

## Constantes importantes

### `constants/design.ts`

Este archivo guarda valores reutilizables de diseno:

- Colores.
- Radios de borde.
- Espaciados.

Esto permite mantener una interfaz consistente y facilita cambiar el estilo de toda la aplicacion desde un solo lugar.

### `constants/activity-data.ts`

Este archivo guarda datos usados por las actividades:

- Opciones del dropdown.
- Operaciones de la calculadora.
- Funcion para crear elementos de lista.

Separar estos datos ayuda a que los componentes no tengan informacion repetida dentro del mismo archivo.

## Explicacion corta para exposicion

Una forma sencilla de explicar el proyecto seria:

> Esta aplicacion fue desarrollada con Expo y React Native. Su funcion es demostrar diferentes conceptos importantes del desarrollo movil, como manejo de estado, eventos, modales, dropdowns, calculos, carga dinamica de listas y navegacion entre pantallas. El codigo esta dividido en componentes reutilizables para que sea mas organizado, facil de leer y facil de mantener.

## Que se puede destacar ante el profesor

Se puede destacar que el proyecto aplica buenas practicas como:

- Separar pantallas y componentes.
- Reutilizar botones, tarjetas y estructuras visuales.
- Usar constantes para mantener el diseno ordenado.
- Manejar estado con `useState`.
- Optimizar calculos simples con `useMemo`.
- Usar `expo-router` para la navegacion.
- Usar validaciones en la calculadora.
- Crear una lista que carga mas datos de forma dinamica.

## Conclusion

El proyecto no es solo una pantalla estatica. Es una aplicacion funcional que muestra interaccion real con el usuario, navegacion entre pantallas, manejo de datos y componentes reutilizables. Esto demuestra una base solida de React Native y Expo para construir aplicaciones moviles mas completas.
