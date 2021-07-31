import { Component, OnInit } from '@angular/core';
import { HistoriasService } from '../../historias/services/historias.service';
import { tap } from 'rxjs/operators';
import { Historias } from '../../historias/interfaces/historias.interfaces';

@Component({
  selector: 'app-historias-admin',
  templateUrl: './historias-admin.component.html',
  styleUrls: ['./historias-admin.component.css']
})
export class HistoriasAdminComponent implements OnInit {

  historias !: Historias[];
  mensaje:string = '';
  mensajeError:string = '';

  constructor(private HistoriasSvc: HistoriasService) {}

  ngOnInit(): void {
    this.listarHistorias();
  }

  listarHistorias(): void{
    this.HistoriasSvc.getHistorias().pipe(
      tap((historias : Historias[]) => {
        this.historias = historias;
      })
    ).subscribe();
  }

  eliminarHistoria(id: any){
    this.HistoriasSvc.deleteHistoria(id).pipe(
      tap((response: any) => {
        console.log(response);
        if(this.isKeyExists(response, 'mensaje')){
          this.mensaje = 'Historia borrada correctamente';
          this.listarHistorias();
        }
      })
    ).subscribe();
  }

  isKeyExists(obj:any,key:any){
    return key in obj;
  }


}
