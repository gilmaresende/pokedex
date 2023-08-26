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

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit(): void {
    this.pokeApiService.apiListAllPokemons.subscribe((res) => {
      this.getAllPokemon = this.setAllPokemon = res.results;
    });
  }

  search(value: string) {
    const filter = this.setAllPokemon.filter((res: any) => {
      return !res.name.indexOf(value.toLocaleLowerCase());
    });
    this.getAllPokemon = filter;
  }
}
