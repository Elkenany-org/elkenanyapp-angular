import { Banner, Logo } from "@app/@core/interfaces/_app/app-response"

export interface MyAd {
    banners: Banner[]
    logos: Logo[]
    data: Data[]
    current_page: number
    last_page: number
    first_page_url: string
    next_page_url: any
    last_page_url: string
  }
  
  export interface Data {
    id: number
    title: string
    desc:string
    salary: number
    address: string
    image: string
    created_at: string
  }
  