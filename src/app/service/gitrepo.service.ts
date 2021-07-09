import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchInfo } from '../search/search-info';

@Injectable({
  providedIn: 'root'
})
export class GitrepoService {
  private readonly apiRoot = 'https://api.github.com/search';
  constructor(private http: HttpClient) { }
  getRepository(reqData: SearchInfo): Observable<any> {
    const url = `${this.apiRoot}/repositories?per_page=${reqData.perPage ? reqData.perPage : 10}&q=${reqData.keyword}&page=${reqData.page}`;
    return this.http.get<any>(url);
  }
}
