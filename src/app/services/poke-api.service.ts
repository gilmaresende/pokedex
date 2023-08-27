import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private numberFist: number = 0;
  private amountPokemonsByPage: number = 30;

  constructor(private http: HttpClient) {}

  get apiListAllPokemons(): Observable<any> {
    const URL: string = `https://pokeapi.co/api/v2/pokemon?offset=${this.numberFist}&limit=${this.amountPokemonsByPage}`;
    return this.http.get<any>(URL).pipe(
      tap((res) => res),
      tap((res) => {
        res.results.map((resPokemons: any) => {
          this.apiGetPokemon(resPokemons.url).subscribe(
            (res) => (resPokemons.status = res)
          );
        });
      })
    );
  }

  public apiGetPokemon(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(map((res) => res));
  }

  public definirProximos() {
    this.numberFist += this.amountPokemonsByPage;
  }

  public definirAnteriores(): boolean {
    const temAnterior = this.numberFist - this.amountPokemonsByPage;
    if (temAnterior >= 0) {
      this.numberFist -= this.amountPokemonsByPage;
      return true;
    }
    return false;
  }
}
