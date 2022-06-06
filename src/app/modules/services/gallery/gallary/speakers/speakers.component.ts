import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GallaryService } from '@app/@core/services/app/gallery/gallary.service';

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.scss']
})
export class SpeakersComponent implements OnInit {

  public data?:any
  constructor(private router : Router,
              private galleryService:GallaryService,) { }

  ngOnInit(): void {
    let url =  this.router.url.split('/') 
    
    this.galleryService.speakers(+url[url.length-2]).subscribe(res => {
       this.data = res.data
       console.log(this.data)

    })
  }
}
