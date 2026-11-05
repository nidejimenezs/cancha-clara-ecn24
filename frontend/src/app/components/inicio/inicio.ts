import { Component } from '@angular/core';
import type { Cancha } from '../../models/cancha';
@Component({ selector: 'app-inicio', imports: [], templateUrl: './inicio.html', styleUrl: './inicio.css' })
export class Inicio {
  readonly nombreProyecto = 'Cancha Clara';
  readonly descripcion = 'Un lugar para organizar las canchas, los horarios y los abonos de cada reserva.';
  readonly cancha: Cancha = { id: 'C01', nombre: 'Cancha Norte', deporte: 'futbol5', tarifaHora: 18000, activa: true, apertura: 8, cierre: 22, observaciones: 'Techada' };
  get tarifaFormateada(): string { return new Intl.NumberFormat('es-CR', {style: 'currency',currency: 'CRC',maximumFractionDigits: 0}).format(this.cancha.tarifaHora); }
  get horario(): string { return `${this.cancha.apertura}:00 a ${this.cancha.cierre}:00`; }
}
