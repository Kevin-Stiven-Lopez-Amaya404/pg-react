import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { SectionCard } from '@/components/ui/section-card';
import { calculatorOperations, type CalculatorOperation } from '@/constants/activity-data';
import { radius, spacing } from '@/constants/design';
import { useAppPreferences } from '@/contexts/app-preferences';

export function CalculatorCard() {
  const { colors } = useAppPreferences();
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [operation, setOperation] = useState<CalculatorOperation>('sum');

  const result = useMemo(() => calculate(firstValue, secondValue, operation), [
    firstValue,
    operation,
    secondValue,
  ]);

  return (
    <SectionCard title="4. Calculadora" description="Suma, resta, multiplicacion y division.">
      <View style={styles.inputRow}>
        <TextInput
          keyboardType="numeric"
          onChangeText={setFirstValue}
          placeholder="Numero 1"
          placeholderTextColor="#7b8b87"
          style={[
            styles.input,
            {
              backgroundColor: colors.surface,
              borderColor: colors.borderStrong,
              color: colors.text,
            },
          ]}
          value={firstValue}
        />
        <TextInput
          keyboardType="numeric"
          onChangeText={setSecondValue}
          placeholder="Numero 2"
          placeholderTextColor="#7b8b87"
          style={[
            styles.input,
            {
              backgroundColor: colors.surface,
              borderColor: colors.borderStrong,
              color: colors.text,
            },
          ]}
          value={secondValue}
        />
      </View>

      <View style={styles.operationRow}>
        {calculatorOperations.map((item) => {
          const selected = operation === item.value;

          return (
            <Pressable
              accessibilityRole="button"
              key={item.value}
              onPress={() => setOperation(item.value)}
              style={[
                styles.operationButton,
                {
                  backgroundColor: selected ? colors.surfaceMuted : colors.surface,
                  borderColor: selected ? colors.primary : colors.borderStrong,
                },
              ]}>
              <Text style={[styles.operationText, { color: selected ? colors.primary : colors.textMuted }]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={[styles.result, { color: colors.text }]}>{result}</Text>
    </SectionCard>
  );
}

function calculate(firstValue: string, secondValue: string, operation: CalculatorOperation) {
  const a = Number(firstValue);
  const b = Number(secondValue);

  if (!firstValue || !secondValue || Number.isNaN(a) || Number.isNaN(b)) {
    return 'Ingresa dos numeros validos.';
  }

  if (operation === 'div' && b === 0) {
    return 'No se puede dividir entre cero.';
  }

  const valueByOperation = {
    sum: a + b,
    sub: a - b,
    mul: a * b,
    div: a / b,
  };

  return `Resultado: ${valueByOperation[operation]}`;
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    minWidth: 130,
    minHeight: 48,
    paddingHorizontal: 12,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  operationRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  operationButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 46,
    height: 46,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  operationText: {
    fontSize: 20,
    fontWeight: '800',
  },
  result: {
    fontSize: 18,
    fontWeight: '800',
  },
});
