import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/@core/@data/API/api';
import { Ships, StatisticsShips } from '@app/@core/interfaces/ships-traffic/ships-traffic';
import { Observable } from 'rxjs';
import { environment as env } from "../../../../../../environments/environment";
import { StatisticsDetials } from './../../../../../@core/interfaces/ships-traffic/ships-traffic';

@Injectable({
  providedIn: 'root'
})
export class ShipsTrafficService {

  constructor(private http:HttpClient) { }

  ships(date:string):Observable<ApiResponse<Ships>> {
    return this.http.get<ApiResponse<Ships>>(`${env.ApiUrl}/ships/all-ships?date=${date}`)
  }

  Statistics():Observable<ApiResponse<StatisticsShips>> {
    return this.http.get<ApiResponse<StatisticsShips>>(`${env.ApiUrl}/ships/statistics-ships`)
  }

  StatisticsDetails(from:string, to:string, country:string, TyprId:number):Observable<ApiResponse<StatisticsDetials>> {
    return this.http.get<ApiResponse<StatisticsDetials>>(`${env.ApiUrl}/ships/statistics-ships-detials?from=${from}&to=${to}&country=${country}&id=${TyprId}`)
  }
}
