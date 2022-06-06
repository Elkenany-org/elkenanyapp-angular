import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GallaryService } from '@app/@core/services/app/gallery/gallary.service';

@Component({
  selector: 'app-exhibitors',
  templateUrl: './exhibitors.component.html',
  styleUrls: ['./exhibitors.component.scss']
})
export class ExhibitorsComponent implements OnInit {

  public data?:any
  constructor(private router : Router,
              private galleryService:GallaryService) { }

  ngOnInit(): void {
    let url =  this.router.url.split('/') 
    
    this.galleryService.showers(+url[url.length-2]).subscribe(res => {
       this.data = res.data
       console.log(this.data)

    })
  }
}
