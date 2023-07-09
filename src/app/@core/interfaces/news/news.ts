import { Banner, Logo } from "../_app/app-response"

export interface AllNews { //for news and tenders
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
    date:string
    time:string
    news: News[]
  }
  
  export interface News {
    id: number
    title: string
    image: string
    created_at: string
  }
  
  /////tenders
  export interface TendersDetials {
    banners: any[]
    logos: any[]
    id: number
    title: string
    image: string
    desc: string
    created_at: string
    tenders: News[]
  }
  
  ////////////////home tenders

  export interface allSections {
    banners: any[]
    logos: any[]
    sections: Section[]
    current_page: number
    last_page: number
    first_page_url: string
    next_page_url: string
    last_page_url: string
  }
  
  export interface Section {
    id: number
    name: string
    image: string
  }
  