import { Injectable } from '@angular/core';
// import { Banner } from '@app/modules/sectors/stock-exchange/_core/data/stock-res-data';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { Banner, Logo, MostVisited, NewestServices, Questions } from '../interfaces/_app/app-response';


@Injectable({
  providedIn: 'root'
})
export class BannersLogoservice {

  private dataBanner: BehaviorSubject<Banner[]|null> = new BehaviorSubject<Banner[]|null>(null);
  private dataLogo: BehaviorSubject<Logo[]|null> = new BehaviorSubject<Logo[]|null>(null);
  private dataMost: BehaviorSubject<Logo[]|null> = new BehaviorSubject<MostVisited[]|null>(null);
  private dataNewest: BehaviorSubject<Logo[]|null> = new BehaviorSubject<NewestServices[]|null>(null);
  private dataQuestions: BehaviorSubject<Logo[]|null> = new BehaviorSubject<Questions[]|null>(null);


  setBanner(data: Banner[]):void {
    this.dataBanner.next(data);
  }

  setLogo(data: Logo[]):void {
    this.dataLogo.next(data);
  }

  setMostVisited(data: MostVisited[]):void {
    this.dataMost.next(data);
  }

  setNewestServices(data: NewestServices[]):void {
    this.dataNewest.next(data);
  }
  setQuestions(data: Questions[]):void {
    this.dataQuestions.next(data);
  }

  getBanner(): Observable<Banner[]|null> {
    return this.dataBanner.asObservable()
  }
  getLogo(): Observable<Logo[]|null> {
    return this.dataLogo.asObservable()
  }

  getMostVisited(): Observable<MostVisited[]|null> {
    return this.dataMost.asObservable()
  }
  getNewestServices(): Observable<NewestServices[]|null> {
    return this.dataNewest.asObservable()
  }
  getQuestions(): Observable<Questions[]|null> {
    return this.dataQuestions.asObservable()
  }
}
