import { Banner, Logo, Section } from "../_app/app-response"

export interface AllNews {
    sections: Section[]
    banners: Banner[]
    logos: Logo[]
    data: News[]
    current_page: number
    last_page: number
    first_page_url: string
    next_page_url: string
    last_page_url: string
  }
  
  
  
  export interface News {
    id: number
    title: string
    image: string
    created_at: string
  }
  ///////
  
  export interface NewsDetials {
    banners: any[]
    logos: any[]
    id: number
    title: string
    image: string
    desc: string
    created_at: string
    news: News[]
  }
  
  export interface News {
    id: number
    title: string
    image: string
    created_at: string
  }
  
  
  