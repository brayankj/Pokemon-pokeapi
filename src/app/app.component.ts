import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokemon-api';

  constructor(){
    Swal.fire({
      title: 'Consumo Rest Api PokéAPI',
      text: 'Desarrollo de aplicación sin ánimo de lucro'
    });
  }
}
