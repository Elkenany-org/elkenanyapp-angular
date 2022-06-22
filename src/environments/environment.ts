// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvConfig } from "./env-config.interface";

export const environment: EnvConfig = {
  production: false,
  ApiUrl: 'https://elkenany.com/api',
  firebase: { //used account : ahmedbenmady@gmail.com 
    apiKey: "AIzaSyDikm6-UFLYPIN5lPL0NC3Jo5oLOMO-Ijo",
    authDomain: "elkenany-4961e.firebaseapp.com",
    projectId: "elkenany-4961e",
    storageBucket: "elkenany-4961e.appspot.com",
    messagingSenderId: "22736259198",
    appId: "1:22736259198:web:3c9a89c84baa68febfb02f",
  }
  // ApiUrl: 'https://test.elkenany.com/api',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
