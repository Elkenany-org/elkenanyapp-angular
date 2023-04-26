import { Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/@core/services/auth/auth.service';
import { Profile } from '@app/@core/@data/userData';
import { environment } from "environments/environment";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { NotificationsService } from '@app/@core/services/modules/notifications/notifications.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit  {
  // @Output() deviceToken = new EventEmitter<string>();


  message:any=[];
  notification_ads:any=[]
  notification_all:any=[]

  isCollapsed: boolean = false;
  totalLength:number=0;

  private wasInside = false;
  navbarOpen = false;
  islogedIn?:number
  Profile?:Profile
  @HostBinding("class.show") isOpen = false;
  classList: any;
  @HostListener("click") toggleOpen() {
    this.isOpen = !this.isOpen;
    this.wasInside = true;
  }
  
  // https://stackoverflow.com/a/46656671
  @HostListener("document:click") clickout() {
    if (!this.wasInside) {this.isOpen = false;}
    this.wasInside = false;
  }

  constructor(
    private auth: AuthService,
    private router: Router,
    private notifications:NotificationsService ) { }

  ngOnInit(): void {
    ///////subscribe on login by google on home screen
    this.auth.dataTonav.subscribe(
      (res)=>{//login
        if(res==true){
          this.auth.profile().subscribe(res => {
            this.Profile = res.data
            this.islogedIn=1
          })
        }else{//logout
          this.islogedIn=0
          this.totalLength=0
          this.message=[]
          this.notification_all=[]
        }
        }
    )
    //////////////////
    // this.totalLength=localStorage.getItem('total')!

    this.auth.CheckAuth().subscribe(res => {
      this.islogedIn= res.data
      this.auth.profile().subscribe(res => {
        this.Profile = res.data
      },(err) => {
        console.log(err)
      })
      
    },(err)=> {
      console.log(err);
      
      this.islogedIn= err.error.data
    })

    this.notifications.notifications_market().subscribe(
      (res)=>{
        this.notification_ads=res.data?.data       
       
        this.notifications.notifications().subscribe(
        (res)=>{
          this.notification_all=res.data?.result    
              // console.log(this.notification_all);
          if(this.notification_ads != undefined){
          this.notification_all.push(...this.notification_ads);   
          }
          this.notification_all.sort(function(a:any, b:any) {
            var keyA = new Date(a.created_at), keyB = new Date(b.created_at);
            if (keyA < keyB){return 1;}
            if (keyA > keyB){return -1;}
            return 0;
          });   
        })

      })

      this.listen();
     



      let dpn = document.querySelector(".nav .dpn")
      let dpnList = document.querySelector(".nav .dpn-list")

      dpn?.addEventListener("click", function () {
          dpnList?.classList.toggle("active")
          dpn?.classList.toggle("active")
      })

      const dropdownMenu = document.querySelector('.dropdown-menu');
      const dropdownToggle = document.querySelector('.dropdown-toggle');
      dropdownToggle?.addEventListener('click', () => {
          dropdownMenu?.classList.toggle('show');
      });
  }

  togglesignin(){
          let sign_in = document.querySelector(".dpn")
          let sign_in_list = document.querySelector(".dpn .dpn-list")

        sign_in_list?.classList.toggle("active")
        sign_in?.classList.toggle("active")
  }

  toggleSidebar() {
    let more = document.querySelector(".header-2 .more")
    let sidebar = document.querySelector(".header-2 .sidebar")

    more?.classList.toggle("active")
    sidebar?.classList.toggle("active")
  }
  
  toggledropinsidebar(){
    let sidebarDpn = document.querySelector(".sidebar-nav .dpn .dpn-list")
    let sidebarDpnList = document.querySelector(".sidebar-nav .dpn .list-container")
        sidebarDpn?.classList.toggle("active")
        sidebarDpnList?.classList.toggle("active")

  }

  toggleNotification() {
    let notify = document.querySelector(".notify")
    let notifyList = document.querySelector(".notify .notifyList")

    notify?.classList.toggle("active")
    notifyList?.classList.toggle("active")
  }

  toggleNavbar() { this.navbarOpen = !this.navbarOpen;}



  logout() {
   this.auth.Logout()
  }


  goToSearch(word:string) {
    this.router.navigate(['search', word])
  }


  
  unread:boolean=false
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      this.message.unshift(payload);
      
      this.totalLength+=1
    });
  }
  check(){
    this.totalLength=0
    this.unread=true;
  }

  navigate(){
    this.router.navigate(['/']);
  }
}
