import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AlertService } from '@app/@core/services/alert.service';
import { ContactService } from '@app/@core/services/modules/contact-us/contact.service';
import { ToasterService } from '@app/@core/services/toastr.service';

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


  navigationItems1 = [
    { label: 'home', isActive: true ,offset:0},
    { label: 'about', isActive: false ,offset:0},
    { label: 'Founder Of', isActive: false ,offset:0},
    { label: 'Achievements & Awards', isActive: false ,offset:0},
    { label: 'contact', isActive: false ,offset:0},

  ];

  navigationItems2 = [
    { label: 'home', isActive: true ,offset:0},
    { label: 'about', isActive: false ,offset:0},
    { label: 'Founder Of', isActive: false ,offset:900},
    { label: 'Achievements & Awards', isActive: false ,offset:2500},
    { label: 'contact', isActive: false ,offset:3500},

  ];

  public isOpen = false;
  public active:boolean=true

  contactForm!: FormGroup;

  constructor(private scroll: ViewportScroller ,     private Toaster:ToasterService    ,   private titleService:Title,private elementRef: ElementRef, private contactService:ContactService , private fb: FormBuilder,     private alertService: AlertService, 

    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Dr.Gamal El-Kenany');

    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });

  }

  toggleHeader() {
    let menuIcon = document.querySelector(".header-2 .menu-icon");
    let headerDpn = document.querySelector(".header-2 .dpn");

    menuIcon?.classList.toggle("active");
    headerDpn?.classList.toggle("active");
   
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

    this.scroll.scrollToPosition([0,0]);
    // Reset the isActive property for all items
    this.navigationItems1.forEach(navItem => navItem.isActive = false);
    this.navigationItems2.forEach(navItem => navItem.isActive = false);

    // Set isActive to true for the clicked item
    item.isActive = true;
 
    if(item.label=='home'){
      // this.home.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' ,  inline: 'nearest', blockOffset: scrollOffset });
      this.scroll.scrollToPosition([0,item.offset]);
      }
      else if(item.label=='about'){
        this.scroll.scrollToPosition([0,535+item.offset]);
      }
      else if(item.label=='Founder Of'){
        this.scroll.scrollToPosition([0,1075+item.offset]);
      }
      else if(item.label=='Achievements & Awards'){
        this.scroll.scrollToPosition([0,2604+item.offset]);

      }
      else if(item.label=='contact'){
        this.scroll.scrollToPosition([0,3074+item.offset]);
      }
  }

  onSubmit(): void {
    const payload: any = {
      name: this.contactForm.controls['name'].value,
      email: this.contactForm.controls['email'].value,
      message: this.contactForm.controls['message'].value,

    };
    this.contactService.sendMessage(payload).subscribe(
      (res) => {
        this.Toaster.showSuccess('Message sent successfully');
      },
      (err) => {
        console.log(err);
        this.Toaster.showFail(err.error.error);
      }
    );
  }
}
