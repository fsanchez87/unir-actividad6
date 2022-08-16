import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string = 'https://peticiones.online/api/users/';
  constructor(private httpClient: HttpClient) {}

  getAll(pUrl: string = this.baseUrl): Observable<any> {
    return this.httpClient.get<any>(pUrl);
  }
}