import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img{
        width: 100%;
        border-radius: 2rem;
      }
    `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      description: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      description: 'Marvel - Comics'
    },
  ];

  heroe: Heroe = {
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    superhero: '',
    alt_img: ''
  }

  constructor(private heroesService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackbar: MatSnackBar,
              private dialog: MatDialog ) { }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) return;

    this.activatedRoute.params
        .pipe(
          switchMap(({id})=>this.heroesService.getHeroePorId(id))
        )
        .subscribe((heroe)=> this.heroe = heroe);
  }

  guardar(){
    if (this.heroe.superhero.trim().length === 0) return;

    if (this.heroe.id) {
      this.heroesService.editarHeroe(this.heroe)
                        .subscribe(resp => {
                          this.mostrarSnackbar('registro actualizado')
      });
    }else{
      this.heroesService.agregarHeroe(this.heroe)
                        .subscribe(heroe => {
                          this.router.navigate(['/heroes/editar', heroe.id]);
                          this.mostrarSnackbar('registro creadi')
                        });
    }
  }

  borrar(){
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '300px',
      data: this.heroe,
    });

    dialog.afterClosed()
          .subscribe(res => {
            if (res) {
              this.heroesService.eliminarHeroe(this.heroe)
              .subscribe(heroe=>{
                this.router.navigate(['/heroes'])
              })
            }
          })


  }

  mostrarSnackbar(mensje: string){
    this.snackbar.open(mensje, 'Cerrar', {
      duration: 2000
    })
  }

}
