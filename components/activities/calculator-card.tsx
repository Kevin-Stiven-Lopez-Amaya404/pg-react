import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { SectionCard } from '@/components/ui/section-card';
import { calculatorOperations, type CalculatorOperation } from '@/constants/activity-data';
import { palette, radius, spacing } from '@/constants/design';

/*
  Actividad de calculadora.
  Permite ingresar dos numeros y elegir una operacion matematica.
*/
export function CalculatorCard() {
  /*
    Estados principales:
    - firstValue guarda el primer numero escrito.
    - secondValue guarda el segundo numero escrito.
    - operation guarda la operacion seleccionada.
  */
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [operation, setOperation] = useState<CalculatorOperation>('sum');

  /*
    useMemo recalcula el resultado solo cuando cambia algun valor necesario.
    Esto evita ejecutar calculate en renders donde los datos no cambiaron.
  */
  const result = useMemo(() => calculate(firstValue, secondValue, operation), [
    firstValue,
    operation,
    secondValue,
  ]);

  /*
    Render de la calculadora.
    Incluye dos campos de texto, botones de operacion y el resultado final.
  */
  return (
    <SectionCard title="4. Calculadora basica" description="Suma, resta, multiplicacion y division.">
      <View style={styles.inputRow}>
        <TextInput
          keyboardType="numeric"
          onChangeText={setFirstValue}
          placeholder="Numero 1"
          placeholderTextColor="#7b8b87"
          style={styles.input}
          value={firstValue}
        />
        <TextInput
          keyboardType="numeric"
          onChangeText={setSecondValue}
          placeholder="Numero 2"
          placeholderTextColor="#7b8b87"
          style={styles.input}
          value={secondValue}
        />
      </View>

      <View style={styles.operationRow}>
        {calculatorOperations.map((item) => {
          const selected = operation === item.value;

          /*
            Cada boton representa una operacion.
            Si esta seleccionada, cambia su estilo visual.
          */
          return (
            <Pressable
              accessibilityRole="button"
              key={item.value}
              onPress={() => setOperation(item.value)}
              style={[styles.operationButton, selected && styles.operationSelected]}>
              <Text style={[styles.operationText, selected && styles.operationTextSelected]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.result}>{result}</Text>
    </SectionCard>
  );
}

/*
  Funcion que realiza el calculo.
  Convierte los textos a numeros, valida errores y devuelve un mensaje
  listo para mostrarse en pantalla.
*/
function calculate(firstValue: string, secondValue: string, operation: CalculatorOperation) {
  const a = Number(firstValue);
  const b = Number(secondValue);

  /*
    Validacion de campos vacios o valores que no se pueden convertir a numero.
  */
  if (!firstValue || !secondValue || Number.isNaN(a) || Number.isNaN(b)) {
    return 'Ingresa dos numeros validos.';
  }

  /*
    Validacion especial para evitar division entre cero.
  */
  if (operation === 'div' && b === 0) {
    return 'No se puede dividir entre cero.';
  }

  /*
    Objeto que relaciona cada operacion con su resultado.
    La clave operation decide cual resultado se devuelve.
  */
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
    borderColor: palette.borderStrong,
    borderWidth: 1,
    color: palette.text,
    backgroundColor: palette.surface,
  },
  operationRow: {
    flexDirection: 'row',
    gap: 8,
  },
  operationButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 46,
    height: 46,
    borderRadius: radius.md,
    borderColor: palette.borderStrong,
    borderWidth: 1,
    backgroundColor: palette.surface,
  },
  operationSelected: {
    borderColor: palette.primary,
    backgroundColor: palette.surfaceMuted,
  },
  operationText: {
    color: palette.textMuted,
    fontSize: 20,
    fontWeight: '800',
  },
  operationTextSelected: {
    color: palette.primary,
  },
  result: {
    color: palette.text,
    fontSize: 18,
    fontWeight: '800',
  },
});
