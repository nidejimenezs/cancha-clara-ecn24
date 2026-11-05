import test from 'node:test';
import assert from 'node:assert/strict';
import { canchas, clientes, reservas, pagos } from '../dist/datos.js';
import * as r from '../dist/utils/reglas.js';
import { Repositorio } from '../dist/utils/repositorio.js';
const nueva = {id:'R06',canchaId:'C01',clienteId:'CL01',fecha:'2026-11-06',inicio:19,fin:20,estado:'pendiente'};
test('reservas consecutivas permitidas y cruces rechazados', () => {
  assert.equal(r.horarioDisponible(reservas,nueva),true);
  assert.equal(r.horarioDisponible(reservas,{...nueva,inicio:18,fin:20}),false);
  assert.equal(r.horarioDisponible([{...reservas[0],estado:'cancelada'}],{...nueva,inicio:18,fin:19}),true);
});
test('horario dentro de apertura, sin fracciones ni mantenimiento', () => {
  assert.equal(r.horarioValido(canchas[0],21,22),true);
  for (const [a,b] of [[7,9],[21,23],[19,18],[18.5,19],[18,18]]) assert.equal(r.horarioValido(canchas[0],a,b),false);
  assert.equal(r.horarioValido(canchas[3],18,19),false);
  assert.deepEqual(r.canchasActivas(canchas,'futbol5').map(c=>c.id),['C01','C02']);
});
test('correo único normalizado y cliente activo con límite diario', () => {
  assert.equal(r.correoDisponible(clientes,' ANA@example.com '),false);
  assert.equal(r.correoDisponible(clientes,'invalido'),false);
  assert.equal(r.correoDisponible(clientes,'nuevo@example.com'),true);
  assert.equal(r.clientePuedeReservar(clientes[4],reservas,nueva.fecha),false);
  const tres=[1,2,3].map(i=>({...nueva,id:`T${i}`}));
  assert.equal(r.clientePuedeReservar(clientes[0],tres,nueva.fecha),false);
});
test('total, relaciones y fechas imposibles', () => {
  assert.equal(r.totalReserva(reservas[1],canchas),32000);
  assert.throws(()=>r.totalReserva({...nueva,canchaId:'X'},canchas),/no existe/);
  assert.throws(()=>r.validarReserva({...nueva,clienteId:'X'},canchas,clientes,reservas),/inexistente/);
  assert.throws(()=>r.validarReserva({...nueva,fecha:'2026-02-30'},canchas,clientes,reservas),/Fecha/);
  assert.throws(()=>r.validarReserva({...nueva,inicio:18},canchas,clientes,reservas),/ya está reservada/);
  assert.doesNotThrow(()=>r.validarReserva(nueva,canchas,clientes,reservas));
});
test('abonos exactos y rechazo de sobrepago, duplicados o referencias vacías', () => {
  const p={id:'P06',reservaId:'R03',monto:5000,medio:'efectivo'};
  assert.equal(r.saldoPendiente('R03',10000,pagos),5000);
  assert.equal(r.pagoValido(p,reservas[2],10000,pagos),true);
  for (const monto of [0,-1,6000,0.5,NaN]) assert.equal(r.pagoValido({...p,monto},reservas[2],10000,pagos),false);
  assert.equal(r.pagoValido({...p,id:'P01'},reservas[2],10000,pagos),false);
  assert.equal(r.pagoValido({...p,medio:'sinpe'},reservas[2],10000,pagos),false);
  assert.equal(r.pagoValido({...p,medio:'sinpe',referencia:'DEMO-1001'},reservas[2],10000,pagos),false);
  assert.equal(r.pagoValido({...p,reservaId:'R99'},reservas[2],10000,pagos),false);
});
test('repositorio evita ids repetidos y no expone su arreglo', () => {
  const repo=new Repositorio(); repo.agregar(nueva);
  assert.throws(()=>repo.agregar(nueva),/ya existe/);
  repo.buscar('R06').estado='cancelada';
  assert.equal(repo.buscar('R06').estado,'pendiente');
  assert.equal(repo.eliminar('X'),false);
  assert.equal(repo.eliminar('R06'),true);
  assert.equal(repo.cantidad,0);
});
