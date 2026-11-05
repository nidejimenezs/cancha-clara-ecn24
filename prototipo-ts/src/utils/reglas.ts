import type { Cancha, Deporte } from '../models/cancha.js';
import type { Cliente } from '../models/cliente.js';
import type { Reserva } from '../models/reserva.js';
import type { Pago } from '../models/pago.js';
import { TarifaRegular } from './tarifas.js';

// C1: las canchas en mantenimiento no aparecen entre las opciones reservables.
export function canchasActivas(canchas: Cancha[], deporte: Deporte): Cancha[] {
  return canchas.filter(c => c.activa && c.deporte === deporte);
}
// C2: se trabaja con bloques de una hora, entre apertura y cierre del mismo día.
export function horarioValido(cancha: Cancha, inicio: number, fin: number): boolean {
  return [inicio, fin].every(Number.isInteger) && cancha.activa &&
    inicio >= cancha.apertura && fin <= cancha.cierre && inicio < fin;
}
// CL1: correo con forma básica válida y único, sin distinguir mayúsculas.
export function correoDisponible(clientes: Cliente[], correo: string, excluirId = ''): boolean {
  const normalizado = correo.trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizado) &&
    !clientes.some(c => c.id !== excluirId && c.correo.trim().toLowerCase() === normalizado);
}
// CL2: máximo tres reservas vigentes por cliente para una misma fecha.
export function clientePuedeReservar(cliente: Cliente, reservas: Reserva[], fecha: string): boolean {
  return cliente.activo && reservas.filter(r => r.clienteId === cliente.id &&
    r.fecha === fecha && r.estado !== 'cancelada').length < 3;
}
// R1: intervalos semiabiertos [inicio, fin). 18-19 y 19-20 no se cruzan.
export function horarioDisponible(reservas: Reserva[], nueva: Reserva): boolean {
  return !reservas.some(r => r.id !== nueva.id && r.canchaId === nueva.canchaId &&
    r.fecha === nueva.fecha && r.estado !== 'cancelada' &&
    nueva.inicio < r.fin && nueva.fin > r.inicio);
}
// R2: el total usa la tarifa de la cancha existente y una duración válida.
export function totalReserva(reserva: Reserva, canchas: Cancha[]): number {
  const cancha = canchas.find(c => c.id === reserva.canchaId);
  if (!cancha) throw new Error('La cancha no existe.');
  if (reserva.estado === 'cancelada') throw new Error('La reserva está cancelada.');
  if (!horarioValido(cancha, reserva.inicio, reserva.fin)) throw new Error('Horario inválido.');
  return new TarifaRegular(cancha).calcular(reserva.fin - reserva.inicio);
}
// P1: sumar abonos de la reserva y obtener su saldo sin mezclar otros pagos.
export function saldoPendiente(reservaId: string, total: number, pagos: Pago[]): number {
  return total - pagos.filter(p => p.reservaId === reservaId).reduce((suma,p) => suma + p.monto,0);
}
// P2: impedir montos inválidos, sobrepagos y referencias SINPE repetidas.
export function pagoValido(pago: Pago, reserva: Reserva, total: number, pagos: Pago[]): boolean {
  if (pago.reservaId !== reserva.id || reserva.estado === 'cancelada') return false;
  if (!Number.isInteger(pago.monto) || pago.monto <= 0) return false;
  if (pagos.some(p => p.id === pago.id)) return false;
  if (pago.monto > saldoPendiente(reserva.id,total,pagos)) return false;
  return pago.medio === 'efectivo' || (!!pago.referencia?.trim() &&
    !pagos.some(p => p.medio === 'sinpe' && p.referencia?.trim() === pago.referencia?.trim()));
}
// Punto de entrada: valida relaciones y reglas antes de aceptar una reserva.
export function validarReserva(nueva: Reserva, canchas: Cancha[], clientes: Cliente[], reservas: Reserva[]): void {
  if (reservas.some(r => r.id === nueva.id)) throw new Error('La reserva ya existe.');
  const cancha = canchas.find(c => c.id === nueva.canchaId);
  const cliente = clientes.find(c => c.id === nueva.clienteId);
  if (!cancha || !cliente) throw new Error('Cancha o cliente inexistente.');
  const fecha = new Date(nueva.fecha + 'T12:00:00Z');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(nueva.fecha) || Number.isNaN(fecha.getTime()) ||
    fecha.toISOString().slice(0,10) !== nueva.fecha) throw new Error('Fecha inválida.');
  if (nueva.estado === 'cancelada') throw new Error('Una reserva nueva debe estar vigente.');
  if (!horarioValido(cancha,nueva.inicio,nueva.fin)) throw new Error('Horario inválido.');
  if (!clientePuedeReservar(cliente,reservas,nueva.fecha)) throw new Error('Cliente inactivo o límite diario alcanzado.');
  if (!horarioDisponible(reservas,nueva)) throw new Error('La cancha ya está reservada en ese horario.');
}
