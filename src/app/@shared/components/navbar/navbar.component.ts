import { Component, EventEmitter, HostBinding, HostListener, OnInit, Output } from '@angular/core';
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

export class NavbarComponent implements OnInit {
  // @Output() deviceToken = new EventEmitter<string>();
  message:any=[];
  notification:any=[]
  notification2:any=[]

  isCollapsed: boolean = false;
  totalLength:string='0';

  private wasInside = false;
  navbarOpen = false;
  islogedIn?:number
  Profile?:Profile
  @HostBinding("class.show") isOpen = false;
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

    this.totalLength=localStorage.getItem('total')!
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
        this.notification=res.data?.data   
        console.log('====================================');
        console.log(this.notification);
        console.log('====================================');
      })

      this.notifications.notifications().subscribe(
        (res)=>{
          this.notification2=res.data?.nots   
          console.log('====================================');
          console.log(this.notification2);
          console.log('====================================');
        })

      this.listen();

    // this.auth.requestPermission();
    // this.auth.listen();
    // this.auth.deviceToken.subscribe((item)=>{
    //   console.log('====================================');
    //   console.log(item);
    //   console.log('====================================');
    // });
    

    //  console.log(this.isLogedIn());
     
  }



  toggleNavbar() { this.navbarOpen = !this.navbarOpen;}


// login(){
//   this.router.navigate(['/user/login']).then(() => {
//     location.reload();
//   });
// }

  logout() {
   this.auth.Logout()
  }


  goToSearch(word:string) {
    this.router.navigate(['search', word])
  }


  // deviceTokenTemp="";
  // message:any = null;
  // requestPermission() {
  //   const messaging = getMessaging();
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker.register('../firebase-messaging-sw.js')
  //       .then(function(registration) {
  //         console.log('Registration successful, scope is:', registration.scope);
  //       }).catch(function(err) {
  //         console.log('Service worker registration failed, error:', err);
  //       });
  //     }
  //   getToken(messaging, 
  //    { vapidKey: environment.firebase.vapidKey}).then(
  //      (currentToken) => {
  //        if (currentToken) {
  //          console.log("Hurraaa!!! we got the token.....");
  //          console.log(currentToken);  
  //          this.deviceTokenTemp=currentToken
  //        } else {
  //          console.log('No registration token available. Request permission to generate one.');
  //        }
  //    }).catch((err) => {
  //       console.log('An error occurred while retrieving token. ', err);
  //   });

  // }
  unread:boolean=false
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      // console.log('Message received. ', payload);
      this.message.unshift(payload);
      
      let temp=parseInt(localStorage.getItem('total')!)+this.message.length 
      this.totalLength=temp
      localStorage.setItem('total',this.totalLength)
    });
  }
  check(){
    localStorage.setItem('total','0')
    this.totalLength='0'
    this.unread=true;
  }

}
