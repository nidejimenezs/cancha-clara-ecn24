import { Component } from '@angular/core';
import { Encabezado } from './components/encabezado/encabezado';
import { Inicio } from './components/inicio/inicio';
import { PiePagina } from './components/pie-pagina/pie-pagina';
@Component({ selector: 'app-root', imports: [Encabezado, Inicio, PiePagina], templateUrl: './app.html', styleUrl: './app.css' })
export class App {}
