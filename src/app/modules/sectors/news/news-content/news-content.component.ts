import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsDetials } from '@app/@core/interfaces/news/news';
import { NewsService } from '../../../../@core/services/modules/news/news.service';

@Component({
  selector: 'app-news-content',
  templateUrl: './news-content.component.html',
  styleUrls: ['./news-content.component.scss']
})
export class NewsContentComponent implements OnInit {
public news_content? : NewsDetials
  constructor(private route:ActivatedRoute,
              private news: NewsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(prm => {
      console.log(prm)
     this.news.news_details(prm['id']).subscribe(res => {
      this.news_content = res.data
      console.log(this.news_content)
     })
    })
  }

}
