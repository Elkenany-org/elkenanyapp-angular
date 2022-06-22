export interface LoginDataObject {
    email: string;
    password: string;
  }
  

export interface RegisterDataObject {
  name: string,
  email: string,
  phone: string,
  password: string,
  device_token: string
}
export interface LoginDataResponse {
name: string;
email: string;
phone: string;
api_token: string;
}



export interface User {
name: string;
email: string;
id: number;
}


export interface UserProfile {
user: User;

}
//--------------------------- Profile ------------------------------//
export interface Profile {
  id: number
  name: string
  phone: string
  email: string
  image: string
  state: string
}

//----------------------------- google gegister ------------------------------//

export interface googleRegister {
  name: string
  email: string
  api_token: string
}
