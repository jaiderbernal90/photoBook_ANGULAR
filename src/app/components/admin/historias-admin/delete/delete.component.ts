import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Historias } from '../../../historias/interfaces/historias.interfaces';
import { HistoriasService } from '../../../historias/services/historias.service';
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  @Output() mensaje:string = '';
  mensajeError:string = '';

  constructor(private HistoriasSvc: HistoriasService,private rutaActiva: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.HistoriasSvc.deleteHistoria(this.rutaActiva.snapshot.params.id).pipe(
      tap((response: any) => {
        console.log(response);
        if(this.isKeyExists(response, 'mensaje')){
          this.mensaje = 'Historia borrada correctamente';
          setTimeout(() =>{
            this.router.navigate(['administrador/historias']);
          },1500)
        }
      })
    ).subscribe();
  }
  
  isKeyExists(obj:any,key:any){
    return key in obj;
  }

}
