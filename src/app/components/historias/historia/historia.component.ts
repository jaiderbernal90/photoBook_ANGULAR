import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HistoriasService } from '../services/historias.service';
import { tap } from 'rxjs/operators';
import { Historias } from '../interfaces/historias.interfaces';


@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['./historia.component.css']
})
export class HistoriaComponent implements OnInit {

  historia !: any;
  descripcionFormart!: string;


  constructor(private HistoriasSvc: HistoriasService,private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    this.listarHistoria();
  }

  listarHistoria(): void{
    this.HistoriasSvc.viewHistorias(this.rutaActiva.snapshot.params.id).pipe(
      tap((historias : Historias[]) => {
        this.historia = historias;
      })
    ).subscribe();
  }


}
