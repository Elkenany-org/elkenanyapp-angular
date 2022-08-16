import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/@core/services/auth/auth.service';
import { Profile } from '@app/@core/@data/userData';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  isCollapsed: boolean = false;

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
    private router: Router) { }

  ngOnInit(): void {

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




}
