import { router } from 'expo-router';
import { useRef } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';

import { ButtonsDemo } from '@/components/activities/buttons-demo';
import { CalculatorCard } from '@/components/activities/calculator-card';
import { DropdownDemo } from '@/components/activities/dropdown-demo';
import { ModalDemo } from '@/components/activities/modal-demo';
import {
  ScrollLoadingList,
  shouldLoadMore,
  type ScrollLoadingListHandle,
} from '@/components/activities/scroll-loading-list';
import { AppShell } from '@/components/app-shell';
import { spacing } from '@/constants/design';
import { useAppPreferences } from '@/contexts/app-preferences';

export default function HomeScreen() {
  const { colors, t } = useAppPreferences();
  const { width } = useWindowDimensions();
  const listRef = useRef<ScrollLoadingListHandle>(null);
  const openDetail = () => router.push('/detail');

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
          const nearBottom = shouldLoadMore({
            viewportHeight: layoutMeasurement.height,
            offsetY: contentOffset.y,
            contentHeight: contentSize.height,
          });

          if (nearBottom) listRef.current?.loadMore();
        }}
        scrollEventThrottle={120}>
        <View style={styles.grid}>
          <ButtonsDemo onOpenDetail={openDetail} />
          <ModalDemo />
          <DropdownDemo />
          <CalculatorCard />
          <ScrollLoadingList ref={listRef} />
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
