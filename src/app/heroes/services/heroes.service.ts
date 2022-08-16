import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private _baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes(){
    return this.http.get<Heroe[]>(`${this._baseUrl}/heroes`);
  }

  getHeroePorId(heroeId: string){
    return this.http.get<Heroe>(`${this._baseUrl}/heroes/${heroeId}`);
  }

  getSugerencias(termino: string){
    return this.http.get<Heroe[]>(`${this._baseUrl}/heroes?q=${termino}&_limit=6`);
  }

  agregarHeroe(heroe: Heroe): Observable<Heroe>{
    return this.http.post<Heroe>(`${this._baseUrl}/heroes`, heroe);
  }

  editarHeroe(heroe: Heroe): Observable<Heroe>{
    return this.http.put<Heroe>(`${this._baseUrl}/heroes/${heroe.id}`, heroe);
  }

  eliminarHeroe(heroe: Heroe): Observable<any>{
    return this.http.delete<Heroe>(`${this._baseUrl}/heroes/${heroe.id}`);
  }
}
