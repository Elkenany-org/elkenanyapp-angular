// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvConfig } from "./env-config.interface";

export const environment: EnvConfig = {
  production: false,
  // ApiUrl: 'http://localhost/kenany_3/api',

  // ApiUrl: 'https://test.elkenany.com/api',
  ApiUrl: 'https://elkenany.com/api',
  firebase: { //used account : ahmedbenmady@gmail.com 
    apiKey: "AIzaSyCiDUgxLWo_ghSubmhpA02CxF6dCoW3Lpk",
    authDomain: "oshop-7e416.firebaseapp.com",
    databaseURL: "https://oshop-7e416.firebaseio.com",
    projectId: "oshop-7e416",
    storageBucket: "oshop-7e416.appspot.com",
    messagingSenderId: "955401749290",
    appId: "1:955401749290:web:a8c7f8c33160aaba5b5453"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
