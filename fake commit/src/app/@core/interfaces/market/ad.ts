import { Sector } from "../_app/app-response"

export interface Ad {
    sectors: Sector[]
    ad_detials: AdDetials
  }
  

  
  export interface AdDetials {
    id: number
    title: string
    desc: string
    phone: string
    address: string
    con_type: string
    salary: number
    images: Image[]
  }
  
  export interface Image {
    id: number
    image: string
  }
  

