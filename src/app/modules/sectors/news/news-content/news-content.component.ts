import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsDetials } from '@app/@core/interfaces/news/news';
import { NewsService } from '../../../../@core/services/modules/news/news.service';
import {DomSanitizer, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-news-content',
  templateUrl: './news-content.component.html',
  styleUrls: ['./news-content.component.scss']
})
export class NewsContentComponent implements OnInit {
public news_content? : NewsDetials
  constructor(private route:ActivatedRoute,
              private news: NewsService,
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
     this.news.news_details(prm['id']).subscribe(res => {
      this.titleService.setTitle(res.data?.title!);
      this.news_content = res.data

       this.new = this.sanitizer.bypassSecurityTrustHtml(this.news_content?.desc!);  

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
