import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { DropdownSelect } from '@/components/ui/dropdown-select';
import { SectionCard } from '@/components/ui/section-card';
import { courseOptions } from '@/constants/activity-data';
import { palette } from '@/constants/design';

/*
  Punto 3: Dropdown Android/iOS.
  Ubicacion de este punto: components/activities/dropdown-demo.tsx

  Permite seleccionar un tema de una lista de opciones.
*/
export function DropdownDemo() {
  /*
    visible controla si el menu de opciones esta abierto.
    selectedCourse guarda la opcion seleccionada actualmente.
  */
  const [visible, setVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(courseOptions[0]);

  /*
    Render de la actividad.
    DropdownSelect recibe el valor actual, las opciones y las funciones
    para abrir, cerrar y actualizar la seleccion.
  */
  return (
    <SectionCard title="3. Dropdown Android/iOS" description="Selector sin dependencia externa.">
      <DropdownSelect
        label="Tema seleccionado"
        options={courseOptions}
        value={selectedCourse}
        visible={visible}
        onOpen={() => setVisible(true)}
        onClose={() => setVisible(false)}
        onSelect={setSelectedCourse}
      />
      <Text style={styles.text}>Seleccion actual: {selectedCourse}</Text>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  text: {
    color: palette.textMuted,
    fontSize: 15,
  },
});
