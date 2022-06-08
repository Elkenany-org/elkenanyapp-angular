import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/@core/@data/API/api';
import { map, Observable } from 'rxjs';
import {environment as env} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {
  }

  Home(): Observable<any> {
    return this.http.get<any>(`${env.ApiUrl}/home-sectors`).pipe(
      map((res) => {
        const data:any= {
          logos: res.data?.logos,
          sectors: res.data?.sectors,
          banner:res.data?.banners

        }
        return data
      })
    );
  }


}
