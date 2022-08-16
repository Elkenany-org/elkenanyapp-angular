import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'environments/environment';

// declare var createAnalytics: (analyticsTrackingId: string) => void;
type Tracker = {
  send: (
    hitType: string,
    category: string,
    action: string,
    label?: string
  ) => void;
};

declare const ga: {
  (...args: any[]): () => void;
  getAll: () => Tracker[];
};

const has = Object.prototype.hasOwnProperty;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
//  gtag!: Function;

//   constructor(private router: Router,
//     ) { }

//   setUpAnalytics() {
//     this.router.events.subscribe((event) => {
//       if (event instanceof NavigationEnd) {
//         this.gtag('config', 'G-B1Y47W3VQM', { 'page_path': event.urlAfterRedirects });
//       }      
//     })
// }

// init() {
//   const analyticsTrackingId = environment.firebase.measurementId;
//   createAnalytics(analyticsTrackingId);
// }

logCustomEvent(
  eventCategory: string,
  eventAction: string,
  eventLabel?: string
) {
  ga(() => {
    if (has.call(window, "ga")) {
      const tracker = ga.getAll();
      if (tracker?.length > 0) {
        tracker[0]?.send("event", eventCategory, eventAction, eventLabel);
      }
    }
  });
}

logPageView(url: string) {
  ga(() => {
    if (has.call(window, "ga")) {
      ga("set", "page", url);
      ga("send", "pageview");
    }
  });
}
}
