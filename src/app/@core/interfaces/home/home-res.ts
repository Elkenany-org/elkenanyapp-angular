import { Sector } from "@app/@core/interfaces/_app/app-response"

export interface Home {
  sectors: Sector[]
  logos: Logo[]
  popup: Popup
  type: string
  recomandtion: Recomandtion[]
  guide: Guide[]
  stock: Stock[]
  news: News[]
  store: Store[]
}



export interface Logo {
  id: number
  link: string
  image: string
}

export interface Popup {
  id: number
  link: string
  media: string
}

export interface Recomandtion {
  id: number
  name: string
  type: string
  image: string
  companies_count?: number
  members?: number
}

export interface Guide {
  id: number
  name: string
  type: string
  image: string
  companies_count: number
}

export interface Stock {
  id: number
  name: string
  type: string
  image: string
  members: number
}

export interface News {
  id: number
  name: string
  type: string
  image: string
}

export interface Store {
  id: number
  name: string
  type: string
  image: string
}
