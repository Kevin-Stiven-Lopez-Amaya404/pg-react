import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ActionButton } from '@/components/ui/action-button';
import { SectionCard } from '@/components/ui/section-card';
import { useAppPreferences } from '@/contexts/app-preferences';

type ButtonsDemoProps = {
  onOpenDetail: () => void;
};

export function ButtonsDemo({ onOpenDetail }: ButtonsDemoProps) {
  const { colors } = useAppPreferences();
  const [message, setMessage] = useState('Presiona un boton para ver la interaccion.');

  return (
    <SectionCard title="1. Uso de botones" description="Eventos con respuesta visual.">
      <View style={styles.row}>
        <ActionButton
          label="Saludar"
          icon="waving-hand"
          onPress={() => setMessage('Hola, el boton esta funcionando.')}
        />
        <ActionButton
          label="Cambiar"
          icon="edit"
          variant="soft"
          onPress={() => setMessage('El mensaje se actualizo correctamente.')}
        />
        <ActionButton label="Detalle" icon="open-in-new" variant="outline" onPress={onOpenDetail} />
      </View>
      <Text style={[styles.message, { color: colors.textMuted }]}>{message}</Text>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    width: '100%',
  },
  message: {
    flexShrink: 1,
    fontSize: 15,
    lineHeight: 21,
  },
});
