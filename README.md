# Cancha Clara

**Integrante:** Nicole Jimenez  
**Universidad:** Universidad Central  
**Curso:** ECN-24 Desarrollo web en entorno servidor  
**Entrega:** Avance 1 · 6 de noviembre de 2026

Cancha Clara organiza las reservas de un centro deportivo ficticio. Relaciona canchas, clientes, reservas y pagos para impedir cruces de horario y conocer el saldo pendiente.

## Alcance de esta entrega

El prototipo de consola valida las reglas con datos en memoria. Angular muestra una portada funcional con interpolación, una cancha tipada y un getter. Los bocetos describen las pantallas previstas para los avances siguientes. Todavía no hay persistencia, autenticación, rutas ni API.

## Ejecución desde cero

Instalar Node.js 24 LTS y npm. Las dependencias exactas quedan en cada `package-lock.json`.

```sh
cd prototipo-ts
npm install
npm run build
npm start
npm test
```

En otra terminal, desde la raíz del repositorio:

```sh
cd frontend
npm install
npm start
```

Abrir http://localhost:4200. Para compilar Angular: `npm run build` desde `frontend/`.

## Organización

- `prototipo-ts/src/models/`: cuatro interfaces y sus tipos.
- `prototipo-ts/src/utils/`: repositorio, tarifas y ocho reglas de negocio.
- `prototipo-ts/src/datos.ts`: cinco registros por entidad, todos ficticios.
- `prototipo-ts/tests/`: pruebas de cruces, límites, pagos y repositorio.
- `frontend/src/app/`: encabezado, inicio, pie de página y modelos.
- `bocetos/`: cuatro pantallas con notas de navegación.
- `docs/`: propuesta, guía y evidencia de ejecución.

## Decisiones del modelo

Se reservan horas enteras del mismo día en horario local de Costa Rica. El intervalo incluye el inicio y excluye el fin: 18-19 y 19-20 son compatibles. Las reservas pendientes también bloquean el horario; una cancelación lo libera. Cada cliente activo puede tener hasta tres reservas vigentes por día. Los pagos son abonos enteros en CRC y no pueden superar el saldo. SINPE se registra manualmente: no existe conexión bancaria.

El repositorio es una colección en memoria; sus operaciones no sustituyen las reglas del dominio. `validarReserva` debe ejecutarse antes de agregar una reserva nueva. La promoción del 10 % solo demuestra polimorfismo; el cobro ordinario usa `TarifaRegular`.

## Creación con Angular CLI

```sh
npx @angular/cli@20.3.42 new frontend --style=css --ssr=false --routing=false --skip-git --skip-tests --defaults
ng generate component components/encabezado --skip-tests
ng generate component components/inicio --skip-tests
ng generate component components/pie-pagina --skip-tests
```

Se eligió Angular 20 para una base estable y coherente con el alcance introductorio. Angular se organiza en componentes; aquí el modelo son las interfaces, la vista es HTML y la clase del componente prepara los datos. No se pretende que Angular sea una implementación estricta del MVC clásico.

## Verificación y límites

Ver `docs/guia-tecnica.md` y `docs/evidencia/`. Los rechazos de datos inválidos se documentan como pruebas controladas. Los datos se reinician en cada ejecución. Una versión multiusuario necesitará validaciones en la API y control atómico de disponibilidad en la base de datos.
