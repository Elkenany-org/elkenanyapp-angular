import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GallaryService } from '@app/@core/services/app/gallery/gallary.service';

@Component({
  selector: 'app-gallary',
  templateUrl: './gallary.component.html',
  styleUrls: ['./gallary.component.scss']
})
export class GallaryComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private galleryService:GallaryService) { }

  ngOnInit(): void {
    this.route.params.subscribe(prm => {
      console.log((prm['id']))

      this.galleryService.gallery(prm['id']).subscribe(res => {

        console.log(res)

      })

    })
  }

}
