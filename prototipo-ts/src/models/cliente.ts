export interface Cliente {
  readonly id: string;
  nombre: string;
  correo: string;
  activo: boolean;
  telefono?: string;
}
