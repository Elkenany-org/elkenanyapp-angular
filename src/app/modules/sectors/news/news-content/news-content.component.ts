import { HtmlParser } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsDetials } from '@app/@core/interfaces/news/news';
import { NewsService } from '../../../../@core/services/modules/news/news.service';
import {DomSanitizer, Title} from '@angular/platform-browser';
import { BannersLogoservice } from '@app/@core/services/Banners-logos.service';

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
              private BannerLogoService:BannersLogoservice,
              private titleService:Title
) { }
new:any;
video:any;
banner:any[]=[]
loading=false
image:any=''
  ngOnInit(): void {
    this.route.params.subscribe(prm => {
      console.log(prm)
     this.news.news_details(prm['id']).subscribe(res => {
      this.titleService.setTitle(res.data?.title!);
      this.news_content = res.data
      // this.image=res.data?.image
      // this.banner.push(this.image)
      // this.BannerLogoService.setBanner(this.banner);
      // console.log(this.banner);
      
      // console.log(this.news_content)
      //  this.new=this.news_content?.desc; 
       this.new = this.sanitizer.bypassSecurityTrustHtml(this.news_content?.desc!);  
      //  console.log(this.new.changingThisBreaksApplicationSecurity);

        // console.log(this.new.changingThisBreaksApplicationSecurity.indexOf('<iframe>'));
        // console.log(this.new.changingThisBreaksApplicationSecurity.indexOf('</iframe>'));
        let text=this.new.changingThisBreaksApplicationSecurity;

        if(text.match("<iframe")){
                  let x=text.match("<iframe").index
        let y=text.match("</iframe>").index+9
        // console.log(text.slice(x,y));
this.video = this.sanitizer.bypassSecurityTrustHtml(text.slice(x,y));  
        }




     })
    })
  }

}
