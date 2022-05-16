import { Banner, Logo, Sector } from "@app/@core/interfaces/_app/app-response"

  
  export interface Market {
    sectors: Sector[]
    banners: Banner[]
    logos: Logo[]
    data: MarktData[]
    current_page: number
    last_page: number
    first_page_url: string
    next_page_url: any
    last_page_url: string
  }
  
  
  export interface MarktData {
    id: number
    title: string
    salary: number
    address: string
    image: string
    created_at: string
  }
  