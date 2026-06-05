import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ActionButton } from '@/components/ui/action-button';
import { SectionCard } from '@/components/ui/section-card';
import { palette } from '@/constants/design';

/*
  Punto 1: Uso de botones.
  Ubicacion de este punto: components/activities/buttons-demo.tsx

  Este componente demuestra como usar botones en React Native,
  como escuchar el evento onPress y como actualizar texto en pantalla.
*/
type ButtonsDemoProps = {
  /*
    Funcion recibida desde HomeScreen.
    Sirve para abrir la pantalla de detalle cuando se presiona el boton Detalle.
  */
  onOpenDetail: () => void;
};

export function ButtonsDemo({ onOpenDetail }: ButtonsDemoProps) {
  /*
    message es el estado que se muestra debajo de los botones.
    setMessage cambia el texto cuando el usuario presiona Saludar o Cambiar.
  */
  const [message, setMessage] = useState('Presiona un boton para ver la interaccion.');

  /*
    Render del punto 1.
    SectionCard crea la tarjeta visual y ActionButton reutiliza el mismo estilo
    para todos los botones.
  */
  return (
    <SectionCard title="1. Uso de botones" description="respuesta visual.">
      <View style={styles.row}>
        {/*
          Boton Saludar:    
          cambia el mensaje usando setMessage.
        */}
        <ActionButton label="Saludar" icon="waving-hand" onPress={() => setMessage('Hola, activo.')} />

        {/*
          Boton Cambiar:
          tambien actualiza el mismo estado, pero con otro texto.
        */}
        <ActionButton
          label="Cambiar"
          icon="edit"
          variant="soft"
          onPress={() => setMessage('actualizado correctamente.')}
        />

        {/*
          Boton Detalle:
          no cambia el texto; ejecuta onOpenDetail para navegar a otra pantalla.
        */}
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
    width: '100%',
  },
  message: {
    color: palette.textMuted,
    flexShrink: 1,
    fontSize: 15,
    lineHeight: 21,
  },
});
