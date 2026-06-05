import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ActionButton } from '@/components/ui/action-button';
import { SectionCard } from '@/components/ui/section-card';
import { palette } from '@/constants/design';

type ButtonsDemoProps = {
  onOpenDetail: () => void;
};

export function ButtonsDemo({ onOpenDetail }: ButtonsDemoProps) {
  const [message, setMessage] = useState('Presiona un boton para ver la interaccion.');

  return (
    <SectionCard title="1. Uso de botones" description="Eventos onPress con respuesta visual.">
      <View style={styles.row}>
        <ActionButton label="Saludar" icon="waving-hand" onPress={() => setMessage('Hola, onPress activo.')} />
        <ActionButton
          label="Cambiar"
          icon="edit"
          variant="soft"
          onPress={() => setMessage('Texto actualizado correctamente.')}
        />
        <ActionButton label="Detalle" icon="open-in-new" variant="outline" onPress={onOpenDetail} />
      </View>
      <Text style={styles.message}>{message}</Text>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  message: {
    color: palette.textMuted,
    fontSize: 15,
    lineHeight: 21,
  },
});
