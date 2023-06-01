import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dr-gamal',
  templateUrl: './dr-gamal.component.html',
  styleUrls: ['./dr-gamal.component.scss']
})
export class DrGamalComponent implements OnInit {
  @ViewChild('home', { static: false, read: ElementRef }) home!: ElementRef ;
  @ViewChild('about', { static: false, read: ElementRef }) about!: ElementRef ;
  @ViewChild('history', { static: false, read: ElementRef }) history!: ElementRef ;
  @ViewChild('business', { static: false, read: ElementRef }) business!: ElementRef ;
  @ViewChild('contact', { static: false, read: ElementRef }) contact!: ElementRef ;


  navigationItems = [
    { label: 'home', isActive: true },
    { label: 'about', isActive: false },
    { label: 'Founder Of', isActive: false },
    { label: 'Achievements & Awards', isActive: false },
    { label: 'contact', isActive: false },

  ];

  public active:boolean=true
  constructor() { }

  ngOnInit(): void {
  }
  scrollToTarget(tab:string) {
    if(tab=='home'){
    this.home.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    else if(tab=='about'){
      this.about.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    else if(tab=='history'){
      this.history.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    else if(tab=='business'){
      this.business.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    else if(tab=='contact'){
      this.contact.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  setActive(item:any) {
    // Reset the isActive property for all items
    this.navigationItems.forEach(navItem => navItem.isActive = false);
    // Set isActive to true for the clicked item
    item.isActive = true;


    if(item.label=='home'){
      this.home.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' ,});
      }
      else if(item.label=='about'){
        this.about.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      else if(item.label=='Founder Of'){
        this.history.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      else if(item.label=='Achievements & Awards'){
        this.business.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      else if(item.label=='contact'){
        this.contact.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
  }
}
