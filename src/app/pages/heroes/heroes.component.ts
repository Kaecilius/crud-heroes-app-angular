import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: [
  ]
})
export class HeroesComponent implements OnInit {

  constructor( private heroesService: HeroesService ) { }
  heroes: HeroeModel[] = [];
  cargando = false;

  ngOnInit(): void {

    this.cargando = true;
    this.heroesService.getHeroes()
                      .subscribe( resp => {
                        //console.log(resp);
                        this.heroes = resp;
                        this.cargando = false;
                      });
  }

  borrarHeroe( heroe:HeroeModel, i:number ){

    Swal.fire({
      title:'¿Está Seguro?',
      text:`Está seguro que desea borrar a ${ heroe.nombre }`,
      icon:'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if(resp.value){
        this.heroes.splice(i, 1);
        this.heroesService.borrarHeroe( heroe.id ).subscribe();
      }
    })

   

  }

}
