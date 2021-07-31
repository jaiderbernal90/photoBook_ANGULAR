import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { suscipcionService } from './services/suscripcion.service';
import { tap } from 'rxjs/operators';
import { Suscipcion } from './interfaces/suscripcion.interface';
import { HistoriasService } from '../../historias/services/historias.service';
import { Historias } from '../../historias/interfaces/historias.interfaces';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  formSuscribe !: FormGroup;
  date_actual :Date = new Date();
  mensaje:string = '';
  mensajeError:string = '';
  historias !: Historias[];
  historiaslimit !: Historias[];


  constructor(private fb: FormBuilder,public suscipcionService: suscipcionService,private HistoriasSvc: HistoriasService) {
    this.formSuscribe = this.fb.group({
      name: ['', [Validators.minLength(4),Validators.required]],
      email: ['', [Validators.email, Validators.required,Validators.minLength(6)]],
    });
    this.listarHistoriasLimit();
  }

  ngOnInit() {}

  onSubmit(){ 
    this.mensaje = '';
    this.mensajeError= '';
    const date = Date.now();

    if(this.formSuscribe.status == "VALID"){    
      this.suscipcionService.createSuscription({ 
        name: this.formSuscribe.value.name,
        email: this.formSuscribe.value.email,
        date_creation: new Date(date)
      })
      .subscribe(respuesta =>{        
        if(this.isKeyExists(respuesta, 'mensaje')){
          this.mensaje = 'Suscripción realizada exitosamente';
          this.formSuscribe.reset();
        }else if(this.isKeyExists(respuesta, 'error')){
          this.mensajeError = `El correo ${this.formSuscribe.value.email} ya tiene una suscripción activa.`;
        }
      } );

    }
  }

  listarHistorias(): void{
    this.HistoriasSvc.getHistorias().pipe(
      tap((historias : Historias[]) => this.historias = historias)
    ).subscribe();
  }

  listarHistoriasLimit(): void{
    this.HistoriasSvc.getHistoriasLimit(4).pipe(
      tap((historias : Historias[]) => {
        this.historiaslimit = historias
        console.log(historias);
        
      })
    ).subscribe();
  }

  // VALIDA SI EXISTE UNA LLAVE EN UN OBJETO
  private isKeyExists(obj:any,key:any){
    return key in obj;
  }

}
