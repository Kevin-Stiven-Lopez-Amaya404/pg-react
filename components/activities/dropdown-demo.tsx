import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { DropdownSelect } from '@/components/ui/dropdown-select';
import { SectionCard } from '@/components/ui/section-card';
import { courseOptions } from '@/constants/activity-data';
import { useAppPreferences } from '@/contexts/app-preferences';

export function DropdownDemo() {
  const { colors } = useAppPreferences();
  const [visible, setVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(courseOptions[0]);

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
      <Text style={[styles.text, { color: colors.textMuted }]}>Seleccion actual: {selectedCourse}</Text>
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
  },
});
