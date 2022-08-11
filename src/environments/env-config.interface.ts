// Feel free to extend this interface
// depending on your app specific config.
export interface EnvConfig {
  ApiUrl: string;
  production: boolean;
  ENV?: string;
  VERSION?: string;
  firebase: {
    databaseURL:string,
    apiKey: string,
    authDomain: string,
    projectId: string,
    storageBucket:string,
    messagingSenderId:string,
    appId:string,
    measurementId:string
  }
}
