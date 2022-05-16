import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GallaryService } from '@app/@core/services/app/gallery/gallary.service';
import { ToasterService } from '@app/@shared/services/toastr.service';

@Component({
  selector: 'app-exhibitors',
  templateUrl: './exhibitors.component.html',
  styleUrls: ['./exhibitors.component.scss']
})
export class ExhibitorsComponent implements OnInit {

  public data?:any
  constructor(private router : Router,
              private galleryService:GallaryService,
              private toster:ToasterService) { }

  ngOnInit(): void {
    this.toster.loading('جاري التحميل')
    let url =  this.router.url.split('/') 
    
    this.galleryService.showers(+url[url.length-2]).subscribe(res => {
       this.toster.stopLoading()
       this.data = res.data
       console.log(this.data)

    })
  }
}
