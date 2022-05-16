import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rate } from '@app/@core/interfaces/gallery/gallery';
import { GallaryService } from '@app/@core/services/app/gallery/gallary.service';
import { ToasterService } from '@app/@shared/services/toastr.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  public data?:Rate

  constructor(private router : Router,
              private galleryService:GallaryService,
              private toster:ToasterService) { }

  ngOnInit(): void {
    this.toster.loading('جاري التحميل')
    let url =  this.router.url.split('/') 
    
    this.galleryService.reviews(+url[url.length-2]).subscribe(res => {
       this.toster.stopLoading()
       this.data = res.data
       console.log(res.data)

    })
  }
}
