import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Magazine } from '@app/@core/interfaces/magazine/magazine';
import { MagazineService } from '../_core/services/magazine.service';

@Component({
  selector: 'app-magazine-details',
  templateUrl: './magazine-details.component.html',
  styleUrls: ['./magazine-details.component.scss']
})
export class MagazineDetailsComponent implements OnInit {
magazineData?: Magazine
  constructor(private magazine:MagazineService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.route.params.subscribe((prm:Params) => {
        this.magazine.magazine(prm['id']).subscribe(res => {
          this.magazineData =  data['resolve'].data 
        })
      })
     
    })


  }

}
