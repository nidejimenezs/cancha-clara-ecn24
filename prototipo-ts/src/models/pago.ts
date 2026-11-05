export type MedioPago = 'efectivo' | 'sinpe';
export interface Pago {
  readonly id: string;
  reservaId: string;
  monto: number;
  medio: MedioPago;
  referencia?: string;
}
