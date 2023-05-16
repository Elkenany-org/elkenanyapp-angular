import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { Magazine } from '@app/@core/interfaces/magazine/magazine';
import { MagazineService } from '../../../../@core/services/modules/magazine/magazine.service';

interface Tab {
  title: string;
  content: TemplateRef<any> | null; // Adjusted type to allow TemplateRef or null
}
@Component({
  selector: 'app-magazine-details',
  templateUrl: './magazine-details.component.html',
  styleUrls: ['./magazine-details.component.scss']
})
export class MagazineDetailsComponent implements OnInit {
magazineData?: Magazine
public rateValue:number=0
public addRate!: FormGroup

tabs : Tab[]= [
  { title: 'Tab 1', content: null },
  { title: 'Tab 2', content: null },
];

@ViewChild('about') about!: TemplateRef<any>;
@ViewChild('info') info!: TemplateRef<any>;

activeTab: number = 0;
currentTab: any;

  constructor(private magazine:MagazineService,
              private route: ActivatedRoute,private fb:FormBuilder,
              private titleService:Title) { }

  ngAfterViewInit() {
                this.tabs[0].content = this.about;
                this.tabs[1].content = this.info;
                this.currentTab = this.tabs[0];
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {

          this.magazineData =  data['resolve'].data 
          this.titleService.setTitle(this.magazineData?.name!);

      })


    this.addRate =this.fb.group({
      rate: ['', [Validators.required]],
    })

  }

  sendRate() {
    this.rateValue=this.addRate.controls['rate'].value
    let body ={maga_id:this.magazineData?.id+'' , reat:this.addRate.controls['rate'].value}
    this.magazine.rate(body).subscribe(
    (res) => {
      document.getElementById('msg-rate')!.style.display="block";

    },
    (err)=>{
      document.getElementById('msg-auth')!.style.display="block";
    }
    )
  }

  changeTab(tabIndex: number) {
    this.activeTab = tabIndex;
    this.currentTab = this.tabs[tabIndex];
  }

}
