import { Component, OnInit } from '@angular/core';
import { BannersLogoservice } from '@app/@core/services/Banners-logos.service';
import { HomeService } from '@app/@core/services/modules/home/home.service';

@Component({
  selector: 'app-academy-home',
  templateUrl: './academy-home.component.html',
  styleUrls: ['./academy-home.component.scss']
})
export class AcademyHomeComponent implements OnInit {
  public loading: boolean = true;

  constructor(private BannerLogoService:BannersLogoservice,    private home:HomeService,
    ) { }

  ngOnInit(): void {

    this.home.Home().subscribe( res => {

      this.BannerLogoService.setMostVisited(res.most_visited);//attribute will replaces with another response when
      this.BannerLogoService.setNewestServices(res.newest);

      this.loading = false;
    
      })
    

  }

  fc=true;
  nc=false;

toggle(){
 this.fc=!this.fc
 this.nc=!this.nc
}
}
