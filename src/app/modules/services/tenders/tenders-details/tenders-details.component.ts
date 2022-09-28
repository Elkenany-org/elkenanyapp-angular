import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TendersDetials } from '@app/@core/interfaces/news/news';
import { TendersService } from '@app/@core/services/modules/tenders/tenders.service';

@Component({
  selector: 'app-tenders-details',
  templateUrl: './tenders-details.component.html',
  styleUrls: ['./tenders-details.component.scss']
})
export class TendersDetailsComponent implements OnInit {

  public tender_details? : TendersDetials
  constructor(private route:ActivatedRoute,
              private tenders: TendersService,
              private sanitizer: DomSanitizer,
              private titleService:Title,
              private router: Router

) { }
new:any;
video:any;
banner:any[]=[]
loading=false
image:any=''
type:string=''
href: string = "";

ngOnInit(): void {
  this.route.params.subscribe(prm => {
          //get type
          this.href = this.router.url;
          let start = this.getPosition(this.href, '/', 2)
          let end = this.getPosition(this.href, '/', 3)
          this.type = this.href.slice(start+1,end)
          //end getting type
   this.tenders.news_details(prm['id']).subscribe(res => {
    this.titleService.setTitle(res.data?.title!);
    this.tender_details = res.data
     this.new = this.sanitizer.bypassSecurityTrustHtml(this.tender_details?.desc!);  
      let text=this.new.changingThisBreaksApplicationSecurity;

      if(text.match("<iframe")){
                let x=text.match("<iframe").index
      let y=text.match("</iframe>").index+9
      this.video = this.sanitizer.bypassSecurityTrustHtml(text.slice(x,y));  
      }

      if(text.match("<a")){
        let x=text.match("href").index
      let y=text.match("</a>").index+4

      }



   })
  })
}

getPosition(x:string, substring:string, index:any) {
  return x.split(substring, index).join(substring).length;
}
}
