import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { Magazine } from '@app/@core/interfaces/magazine/magazine';
import { MagazineService } from '../../../../@core/services/modules/magazine/magazine.service';

@Component({
  selector: 'app-magazine-details',
  templateUrl: './magazine-details.component.html',
  styleUrls: ['./magazine-details.component.scss']
})
export class MagazineDetailsComponent implements OnInit {
magazineData?: Magazine
public rateValue:number=0
public addRate!: FormGroup
  constructor(private magazine:MagazineService,
              private route: ActivatedRoute,private fb:FormBuilder,
              private titleService:Title) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      // this.route.params.subscribe((prm:Params) => {
        // this.magazine.magazine(prm['id']).subscribe(res => {
          this.magazineData =  data['resolve'].data 
          this.titleService.setTitle(this.magazineData?.name!);


        // })
      // })
     


      })


    this.addRate =this.fb.group({
      rate: ['', [Validators.required]],
    })

  }

  sendRate() {
    this.rateValue=this.addRate.controls['rate'].value
    let body ={maga_id:this.magazineData?.id+'' , reat:this.addRate.controls['rate'].value}
    // console.log(body);
    this.magazine.rate(body).subscribe(
    (res) => {
      // console.log('====================================');
      // console.log(res);
      // console.log('====================================');
      document.getElementById('msg-rate')!.style.display="block";

    },
    (err)=>{
      document.getElementById('msg-auth')!.style.display="block";
    }
    )
    // formData.forEach(ite => console.log(ite))
  }
}
