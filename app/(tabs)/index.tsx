import { router } from 'expo-router';
import { useRef } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';

import { ButtonsDemo } from '@/components/activities/buttons-demo';
import { CalculatorCard } from '@/components/activities/calculator-card';
import { DropdownDemo } from '@/components/activities/dropdown-demo';
import { ModalDemo } from '@/components/activities/modal-demo';
import { NavigationDemo } from '@/components/activities/navigation-demo';
import {
  ScrollLoadingList,
  shouldLoadMore,
  type ScrollLoadingListHandle,
} from '@/components/activities/scroll-loading-list';
import { AppShell } from '@/components/app-shell';
import { spacing } from '@/constants/design';
import { useAppPreferences } from '@/contexts/app-preferences';

/*
  Pantalla principal de actividades.

  Aqui se reunen todos los puntos del trabajo:
  1. Uso de botones: components/activities/buttons-demo.tsx
  2. Dialog o Modal: components/activities/modal-demo.tsx
  3. Dropdown: components/activities/dropdown-demo.tsx
  4. Calculadora: components/activities/calculator-card.tsx
  5. Scroll Loading: components/activities/scroll-loading-list.tsx
  6. Navegacion: components/activities/navigation-demo.tsx

  Esta pantalla no contiene toda la logica de cada punto.
  Su funcion es importar cada componente y mostrarlo en orden.
*/
export default function HomeScreen() {
  const { colors, t } = useAppPreferences();

  /*
    useWindowDimensions obtiene el ancho actual de la pantalla.
    Se usa para adaptar el diseno cuando la app se abre en pantallas grandes.
  */
  const { width } = useWindowDimensions();

  /*
    Referencia hacia ScrollLoadingList.
    Permite llamar la funcion loadMore() desde esta pantalla cuando el usuario
    llega al final del ScrollView.
  */
  const listRef = useRef<ScrollLoadingListHandle>(null);

  /*
    Funcion reutilizada por los puntos de botones y navegacion.
    Abre la pantalla /detail usando expo-router.
  */
  const openDetail = () => router.push('/detail');
  const openModal = () => router.push('/modal');

  /*
    AppShell da la estructura general:
    encabezado, menu lateral y area segura.

    Dentro del ScrollView se renderizan las actividades.
  */
  return (
    <AppShell title={t('home')}>
      <ScrollView
        contentContainerStyle={[
          styles.page,
          { backgroundColor: colors.background },
          width >= 720 && styles.pageWide,
        ]}
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;

          /*
            Detecta si el usuario esta cerca del final de la pantalla.
            Si nearBottom es true, se cargan mas registros en la lista.
          */
          const nearBottom = shouldLoadMore({
            viewportHeight: layoutMeasurement.height,
            offsetY: contentOffset.y,
            contentHeight: contentSize.height,
          });

          if (nearBottom) listRef.current?.loadMore();
        }}
        scrollEventThrottle={120}>
        <View style={styles.grid}>
          {/*
            Punto 1: Uso de botones.
            Muestra botones con eventos onPress y cambios de estado.
          */}
          <ButtonsDemo onOpenDetail={openDetail} />

          {/*
            Punto 2: Dialog o Modal.
            Abre y cierra una ventana emergente usando estado local.
          */}
          <ModalDemo />

          {/*
            Punto 3: Dropdown.
            Permite seleccionar una opcion de una lista.
          */}
          <DropdownDemo />

          {/*
            Punto 4: Calculadora.
            Captura dos numeros y calcula el resultado segun la operacion.
          */}
          <CalculatorCard />

          {/*
            Punto 5: Scroll Loading.
            Carga mas registros cuando el usuario baja al final.
          */}
          <ScrollLoadingList ref={listRef} />

          {/*
            Punto 6: Navegacion.
            Explica y ejecuta la navegacion hacia la pantalla de detalle.
          */}
          <NavigationDemo onOpenDetail={openDetail} onOpenModal={openModal} />
        </View>
      </ScrollView>
    </AppShell>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: spacing.md,
    paddingBottom: 96,
  },
  pageWide: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 860,
    paddingHorizontal: spacing.xl,
  },
  grid: {
    gap: spacing.md,
  },
});
