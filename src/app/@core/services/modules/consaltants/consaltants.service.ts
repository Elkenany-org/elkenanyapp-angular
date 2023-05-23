import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/@core/@data/API/api';
import { Doctors, Majors } from '@app/@core/interfaces/consaltants/consaltants';
import { Observable } from 'rxjs';
import {environment as env} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsaltantsService {

  constructor(private http: HttpClient) { }

  all_majors( sort:string,search:string,type:string ):Observable<ApiResponse<Majors>> {

    return this.http.get<ApiResponse<Majors>>(`${env.ApiUrl}/consultants/major?sort=${sort}&search=${search}&type=${type}`)
  }

  all_doctors():Observable<ApiResponse<Doctors>> {

    return this.http.get<ApiResponse<Doctors>>(`${env.ApiUrl}/consultants`)
  }

}
