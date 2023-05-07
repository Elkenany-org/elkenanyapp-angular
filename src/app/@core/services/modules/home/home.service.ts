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
    return this.http.get<any>(`${env.ApiUrl}/home-services`).pipe(
      map((res) => {
        const data:any= {
          logos: res.data?.logos,
          banner:res.data?.banners,
          services:res.data?.services,
          app:res.data?.app,
          cta:res.data?.cta,
          questions:res.data?.questions,
          howtouse:res.data?.howtouse,
          claim:res.data?.claim,
          most_visited:res.data?.most_visited,
          newest:res.data?.newest,
        }
        return data
      })
    );
  }


}
