import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contato } from '../model/contato';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private contatosUrl: string;
	
  constructor(private http: HttpClient) {
    this.contatosUrl = 'http://localhost:8080/contato';
  }
 
  public findAll(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.contatosUrl + "/all");
  }
 
  public save(contato: Contato) {
    return this.http.post<Contato>(this.contatosUrl + "/save", contato);
  }

  public findId(id: number): Observable<Contato> {
    return this.http.get<Contato>(this.contatosUrl + "/" + id);
  }
 
  public deleteId(id: number): Observable<any> {
    return this.http.delete(this.contatosUrl + "/" + id);
  }
 

}
