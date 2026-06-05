import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { SectionCard } from '@/components/ui/section-card';
import { createListItems } from '@/constants/activity-data';
import { palette, radius, spacing } from '@/constants/design';

/*
  Punto 5: Scroll Loading.
  Ubicacion de este punto: components/activities/scroll-loading-list.tsx

  Este archivo contiene la lista dinamica, la funcion para cargar mas registros
  y la funcion auxiliar que detecta si el usuario llego al final del scroll.
*/
export type ScrollLoadingListHandle = {
  loadMore: () => void;
};

/*
  Componente de lista dinamica.
  forwardRef permite que HomeScreen controle esta lista desde afuera,
  especialmente cuando detecta que el usuario llego al final del ScrollView.
*/
export const ScrollLoadingList = forwardRef<ScrollLoadingListHandle>(function ScrollLoadingList(
  _props,
  ref,
) {
  /*
    items guarda los registros que se muestran en pantalla.
    Al iniciar, se crean 12 elementos usando createListItems.
  */
  const [items, setItems] = useState(() => createListItems(1, 12));

  /*
    loading controla si se muestra el indicador de carga.
    loadingRef evita que se ejecuten varias cargas al mismo tiempo.
  */
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);

  /*
    Funcion principal para cargar mas registros.
    Primero revisa si ya hay una carga activa. Si no la hay,
    activa el estado de carga y despues agrega 7 elementos nuevos.
  */
  const loadMore = () => {
    if (loadingRef.current) return;

    loadingRef.current = true;
    setLoading(true);

    setTimeout(() => {
      setItems((current) => [...current, ...createListItems(current.length + 1, 7)]);
      setLoading(false);
      loadingRef.current = false;
    }, 800);
  };

  /*
    Expone loadMore al componente padre.
    Gracias a esto, HomeScreen puede llamar listRef.current?.loadMore().
  */
  useImperativeHandle(ref, () => ({ loadMore }));

  /*
    Render de la actividad.
    Muestra cada registro, el loader cuando esta cargando y un texto
    que tambien permite cargar mas elementos manualmente.
  */
  return (
    <SectionCard title="5. Scroll Loading" description="Lista dinamica con indicador de carga.">
      {items.map((item) => (
        <View key={item.id} style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>Cargando stiven lopez.</Text>
        </View>
      ))}
      {loading && <ActivityIndicator color={palette.primary} style={styles.loader} />}
      <Text style={styles.hint} onPress={loadMore}>
        Baja hasta el final o toca aqui para cargar mas.
      </Text>
    </SectionCard>
  );
});

/*
  Funcion auxiliar que detecta si el usuario esta cerca del final del scroll.
  Se usa en HomeScreen para saber cuando debe llamar loadMore().
*/
export function shouldLoadMore({
  viewportHeight,
  offsetY,
  contentHeight,
}: {
  viewportHeight: number;
  offsetY: number;
  contentHeight: number;
}) {
  return viewportHeight + offsetY >= contentHeight - 90;
}

const styles = StyleSheet.create({
  item: {
    gap: 4,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: palette.background,
  },
  title: {
    color: palette.text,
    fontSize: 15,
    fontWeight: '700',
  },
  description: {
    color: palette.textMuted,
    fontSize: 13,
  },
  loader: {
    marginVertical: 8,
  },
  hint: {
    color: palette.primary,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
});
