import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss'],
})
export class PokeListComponent implements OnInit {
  public getAllPokemon: any;
  private setAllPokemon: any;

  public apiError: boolean = false;

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit(): void {
    this.loading();
  }

  search(value: string) {
    const filter = this.setAllPokemon.filter((res: any) => {
      return !res.name.indexOf(value.toLocaleLowerCase());
    });
    this.getAllPokemon = filter;
  }

  buscarProximos() {
    this.pokeApiService.definirProximos();
    this.loading();
  }

  buscarAnteriores() {
    const temPagAnterior = this.pokeApiService.definirAnteriores();
    if (temPagAnterior) this.loading();
  }

  loading() {
    this.pokeApiService.apiListAllPokemons.subscribe({
      next: (res) => {
        next: this.getAllPokemon = this.setAllPokemon = res.results;
      },
      error: (error) => {
        error: this.apiError = true;
      },
    });
  }
}
