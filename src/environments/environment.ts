// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvConfig } from "./env-config.interface";

export const environment: EnvConfig = {
  production: false,
  ApiUrl: 'http://localhost/kenany_3/api',

  // ApiUrl: 'https://test.elkenany.com/api',
  // ApiUrl: 'https://elkenany.com/api',
  firebase: { //used account : ahmedbenmady@gmail.com 
    databaseURL: "https://oshop-7e416.firebaseio.com",
    apiKey: "AIzaSyCuXH9l3JFLQvhItj62oghD7KeuLTwJdcs",
    authDomain: "causal-producer-359007.firebaseapp.com",
    projectId: "causal-producer-359007",
    storageBucket: "causal-producer-359007.appspot.com",
    messagingSenderId: "552649577410",
    appId: "1:552649577410:web:183dddf39d06304300bc5b",
    measurementId: "G-B1Y47W3VQM"
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
