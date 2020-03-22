import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Buscar: FormGroup;
  pokemons:[];
  Pokemon;
  img;
  abilities;
  next:string;
  previous:string;

  createFormGrup(){
    return new FormGroup ({
      NamePokemon : new FormControl('',[Validators.required])
    });
  }
  constructor(
    private _pokemons : DataApiService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.obtPokemons();
    this.Buscar = this.createFormGrup();
  }

  obtPokemons(){
    this._pokemons.getPokemons().subscribe(
      (res:any)=>{
        this.next = res.next;
        this.previous = res.previous;
        this.pokemons = res.results;
      },err =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocurrio un error, recarga la pagina para continuar',
        });
      }
    );
  }

  Next(next:string){
    this._pokemons.nextPokemons(next).subscribe(
      (res:any)=>{
        this.next = res.next;
        this.previous = res.previous;
        this.pokemons = res.results;
      },err =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocurrio un error, recarga la pagina para continuar',
        });
      }
    )
  }

  Previous(previous:string){
    this._pokemons.previousPokemons(previous).subscribe(
      (res:any)=>{
        this.next = res.next;
        this.previous = res.previous;
        this.pokemons = res.results;
      },err =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocurrio un error, recarga la pagina para continuar',
        });
      }
    );
  }

  clickBuscar(name){
     let nombre = name.NamePokemon;
    if(nombre.length>3){
      if(this.Buscar.valid){
        this._pokemons.buscarPokemon(nombre).subscribe(
          (res:any)=>{
            this.Pokemon = res;
            this.img = res.sprites;
            this.abilities = res.abilities;
            for (let i of this.abilities) {
              this.abilities = i.ability
            }
          },err=>{
            Swal.fire({
              icon: 'error',
              title: 'Oops Error...',
              text: 'No se encontro ningun pokémon con el nombre: '+nombre,
            });
            this.reset();
          }
        );
      }
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor se más especifico con la busqueda',
      });
    }
    
  }

  reset(){
    this.Buscar.reset();
  }

  verPokemon(pokemon:string){
    this._pokemons.getPokemon(pokemon).subscribe(
      (res:any) =>{
        this.Pokemon = res;
        this.img = res.sprites;
        this.abilities = res.abilities;
        for (let i of this.abilities) {
          this.abilities = i.ability
        }
      },err=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Por favor se más especifico con la busqueda',
        });
      }
    );
  }

}
