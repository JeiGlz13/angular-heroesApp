import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
      img{
        width: 100%;
        border-radius: 1rem;
      }
    `
  ]
})
export class HeroeComponent implements OnInit {
  public heroe!: Heroe;

  constructor(private activatedRoute: ActivatedRoute,
      private heroesService: HeroesService,
      private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
        .pipe(
          switchMap(({id})=> this.heroesService.getHeroePorId(id))
        )
        .subscribe((resp) => {
          this.heroe = resp;
        });
  }

  regresar(){
    this.router.navigate(['/heroes/listado']);
  }

}
