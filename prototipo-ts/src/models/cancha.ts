export type Deporte = 'futbol5' | 'baloncesto';
export interface Cancha {
  readonly id: string;
  nombre: string;
  deporte: Deporte;
  tarifaHora: number;
  activa: boolean;
  apertura: number;
  cierre: number;
  observaciones?: string;
}
