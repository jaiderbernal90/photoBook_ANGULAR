import { Component, OnInit } from '@angular/core';
import { HistoriasService } from '../services/historias.service';
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Historias } from '../interfaces/historias.interfaces';
import { HttpEventType, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-form-create-historia',
  templateUrl: './form-create-historia.component.html',
  styleUrls: ['./form-create-historia.component.css']
})
export class FormCreateHistoriaComponent implements OnInit {


  historia !: Historias;
  formHistory !: FormGroup;
  nameImage !: string;
  date_actual :Date = new Date();
  mensaje:string = '';
  mensajeError:string = '';
  selectedImage:any; 

  constructor(private fb: FormBuilder,private HistoriasSvc: HistoriasService) {
    this.formHistory = this.fb.group({
      titulo: ['', [Validators.minLength(8),Validators.required]],
      autor: ['', [Validators.minLength(5),Validators.required]],
      descripcionCorta: ['', [Validators.required,Validators.minLength(50),Validators.maxLength(255)]],
      descripcionLarga: ['', [Validators.required,Validators.minLength(50)]],
      imagen: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    
  }

  onSubmit(){ 


    const date = Date.now();
    this.mensaje = '';
    this.mensajeError= '';
    
    
    if(this.formHistory.status == "VALID"){
      this.uploadImage(this.selectedImage[0]);
      this.HistoriasSvc.createHistorias({ 
        title: this.formHistory.value.titulo,
        autor: this.formHistory.value.autor,
        prefijoTitle: this.formHistory.value.titulo,
        description_large:this.formHistory.value.descripcionLarga,
        description_short:this.formHistory.value.descripcionCorta,
        image: this.updateName(this.selectedImage[0].name,'save'),
        date_creation: new Date(date),
      })
      .subscribe(respuesta =>{
        if(this.isKeyExists(respuesta, 'mensaje')){
          this.mensaje = 'Historia agregada exitosamente';
          this.formHistory.reset();
        }
      } );
    }
    
  }

  selectFile(event:any){    
    this.selectedImage = event.target.files;
    console.log(Date.now());
    
  }

  uploadImage(file: any){
     this.HistoriasSvc.upload(file,this.updateName(this.selectedImage[0].name,"upload")).subscribe(
       event =>{
         if(event.type === HttpEventType.UploadProgress){
            
         }else if(event instanceof HttpResponse){
          this.mensaje = event.body.mensaje;
         }
       },
       err => {
         this.mensaje = 'No se pudo subir el archivo';
       }
     );
  }

  isKeyExists(obj:any,key:any){
    return key in obj;
  }

  updateName(name:string, type:string){
    let nameArchivo = "";
    if(type == "upload"){
      nameArchivo = name.replace(/ /g, "-");
      nameArchivo = nameArchivo.replace(/[^a-zA-Z]/g, "")+'-'+ Date.now();    
      nameArchivo = nameArchivo.toLowerCase(); 
      this.nameImage = nameArchivo;  
  
    }else if(type == "save"){
      const num = name.indexOf(".");
      const ext = name.slice(num); 

      nameArchivo = `${this.nameImage}${ext}`;    
    }
    
    return nameArchivo;
  }

}
