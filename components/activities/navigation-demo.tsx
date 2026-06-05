import { StyleSheet, Text } from 'react-native';

import { ActionButton } from '@/components/ui/action-button';
import { SectionCard } from '@/components/ui/section-card';
import { palette } from '@/constants/design';

/*
  Props que recibe el componente.
  onOpenDetail viene desde la pantalla Home y se usa para navegar a Detalle.
*/
type NavigationDemoProps = {
  onOpenDetail: () => void;
};

/*
  Actividad de navegacion.
  Su funcion es explicar y demostrar que la app usa:
  - Stack para pantallas como Detalle.
  - Bottom Tabs para Home, Perfil y Configuracion.
  - Drawer lateral desde el AppShell.
*/
export function NavigationDemo({ onOpenDetail }: NavigationDemoProps) {
  /*
    Render de la tarjeta.
    El boton ejecuta onOpenDetail, que abre la pantalla detail con expo-router.
  */
  return (
    <SectionCard title="6. Navegacion" description="Stack, Bottom Tabs y Drawer Layout.">
      <Text style={styles.text}>
        El Stack abre Detalle, el Bottom Menu cambia entre Home, Perfil y Configuracion, y el
        boton superior abre el Drawer lateral.
      </Text>
      <ActionButton label="Ir a detalle" icon="arrow-forward" onPress={onOpenDetail} />
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  text: {
    color: palette.textMuted,
    fontSize: 15,
    lineHeight: 21,
  },
});
