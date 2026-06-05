import { useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

import { ActionButton } from '@/components/ui/action-button';
import { SectionCard } from '@/components/ui/section-card';
import { palette, radius, spacing } from '@/constants/design';

/*
  Punto 2: Dialog o Modal.
  Ubicacion de este punto: components/activities/modal-demo.tsx

  Muestra como abrir y cerrar una ventana emergente usando el estado visible.
*/
export function ModalDemo() {
  /*
    visible controla si el Modal se muestra o permanece oculto.
    false significa cerrado, true significa abierto.
  */
  const [visible, setVisible] = useState(false);

  /*
    Render de la actividad.
    El primer boton abre el modal. Dentro del modal, el boton Cerrar
    vuelve a cambiar visible a false.
  */
  return (
    <SectionCard title="2. Modal" description="Apertura y cierre controlados por estado.">
      <ActionButton label="Abrir modal" icon="chat-bubble-outline" onPress={() => setVisible(true)} />

      {/*
        Modal nativo de React Native.
        transparent permite ver una capa oscura detras.
        animationType="slide" hace que aparezca con animacion.
        onRequestClose permite cerrar el modal desde Android.
      */}
      <Modal transparent visible={visible} animationType="slide" onRequestClose={() => setVisible(false)}>
        <View style={styles.layer}>
          <View style={styles.box}>
            <Text style={styles.title}>Mensaje informativo</Text>
            <Text style={styles.text}>
              somos los mejores estudiantes de ciberseguridad stiven lopez.
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
    backgroundColor: palette.overlay,
  },
  box: {
    width: '100%',
    maxWidth: 380,
    maxHeight: '86%',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: palette.surface,
  },
  title: {
    color: palette.text,
    fontSize: 20,
    fontWeight: '800',
  },
  text: {
    color: palette.textMuted,
    fontSize: 15,
    lineHeight: 21,
  },
});
