import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '@app/@core/@data/API/api';
import {environment as env} from '../../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  credit():Observable<any>{
    return this.http.post<any>(`${env.ApiUrl}/credit`,{})
  }
  wallet(data:{phone:string}):Observable<any>{
    return this.http.post<any>(`${env.ApiUrl}/wallet`,data)
  }

}
