import { Banner, City, Country, Logo, Sector, Sort } from "../_app/app-response"
import { JsonFormData } from "../_app/filter-list"

export interface GallriesData {
    sectors: Sector[]
    banners: Banner[]
    logos: Logo[]
    data: Gallries[]
    current_page: number
    last_page: number
    first_page_url: string
    next_page_url: string
    last_page_url: string
  }
  

  
  export interface Gallries {
    id: number
    name: string
    rate: number
    image: string
    desc: string
    address: string
    view_count: number
    date: string
    going_state: any
    deeb_link: string
    link: string
  }


  export const Gallries_Search_Form: JsonFormData  =
{   
  title: "المعارض",
  class:"tabs tabs-4",
    controls: [
      {
        name: "بحث",
        type: "search",
        role:"search",
        class: "form-control",
        value: "",
        icon:"fas fa-search",
        validators: {
          required: false,
        }
      },
      {
        name: "القسم",
        type: "select",
        role: "sector",
        class: "form-control",
        value: "",
        icon:"fas fa-puzzle-piece",
        option: [],
        validators: {
          required: false,
        }
      },
     {
        name: "الدول",
        type: "select",
        role: "countries",
        class: "form-control",
        value: "",
        icon:"fas fa-map-marker-alt",
        option: [],
        validators: {
          required: false,
        }
      },      {
        name: "المدينة",
        type: "select",
        role: "cities",
        class: "form-control",
        value: "",
        icon:"fas fa-map-marker-alt",
        option: [],
        validators: {
          required: false,
        }
      }, 
      {
        name: "الترتيب",
        type: "select",
        role:"sort",
        class: "form-control",
        value: "",
        icon:"fas fa-sort-amount-down",
        option: [],
        validators: {
          required: false,
        }
      }
    ]
  }




  
//-------------------------------------------- Gallery page -----------------------//


export interface Gallery {
  banners: Banner[]
  logos: Logo[]
  id: number
  name: string
  short_desc: string
  view_count: number
  address: string
  rate: number
  count_Showers: number
  image: string
  created_at: string
  times: Time[]
  dates: Date[]
  tickets: Ticket[]
  images: Image[]
  organisers: Organiser[]
}

export interface Time {
  time: string
}

export interface Date {
  date: string
}

export interface Ticket {
  name: string
  price: number
}

export interface Image {
  image: string
  id: number
}

export interface Organiser {
  name: string
  id: number
}





//-------------------------------------------- rate page --------------------------------------------


export interface Rate {
  banners: Banner[]
  logos: Logo[]
  review: Review[]
  rate: number
}

export interface Review {
  name: string
  email: string
  desc: string
  created_at: string
  rate?: number
  id: number
}


















  ////////////////



