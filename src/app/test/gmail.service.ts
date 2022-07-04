import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GmailService {

  constructor() {
    gapi.load('client',()=>{
      gapi.client.init({
        apiKey:'AIzaSyCDbImbUvMzw3Tj0YHfPsWxFpmMczo1--Y',
        clientId:'804758451233-ibji01abav1q8m3pu1ske6h8oi8esbnd.apps.googleusercontent.com',
        discoveryDocs:["https://www.googleapis.come/discovery/v1/apis/gmail/v1/rest"],
        scope:'https://www.googleapis.com/auth/gmail.readonly'
      })
    })
   }
   public list(user : gapi.auth2.GoogleUser): Promise<gapi.client.gmail.ListMessagesResponse>{
    return new Promise(resolve =>{
      gapi.client.gmail.users.messages.list({
        userId : user.getId(),
        access_token : user.getAuthResponse().access_token,
        maxResults : 5,
      }).then(response =>{
        resolve(response.result)
      })
    })

   }
   public getMessage(user:gapi.auth2.GoogleUser,id:String):Promise<string>{
    return new Promise(resolve => {
      gapi.client.gmail.users.messages.get({
        userId : user.getId(),
        access_token : user.getAuthResponse().access_token,
        id:id+""
      }).then(response =>{
        console.log("response data is :",response.body);
        resolve(response.result.snippet+"")
      })
    })
   }
}
