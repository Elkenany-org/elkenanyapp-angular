import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  downloadLink: string | undefined;

  constructor() { }

  ngOnInit(): void {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/android/.test(userAgent)) {
      // User is using an Android device
      this.downloadLink = 'https://play.google.com/store/apps/details?id=com.elkenany&pli=1';
    } else if (/iphone|ipad|ipod/.test(userAgent)) {
      // User is using an iOS device
      this.downloadLink = 'https://apps.apple.com/eg/app/%D8%A7%D9%84%D9%83%D9%86%D8%A7%D9%86%D9%8A/id1608815820';
    }
  }

  closePopup(): void {
    const popup = document.querySelector('.popup') as HTMLElement;
    if (popup) {
      popup.style.display = 'none';
    }
  }
}
