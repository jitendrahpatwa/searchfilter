import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchdataService {

  constructor(
    private http: HttpClient
  ) { }

  getData(data: any): Observable<any> {
    return this.http.get('/assets/data.json');
  }
}
