import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(
    private _http: HttpClient
  ) { }

  getPokemons(){
    return this._http.get('https://pokeapi.co/api/v2/pokemon');
  }

  buscarPokemon(name:string){
    return this._http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

  nextPokemons(url:string){
    return this._http.get(url);
  }

  previousPokemons(url:string){
    return this._http.get(url);
  }

  getPokemon(pokemon:string){
    return this._http.get(pokemon);
  }

}
