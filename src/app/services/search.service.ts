import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  BASE_URL = 'https://swapi.dev/api/';

  constructor(private httpClient: HttpClient) { }

  search(path: string, keyword?: String): Observable<Object>{
    let keywordValue = keyword !== undefined ? keyword : ''
    return this.httpClient.get(this.BASE_URL+path+'?search='+keywordValue);
  }
}
