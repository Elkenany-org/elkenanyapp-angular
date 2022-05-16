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
