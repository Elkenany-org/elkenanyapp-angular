import { Banner, Logo } from "@app/@core/interfaces/_app/app-response"

export interface AdDetails {
    banners: Banner[]
    logos: Logo[]
    id: number
    title: string
    salary: number
    phone: string
    view_count: number
    address: string
    paid: string
    user: string
    type: string
    desc: string
    created_at: string
    images: {image:string}[]
  }
  

  
