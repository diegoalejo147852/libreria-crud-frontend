import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LibrosService } from './services/libros/libros.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
    

  librosForm: FormGroup; 
  libros: any;


  constructor( 
    public fb: FormBuilder,
    public librosService:LibrosService
  ){}


  ngOnInit(): void {
    this.librosForm = this.fb.group({  
      id: [''],
      nombre : ['',Validators.required],
      descripcion : ['',Validators.required],
      autor : ['',Validators.required],
      fechaPublicacion : ['',Validators.required],
      numEjemplar : ['',Validators.required],
      costo : ['',Validators.required]
    })    

    
    this.Listar();
    
  }

  Listar():void{
    this.librosService.findAllLibro().subscribe(resp =>{
      this.libros = resp;
    },
      error => { console.error(error) }
    );
  }

  guardar():void{
      this.librosService.saveLibro(this.librosForm.value).subscribe(resp => {
        this.librosForm.reset();
        this.libros=this.libros.filter((libros: { id: any; })=> resp.id!=libros.id);
        this.libros.push(resp);                    
    },
      error =>{ console.error(error)}      
    )
  }

  editar(libro: { id: any; nombre: any; descripcion: any; autor: any; fechaPublicacion: any; numEjemplar: any; costo: any; }):void{
    this.librosForm.setValue({
      id:libro.id,
      nombre : libro.nombre,
      descripcion : libro.descripcion,
      autor : libro.autor,
      fechaPublicacion : libro.fechaPublicacion,
      numEjemplar : libro.numEjemplar,
      costo : libro.costo
    })
  }

  eliminar(id: string):void{
      this.librosService.deleteLibro(id).subscribe(resp => {
         console.log(resp);
         if(resp=true){
            this.libros.pop(id);
         }
      })
  }


  


}
