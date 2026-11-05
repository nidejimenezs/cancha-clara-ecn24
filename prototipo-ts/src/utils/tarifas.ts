import type { Cancha } from '../models/cancha.js';
// La tarifa vive en la cancha. El polimorfismo decide cómo cotizarla.
export abstract class Tarifa {
  constructor(protected readonly cancha: Cancha) {}
  abstract calcular(horas: number): number;
}
export class TarifaRegular extends Tarifa {
  override calcular(horas: number): number { return this.cancha.tarifaHora * horas; }
}
export class TarifaPromocional extends Tarifa {
  constructor(cancha: Cancha, private readonly descuento: number = 0.10) {
    super(cancha);
    if (descuento < 0 || descuento > 1) throw new Error('Descuento inválido.');
  }
  override calcular(horas: number): number {
    return Math.round(this.cancha.tarifaHora * horas * (1 - this.descuento));
  }
}
