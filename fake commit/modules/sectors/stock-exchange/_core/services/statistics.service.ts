import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/@core/@data/API/api';
import { StatisticsSubSec } from '../data/statisics-sub-sec';
import {environment as env} from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }


  GetStatisticsSubSec(type: string, from?: string, to?:string, id?:string, key?:string):Observable<ApiResponse<StatisticsSubSec>> {

    return this.http.get<ApiResponse<StatisticsSubSec>>(`${env.ApiUrl}/localstock/statistics-stock-sections?type=${type}`)
  }
}
