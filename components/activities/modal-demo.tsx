import { useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

import { ActionButton } from '@/components/ui/action-button';
import { SectionCard } from '@/components/ui/section-card';
import { radius, spacing } from '@/constants/design';
import { useAppPreferences } from '@/contexts/app-preferences';

export function ModalDemo() {
  const { colors } = useAppPreferences();
  const [visible, setVisible] = useState(false);

  return (
    <SectionCard title="2. Modal" description="Apertura y cierre controlados por estado.">
      <ActionButton label="Abrir modal" icon="chat-bubble-outline" onPress={() => setVisible(true)} />

      <Modal transparent visible={visible} animationType="slide" onRequestClose={() => setVisible(false)}>
        <View style={[styles.layer, { backgroundColor: colors.overlay }]}>
          <View style={[styles.box, { backgroundColor: colors.surface }]}>
            <Text style={[styles.title, { color: colors.text }]}>Mensaje informativo</Text>
            <Text style={[styles.text, { color: colors.textMuted }]}>
              Este mensaje se muestra dentro de un modal nativo de React Native.
            </Text>
            <ActionButton label="Cerrar" icon="close" onPress={() => setVisible(false)} />
          </View>
        </View>
      </Modal>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  layer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  box: {
    width: '100%',
    maxWidth: 380,
    maxHeight: '86%',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
  },
});
