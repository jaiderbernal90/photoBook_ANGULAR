import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Historias } from '../../../historias/interfaces/historias.interfaces';
import { HistoriasService } from '../../../historias/services/historias.service';
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  historia !: Historias[];
  historiaSin !: any;
  imagenName !: string;
  title !: string;
  nameImage !: string;
  formHistory !: FormGroup;
  date_actual :Date = new Date();
  mensaje:string = '';
  mensajeError:string = '';
  selectedImage:any; 


  constructor(private rutaActiva: ActivatedRoute,private HistoriasSvc: HistoriasService, private fb: FormBuilder,private router:Router) {
    this.listarHistoria();  

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

  listarHistoria(): void{
    this.HistoriasSvc.viewHistorias(this.rutaActiva.snapshot.params.id).pipe(
      tap((historias : Historias[]) => {
        this.historiaSin = historias;
        this.formulario();
      })
    ).subscribe();    
  }

  formulario(fb ?: FormBuilder): void{
    this.formHistory = this.fb.group({
      titulo: [this.historiaSin.title, [Validators.minLength(8),Validators.required]],
      autor: [this.historiaSin.autor, [Validators.minLength(5),Validators.required]],
      descripcionCorta: [this.historiaSin.description_short, [Validators.required,Validators.minLength(50),Validators.maxLength(255)]],
      descripcionLarga: [this.historiaSin.description_large, [Validators.required,Validators.minLength(50)]],
      imagen: ['', []],
    });

    this.imagenName = this.historiaSin.image;
  }

  onSubmit(){ 

    if(this.formHistory.value.imagen == ''){
      this.formHistory.value.imagen = this.imagenName;
    } else{
      this.uploadImage(this.selectedImage[0]);
      this.formHistory.value.imagen = this.updateName(this.selectedImage[0].name,'save');
    }

    const date = Date.now();

    this.mensaje = '';
    this.mensajeError= '';    
    
    if(this.formHistory.status == "VALID"){
      this.HistoriasSvc.updateHistoria({ 
        title: this.formHistory.value.titulo,
        autor: this.formHistory.value.autor,
        prefijoTitle: this.formHistory.value.titulo,
        description_large:this.formHistory.value.descripcionLarga,
        description_short:this.formHistory.value.descripcionCorta,
        image: this.formHistory.value.imagen,
        date_modification: new Date(date),
      }, this.rutaActiva.snapshot.params.id)
      .subscribe(respuesta =>{
        if(this.isKeyExists(respuesta, 'mensaje')){
          this.mensaje = 'Historia actualizada correctamente';
          setTimeout(() =>{
            this.router.navigate(['administrador/historias']);
          },1500)
        }
      } );
    }
    
  }
  selectFile(event:any){    
    this.selectedImage = event.target.files;
    
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


  isKeyExists(obj:any,key:any){
    return key in obj;
  }
}
