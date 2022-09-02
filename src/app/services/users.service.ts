import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string = 'https://peticiones.online/api/users';
  private userPerPage: number = 8;
  constructor(private httpClient: HttpClient) {}

  getAll(pPage?: number): Observable<any> {
    let pUrl = this.baseUrl;
    let pTotal = this.userPerPage;
    if (pPage) {
      return this.httpClient.get<any>(`${pUrl}?page=${pPage}&total=${pTotal}`);
    } else {
      return this.httpClient.get<any>(`${pUrl}?total=${pTotal}`);
    }
  }

  getById(pId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl + '/' + pId}`);
  }

  delete(pId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl + '/' + pId}`);
  }

  create(pUser: User): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, pUser);
  }

  update(pUser: User): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl + '/' + pUser.id}`, pUser);
  }
}
