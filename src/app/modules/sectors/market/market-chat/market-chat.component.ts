import { Component, OnInit,AfterViewChecked, ElementRef, ViewChild,  } from '@angular/core';

import { Form, NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { User } from '@app/@core/@data/userData';
import { chatMassages, Massage } from '@app/@core/interfaces/market/chat';
import { MarketService } from '@app/@core/services/modules/market/market.service';

@Component({
  selector: 'app-market-chat',
  templateUrl: './market-chat.component.html',
  styleUrls: ['./market-chat.component.scss']
})
export class MarketChatComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer?: ElementRef;
  chats?: Massage[]
  user?:User
  receiverId?:number
  chatMassages?: chatMassages
  constructor(
    private Market: MarketService,
    private route: ActivatedRoute,
    private titleService:Title
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('الرسائل');

    this.user =  JSON.parse(localStorage.getItem('user') || '')
    // console.log( this.user  )
    this.route.params.subscribe(parm => {
      // console.log(parm['id'])
    })
    this.get_chat()
    this.scrollToBottom();

    }
    scrollToBottom(): void {
      try {
          this.myScrollContainer!.nativeElement.scrollTop = this.myScrollContainer!.nativeElement.scrollHeight;
      } catch(err) { }                 
  }

  send_massage(contactForm:NgForm):void {
    // console.log();
    let data: FormData= new FormData()
    data.append("massage", contactForm.value.massage)
    data.append("id", this.receiverId+'')
    contactForm.reset()
    this.Market.add_massage(data).subscribe( res => {
      this.chatMassages= res.data?.chat.massages as any
     this.chat_massage(this.receiverId||0)
    })

  }

  get_chat():void {
    this.Market.chats().subscribe(res => {
      this.chats = res.data?.chat 
      // console.log( this.chats)

    })
  }


  chat_massage(id:number):void {
    this.receiverId= id
    this.Market.chat_massages(id).subscribe(res => {
      this.chatMassages = res.data
      this.scrollToBottom();        

      // console.log( this.chatMassages?.chat.massages)


    })
  }

  onSubmit(contactForm:NgForm) {
    
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
}

}
