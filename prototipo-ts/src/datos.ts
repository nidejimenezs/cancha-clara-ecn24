import type { Cancha } from './models/cancha.js';
import type { Cliente } from './models/cliente.js';
import type { Reserva } from './models/reserva.js';
import type { Pago } from './models/pago.js';
// Datos ficticios; example.com evita usar contactos personales.
export const canchas: Cancha[] = [
  { id:'C01',nombre:'Cancha Norte',deporte:'futbol5',tarifaHora:18000,activa:true,apertura:8,cierre:22,observaciones:'Techada' },
  { id:'C02',nombre:'Cancha Sur',deporte:'futbol5',tarifaHora:16000,activa:true,apertura:8,cierre:22 },
  { id:'C03',nombre:'Cancha Central',deporte:'baloncesto',tarifaHora:10000,activa:true,apertura:8,cierre:21 },
  { id:'C04',nombre:'Cancha Este',deporte:'futbol5',tarifaHora:15000,activa:false,apertura:8,cierre:22,observaciones:'Mantenimiento' },
  { id:'C05',nombre:'Cancha Oeste',deporte:'baloncesto',tarifaHora:12000,activa:true,apertura:9,cierre:21 }
];
export const clientes: Cliente[] = [
  { id:'CL01',nombre:'Ana Mora',correo:'ana@example.com',activo:true },
  { id:'CL02',nombre:'Luis Solís',correo:'luis@example.com',activo:true },
  { id:'CL03',nombre:'María Rojas',correo:'maria@example.com',activo:true },
  { id:'CL04',nombre:'Diego Vega',correo:'diego@example.com',activo:true },
  { id:'CL05',nombre:'Sofía Castro',correo:'sofia@example.com',activo:false }
];
export const reservas: Reserva[] = [
  { id:'R01',canchaId:'C01',clienteId:'CL01',fecha:'2026-11-06',inicio:18,fin:19,estado:'confirmada' },
  { id:'R02',canchaId:'C02',clienteId:'CL02',fecha:'2026-11-06',inicio:17,fin:19,estado:'confirmada' },
  { id:'R03',canchaId:'C03',clienteId:'CL03',fecha:'2026-11-06',inicio:18,fin:19,estado:'pendiente' },
  { id:'R04',canchaId:'C05',clienteId:'CL04',fecha:'2026-11-06',inicio:19,fin:21,estado:'pendiente' },
  { id:'R05',canchaId:'C01',clienteId:'CL02',fecha:'2026-11-07',inicio:18,fin:20,estado:'pendiente' }
];
export const pagos: Pago[] = [
  { id:'P01',reservaId:'R01',monto:18000,medio:'sinpe',referencia:'DEMO-1001' },
  { id:'P02',reservaId:'R02',monto:32000,medio:'efectivo' },
  { id:'P03',reservaId:'R03',monto:5000,medio:'sinpe',referencia:'DEMO-1003' },
  { id:'P04',reservaId:'R04',monto:12000,medio:'efectivo' },
  { id:'P05',reservaId:'R05',monto:18000,medio:'sinpe',referencia:'DEMO-1005' }
];
