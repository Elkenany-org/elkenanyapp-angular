import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/@core/@data/API/api';
import {environment as env} from '../../../../../environments/environment';
import { notifications, notifications_market } from '@app/@core/interfaces/market/notification';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) { }
  notifications_market(){
    return this.http.get<ApiResponse<notifications_market>>(`${env.ApiUrl}/store/notifications-ads`)
  }

  notifications(){
    return this.http.get<ApiResponse<notifications>>(`${env.ApiUrl}/notfications`)
  }
}
