import { Component, OnInit } from '@angular/core';
import { HistoriasService } from '../services/historias.service';
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Historias } from '../interfaces/historias.interfaces';

@Component({
  selector: 'app-form-create-historia',
  templateUrl: './form-create-historia.component.html',
  styleUrls: ['./form-create-historia.component.css']
})
export class FormCreateHistoriaComponent implements OnInit {


  historia !: Historias;
  formHistory !: FormGroup;
  date_actual :Date = new Date();
  mensaje:string = '';
  mensajeError:string = '';

  afuConfig = {
    uploadAPI: {
      url:"https://example-file-upload-api"
    }
  }


  constructor(private fb: FormBuilder,private HistoriasSvc: HistoriasService) {
    this.formHistory = this.fb.group({
      titulo: ['', [Validators.minLength(8),Validators.required]],
      descripcionCorta: ['', [Validators.required,Validators.minLength(50),Validators.maxLength(255)]],
      descripcionLarga: ['', [Validators.required,Validators.minLength(50)]],
      imagen: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    
  }

  onSubmit(){ 
    this.mensaje = '';
    this.mensajeError= '';
    
    
    if(this.formHistory.status == "VALID"){
      this.HistoriasSvc.createHistorias({ 
        title: this.formHistory.value.titulo,
        prefijoTitle: this.formHistory.value.titulo,
        description_large:this.formHistory.value.descripcionLarga,
        description_short:this.formHistory.value.descripcionCorta,
        author_id:'60ce2904a59c30c5da5192c7',
        image:this.formHistory.value.imagen.substr(12),
        date_creation:`${this.date_actual.getDate()}${this.date_actual.getMonth()}${this.date_actual.getFullYear()}`,
        date_modification: '',
      })
      .subscribe(respuesta =>{
        console.log(respuesta);
        if(this.isKeyExists(respuesta, 'mensaje')){
          this.mensaje = 'Historia agregada exitosamente';
          this.formHistory.reset();
        }
      } );
    }
    
  }

  isKeyExists(obj:any,key:any){
    return key in obj;
  }

}
