import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CatalogueService {
  public baseUrl = "https://smart-educ-back.herokuapp.com/";
  // public baseUrl = 'http://localhost:8080/';
  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  public getList(resource): Observable<any> {
    return this.http.get(this.baseUrl + resource);
  }

  public getResource(url): Observable<any> {
    return this.http.get(url);
  }

  public postResource(resource, data): Observable<any> {
    return this.http.post(this.baseUrl + resource, data, this.httpOptions);
  }

  public update(resourceUrl: string, data: any): Observable<any> {
    return this.http.put(resourceUrl, data);
  }

  deleteByUrl(url: string): Observable<any> {
    return this.http.delete(url);
  }

  delete(url: string, data:any): Observable<any> {
    return this.http.delete(this.baseUrl+url, data);
  }
}
