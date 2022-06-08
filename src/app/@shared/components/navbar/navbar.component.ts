import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { AuthService } from '@app/@core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  private wasInside = false;
  navbarOpen = false;
  islogedIn?:number

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
      console.log(res.data)
    },(err)=> {
      this.islogedIn= err.error.data

      console.log(err.error.data);
    })



    //  console.log(this.isLogedIn());
     
  }



  toggleNavbar() { this.navbarOpen = !this.navbarOpen;}




  logout() {
   this.auth.Logout()
  }


  goToSearch(word:string) {
    this.router.navigate(['search', word])
  }




}
