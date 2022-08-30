import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/@core/@data/API/api';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {environment as env} from '../../../../../environments/environment';

import { FilterList } from '@app/@core/interfaces/_app/filter-list';
import { Market } from '@app/@core/interfaces/market/home';
import { AdDetails } from '@app/@core/interfaces/market/ad-detials';
import { Ad } from '@app/@core/interfaces/market/ad';
import { MyAd } from '@app/@core/interfaces/market/my-ads';
import { AddMassage, chatMassages, Chats, StartChat } from '@app/@core/interfaces/market/chat';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(private http: HttpClient) { }

  market(type:string, sort:string,search:string,page:string ):Observable<ApiResponse<Market>> {
    return this.http.get<ApiResponse<Market>>(`${env.ApiUrl}/store/ads-store?type=${type}&sort=${sort}&search=${search}&page=${page}`)
  }

  Filter_list(type:string ):Observable<ApiResponse<FilterList>> {
    return this.http.get<ApiResponse<FilterList>>(`${env.ApiUrl}/store/ads-store-sections?type=${type}`)
  }



  // ----------------------------------------- < AD endPoints > -----------------------------------------------//

  ad_details(id:number ):Observable<ApiResponse<AdDetails>> {
    return this.http.get<ApiResponse<AdDetails>>(`${env.ApiUrl}/store/ads-store-detials?id=${id}`)
  }


  get_ad(id:string ):Observable<ApiResponse<Ad>> {
    return this.http.get<ApiResponse<Ad>>(`${env.ApiUrl}/store/get-ads-store-to-edit?id=${id}`)
  } 
  add_ad( formData: FormData ):Observable<ApiResponse<Ad>> {
    return this.http.post<ApiResponse<Ad>>(`${env.ApiUrl}/store/add-ads-store`, formData)
  }

  edit_ad(formData: FormData ):Observable<ApiResponse<Ad>> {
    return this.http.post<ApiResponse<Ad>>(`${env.ApiUrl}/store/update-ads-store`, formData)
  }

  delete_ad(id: number ):Observable<ApiResponse<Ad>> {
    return this.http.get<ApiResponse<Ad>>(`${env.ApiUrl}/store/delete-ads-store?id=${id}`)
  }

  my_ads(type:string ):Observable<ApiResponse<MyAd>> {
    return this.http.get<ApiResponse<MyAd>>(`${env.ApiUrl}/store/my-ads-store?type=${type}`)
  }


  // ----------------------------------------- < Chat endPoints > -----------------------------------------------//
  start_chat(id?:number):Observable<ApiResponse<StartChat>> {
    return this.http.get<ApiResponse<StartChat>>(`${env.ApiUrl}/store/start-chat?id=${id}`)
  }

  chat_massages(id: number):Observable<ApiResponse<chatMassages>> {
    return this.http.get<ApiResponse<chatMassages>>(`${env.ApiUrl}/store/chats-massages?id=${id}`)
  }

  add_massage( formData: FormData ):Observable<ApiResponse<AddMassage>> {
    return this.http.post<ApiResponse<AddMassage>>(`${env.ApiUrl}/store/add-massages`, formData)
  }

  chats():Observable<ApiResponse<Chats>> {
    return this.http.get<ApiResponse<Chats>>(`${env.ApiUrl}/store/chats`)
  }





  






}
