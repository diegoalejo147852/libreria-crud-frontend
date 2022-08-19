import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LibrosService {


  private API_SERVER = "http://localhost:8080/libros";


  constructor(
    private httpClient : HttpClient
  ) { }


  public findAllLibro(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }  

  public saveLibro(libro:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER,libro);
  }

  public deleteLibro(id: string): Observable<any>{
    return this.httpClient.delete(this.API_SERVER+"/"+id);
  }

}
