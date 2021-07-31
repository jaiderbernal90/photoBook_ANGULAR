import { Component, OnInit } from '@angular/core';
import { HistoriasService } from './services/historias.service';
import { tap } from 'rxjs/operators';
import { Historias } from './interfaces/historias.interfaces';

@Component({
  selector: 'app-historias',
  templateUrl: './historias.component.html',
  styleUrls: ['./historias.component.css']
})
export class HistoriasComponent implements OnInit {

  historias !: Historias[];
  historia !: Historias;
  historia_destacada !: Historias[];

  titleHistoria:string = '';
  prefijoTitle:string = '';
  description_large:string = '';
  description_short:string = '';
  author_id:string = '';
  image:string = '';
  date:number = Date.now();

  constructor(private HistoriasSvc: HistoriasService) {}

  ngOnInit(): void {
    this.listarHistorias();
    this.historiaDestacada();
  }

  listarHistorias(): void{
    this.HistoriasSvc.getHistorias().pipe(
      tap((historias : Historias[]) => this.historias = historias)
    ).subscribe();
  }

  historiaDestacada(): void{
    this.HistoriasSvc.getOneHistorias().pipe(
      tap((historia : Historias[]) => this.historia_destacada = historia)
    ).subscribe();
  }

  // Enviar datos a la api para crear una historia
  crearHistoria(): void{
    const date = Date.now();

    
    this.historia = {
      'title': this.titleHistoria,
      'prefijoTitle': this.prefijoTitle,
      'description_large': this.description_large,
      'description_short': this.description_short,
      'author_id': this.author_id,
      'image': this.image,
      'date_creation': new Date(date)
    }

    this.HistoriasSvc.createHistorias(this.historia)
        .subscribe(respuesta => console.log(respuesta));
  }

  // Enviar datos y id a la api para editar una historia
  editarHistoria(): void{
    const date = Date.now();

    this.historia = {
      'title': this.titleHistoria,
      'prefijoTitle': this.prefijoTitle,
      'description_large': this.description_large,
      'description_short': this.description_short,
      'author_id': this.author_id,
      'image': this.image,
      'date_modification': new Date(date),
    }

    this.HistoriasSvc.updateHistoria(this.historia, '60fca34e59e70641649a1046')
    .subscribe(respuesta => console.log(respuesta));
  }

  // Enviar id a la api para eliminar una historia
  eliminarHistoria(): void{
    this.HistoriasSvc.deleteHistoria('60fca26d59e70641649a1045').subscribe(respuesta => console.log(respuesta));
  }

}
