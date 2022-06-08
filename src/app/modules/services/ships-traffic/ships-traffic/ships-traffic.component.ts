import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { Ships, ship_traffic_Search_Form } from '@app/@core/interfaces/ships-traffic/ships-traffic';
import { Banner, Logo } from '@app/@core/interfaces/_app/app-response';
import { JsonFormData } from '@app/@core/interfaces/_app/filter-list';
import { BannersLogoservice } from '@app/@core/services/Banners-logos.service';
import { map } from 'rxjs';
import { ShipsTrafficService } from '../../../../@core/services/modules/ships-trafic/ships-traffic.service';

@Component({
  selector: 'app-ships-traffic',
  templateUrl: './ships-traffic.component.html',
  styleUrls: ['./ships-traffic.component.scss']
})
export class ShipsTrafficComponent implements OnInit {
  public data?:Ships
  
  public filterData:{[key:string]:string} = {
    type:"poultry",
    sort:"1",
    search:"",
    cities:'1',
  }
  public h_search_form?:JsonFormData  
  constructor(
                private route:ActivatedRoute,
               private BannerLogoService:BannersLogoservice,
               private ships: ShipsTrafficService) { }

  ngOnInit(): void {
    this.route.data.pipe(
      map((data) => {
       return data
       })
    ).subscribe(res => {
      this.data=res['resolve'].data
      this.BannerLogoService.setLogo(res['resolve'].data.logos as Logo[])
      this.BannerLogoService.setBanner(res['resolve'].data.banners as Banner[])
    })
    this.h_search_form = ship_traffic_Search_Form

  }

  filter(value:any):void {
    console.log(value)
    this.ships.ships(value.name).subscribe(res => {
      this.data= res.data
      console.log(res)
    })

  }
}
