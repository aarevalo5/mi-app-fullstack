import { Component } from '@angular/core';

import { DatosPersonales } from './datos-personales/datos-personales.component';
import { Contacto } from './contacto/contacto.component';
import { Estudios } from './estudios/estudios.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    DatosPersonales,
    Contacto,
    Estudios
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}