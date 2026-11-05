import { canchas,clientes,reservas,pagos } from './datos.js';
import type { Reserva } from './models/reserva.js';
import { Repositorio } from './utils/repositorio.js';
import { Tarifa, TarifaRegular, TarifaPromocional } from './utils/tarifas.js';
import * as reglas from './utils/reglas.js';

console.log('CANCHA CLARA | Prototipo del Avance 1');
console.log(`Datos: ${canchas.length} canchas, ${clientes.length} clientes, ${reservas.length} reservas, ${pagos.length} pagos.`);
console.log('C1. Canchas activas de fútbol:',reglas.canchasActivas(canchas,'futbol5').map(c => c.nombre).join(', '));
console.log('C2. Horario 18-19 válido:',reglas.horarioValido(canchas[0],18,19));
console.log('CL1. Correo ANA@example.com disponible:',reglas.correoDisponible(clientes,'ANA@example.com'));
console.log('CL2. Ana puede reservar:',reglas.clientePuedeReservar(clientes[0],reservas,'2026-11-06'));
const nueva: Reserva = { id:'R06',canchaId:'C01',clienteId:'CL01',fecha:'2026-11-06',inicio:19,fin:20,estado:'pendiente' };
console.log('R1. Cancha Norte 19-20 disponible:',reglas.horarioDisponible(reservas,nueva));
console.log('R2. Total de R01 en CRC:',reglas.totalReserva(reservas[0],canchas));
console.log('P1. Saldo R03 en CRC:',reglas.saldoPendiente('R03',10000,pagos));
console.log('P2. Abono de 6000 para R03 válido:',reglas.pagoValido({id:'P06',reservaId:'R03',monto:6000,medio:'efectivo'},reservas[2],10000,pagos));
const repositorio = new Repositorio<Reserva>();
reservas.forEach(r => repositorio.agregar(r));
reglas.validarReserva(nueva,canchas,clientes,reservas);
repositorio.agregar(nueva);
console.log('Repositorio: registros tras agregar:',repositorio.cantidad);
console.log('Repositorio: buscar R06:',repositorio.buscar('R06')?.estado);
console.log('Repositorio: pendientes:',repositorio.filtrar(r => r.estado === 'pendiente').length);
console.log('Repositorio: eliminar R06:',repositorio.eliminar('R06'));
const tarifas: Tarifa[] = [new TarifaRegular(canchas[0]),new TarifaPromocional(canchas[0])];
console.log('Polimorfismo: cotizaciones de 2 horas en CRC:',tarifas.map(t => t.calcular(2)).join(' / '));
// Prueba negativa deliberada: se captura el rechazo, la aplicación continúa.
try {
  reglas.validarReserva({...nueva,inicio:18,fin:19},canchas,clientes,reservas);
} catch (error: unknown) {
  console.log('Caso controlado:',error instanceof Error ? error.message : 'Error desconocido');
}
console.log('Fin: las ocho reglas fueron demostradas.');
