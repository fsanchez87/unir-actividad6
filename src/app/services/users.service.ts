import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string = 'https://peticiones.online/api/users/';
  constructor(private httpClient: HttpClient) {}

  getAll(pUrl: string = this.baseUrl): Observable<any> {
    return this.httpClient.get<any>(pUrl);
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
