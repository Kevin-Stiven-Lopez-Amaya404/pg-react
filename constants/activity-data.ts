export const courseOptions = ['React Native', 'Expo', 'React Navigation', 'Buenas practicas'];

export const calculatorOperations = [
  { label: '+', value: 'sum' },
  { label: '-', value: 'sub' },
  { label: 'x', value: 'mul' },
  { label: '/', value: 'div' },
] as const;

export type CalculatorOperation = (typeof calculatorOperations)[number]['value'];

export function createListItems(start: number, total: number) {
  return Array.from({ length: total }, (_, index) => {
    const id = start + index;
    return { id, title: `Registro ${id}` };
  });
}
