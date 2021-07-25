import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { suscipcionService } from './services/suscripcion.service';
import { tap } from 'rxjs/operators';
import { Suscipcion } from './interfaces/suscripcion.interface';

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

  constructor(private fb: FormBuilder,public suscipcionService: suscipcionService) {
    this.formSuscribe = this.fb.group({
      name: ['', [Validators.minLength(4),Validators.required]],
      email: ['', [Validators.email, Validators.required,Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  onSubmit(){ 
    this.mensaje = '';
    this.mensajeError= '';
    if(this.formSuscribe.status == "VALID"){    
      this.suscipcionService.createSuscription({ 
        name: this.formSuscribe.value.name,
        email: this.formSuscribe.value.email,
        date_mofication: '',
        date_creation: `${this.date_actual.getDate()}${this.date_actual.getMonth()}${this.date_actual.getFullYear()}`
      })
      .subscribe(respuesta =>{
        console.log(respuesta);
        
        if(this.isKeyExists(respuesta, 'mensaje')){
          this.mensaje = 'Suscripción realizada exitosamente';
          this.formSuscribe.reset();
        }else if(this.isKeyExists(respuesta, 'error')){
          this.mensajeError = `El correo ${this.formSuscribe.value.email} ya tiene una suscripción activa.`;
        }
      } );

    }
  }

  // VALIDA SI EXISTE UNA LLAVE EN UN OBJETO
  private isKeyExists(obj:any,key:any){
    return key in obj;
  }

}
