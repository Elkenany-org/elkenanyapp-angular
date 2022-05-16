import { Injectable } from '@angular/core';
// import { Banner } from '@app/modules/sectors/stock-exchange/_core/data/stock-res-data';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { Banner, Logo } from '../interfaces/_app/app-response';


@Injectable({
  providedIn: 'root'
})
export class BannersLogoservice {

  private dataBanner: BehaviorSubject<Banner[]|null> = new BehaviorSubject<Banner[]|null>(null);
  private dataLogo: BehaviorSubject<Logo[]|null> = new BehaviorSubject<Logo[]|null>(null);
 

  setBanner(data: Banner[]):void {
    this.dataBanner.next(data);
  }

  setLogo(data: Logo[]):void {
    this.dataLogo.next(data);
  }

  getBanner(): Observable<Banner[]|null> {
    return this.dataBanner.asObservable()
  }
  getLogo(): Observable<Logo[]|null> {
    return this.dataLogo.asObservable()
  }

}
