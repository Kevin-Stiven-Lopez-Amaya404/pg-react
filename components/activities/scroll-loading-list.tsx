import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { SectionCard } from '@/components/ui/section-card';
import { createListItems } from '@/constants/activity-data';
import { radius, spacing } from '@/constants/design';
import { useAppPreferences } from '@/contexts/app-preferences';

export type ScrollLoadingListHandle = {
  loadMore: () => void;
};

export const ScrollLoadingList = forwardRef<ScrollLoadingListHandle>(function ScrollLoadingList(
  _props,
  ref,
) {
  const { colors } = useAppPreferences();
  const [items, setItems] = useState(() => createListItems(1, 12));
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);

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

  useImperativeHandle(ref, () => ({ loadMore }));

  return (
    <SectionCard title="5. Scroll Loading" description="Lista dinamica con indicador de carga.">
      {items.map((item) => (
        <View key={item.id} style={[styles.item, { backgroundColor: colors.background }]}>
          <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
          <Text style={[styles.description, { color: colors.textMuted }]}>
            Elemento cargado en la lista dinamica.
          </Text>
        </View>
      ))}
      {loading && <ActivityIndicator color={colors.primary} style={styles.loader} />}
      <Text style={[styles.hint, { color: colors.primary }]} onPress={loadMore}>
        Baja hasta el final o toca aqui para cargar mas.
      </Text>
    </SectionCard>
  );
});

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
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
  },
  description: {
    fontSize: 13,
  },
  loader: {
    marginVertical: 8,
  },
  hint: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
});
