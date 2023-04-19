import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '@app/@core/@data/API/api';
import { environment as env} from '../../../../../environments/environment';
import { Search } from '@app/@core/interfaces/_app/app-response';



@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }

  contactUs( formData: FormData ):Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${env.ApiUrl}/contuct-us`, formData)
  }
}
