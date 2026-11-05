export type EstadoReserva = 'pendiente' | 'confirmada' | 'cancelada';
export interface Reserva {
  readonly id: string;
  canchaId: string;
  clienteId: string;
  fecha: string;
  inicio: number;
  fin: number;
  estado: EstadoReserva;
}
