import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '@app/@core/@data/API/api';
import { environment as env} from './../../../../../../environments/environment';
import { Search } from '@app/@core/interfaces/_app/app-response';



@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient) { }
  search(word:string):Observable<ApiResponse<Search>>{
    return this.http.get<ApiResponse<Search>>(`${env.ApiUrl}/search-all?search=${word}`)
  }
}
