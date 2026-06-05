import { StyleSheet, Text, View } from 'react-native';

import { ActionButton } from '@/components/ui/action-button';
import { SectionCard } from '@/components/ui/section-card';
import { palette } from '@/constants/design';

/*
  Punto 6: Navegacion.
  Ubicacion de este punto: components/activities/navigation-demo.tsx

  Props que recibe el componente.
  onOpenDetail viene desde la pantalla Home y se usa para navegar a Detalle.
  onOpenModal viene desde Home y abre una pantalla modal configurada en el Stack.
*/
type NavigationDemoProps = {
  onOpenDetail: () => void;
  onOpenModal: () => void;
};

/*
  Actividad de navegacion.
  Su funcion es explicar y demostrar que la app usa:
  - Stack para pantallas como Detalle y Modal.
  - Bottom Tabs para Home, Perfil y Configuracion.
  - Drawer lateral desde el AppShell.
*/
export function NavigationDemo({ onOpenDetail, onOpenModal }: NavigationDemoProps) {
  /*
    Render de la tarjeta.
    Los botones ejecutan funciones de navegacion enviadas desde HomeScreen.
  */
  return (
    <SectionCard title="6. Navegacion" description="Stack, Bottom Tabs y Drawer Layout.">
      <Text style={styles.text}>
        El Stack abre Detalle, el Bottom Menu cambia entre Home, Perfil y Configuracion, y el
        boton superior abre el Drawer lateral. Tambien puedes abrir una pantalla como Modal.
      </Text>

      <View style={styles.badgeRow}>
        <Text style={styles.badge}>/detail</Text>
        <Text style={styles.badge}>/modal</Text>
        <Text style={styles.badge}>Tabs</Text>
      </View>

      <View style={styles.actionRow}>
        <ActionButton label="Ir a detalle" icon="arrow-forward" onPress={onOpenDetail} />
        <ActionButton
          label="Abrir modal"
          icon="open-in-new"
          variant="outline"
          onPress={onOpenModal}
        />
      </View>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  actionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    color: palette.primary,
    fontSize: 13,
    fontWeight: '800',
    backgroundColor: palette.surfaceMuted,
  },
  text: {
    color: palette.textMuted,
    fontSize: 15,
    lineHeight: 21,
  },
});
