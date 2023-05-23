import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Doctors } from '@app/@core/interfaces/consaltants/consaltants';
import { ConsaltantsService } from '@app/@core/services/modules/consaltants/consaltants.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-consaltants-home',
  templateUrl: './consaltants-home.component.html',
  styleUrls: ['./consaltants-home.component.scss']
})
export class ConsaltantsHomeComponent implements OnInit {

  public loading: boolean = false
  public doctors? : Doctors[]

  constructor(private consaltants:ConsaltantsService,private activatedRoute: ActivatedRoute,private titleService:Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("الاستشاريين");

    this.activatedRoute.data.pipe(
      map((data) => {
       return data
       })
    ).subscribe(res =>{//featch tha data from StockExhangeResolver 
      this.doctors = res['resolve'].data.data  as Doctors[]
      this.loading = false;    
    })
  }

}
