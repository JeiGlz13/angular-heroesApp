import { Component, Input } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [
    `
      mat-card{
        margin-top: 2rem;
      }
    `
  ]
})
export class HeroeTarjetaComponent {
  @Input() heroe: Heroe = {
    id: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    superhero: '',
    alt_img: '',
  };

  constructor() { }

}
