import { Banner, Logo, Sector, Social } from "../_app/app-response"
import { JsonFormData } from "../_app/filter-list"








export interface Magazines {
  sectors: Sector[]
  banners: Banner[]
  logos: Logo[]
  data: MagazinesData[]
  current_page: number
  last_page: number
  first_page_url: string
  next_page_url: string
  last_page_url: string
}



export interface MagazinesData {
  id: number
  name: string
  rate: number
  image: string
  desc: string
  address: string
}

///////////////////////////////


export interface Magazine {
    id: number
    name: string
    short_desc: string
    about: string
    address: string
    latitude: string
    longitude: string
    rate: number
    count_rate: number
    image: string
    created_at: string
    phones: any[]
    emails: Email[]
    mobiles: Mobile[]
    faxs: any[]
    social: any[]
    gallary: any[]
    guides: any[]
  }
  
  export interface Email {
    email: string
  }
  
  export interface Mobile {
    mobile: string
  }

//////////////////////////////

export const Magazine_Search_Form: JsonFormData  =
{   
  title: "الدلائل والمجلات",
  class:"tabs tabs-4",
    controls: [
      {
        name: "بحث",
        type: "search",
        role:"search",
        class: "form-control",
        value: "",
        icon:"",
        validators: {
          required: false,
        }
      },
      {
        name: "القطاع:",
        type: "select",
        role: "sector",
        class: "form-control",
        value: "",
        icon:"",
        option: [],
        validators: {
          required: false,
        }
      },
      {
        name: "الدول:",
        type: "select",
        role: "countries",
        class: "form-control",
        value: "",
        icon:"",
        option: [],
        validators: {
          required: false,
        }
      },
      {
        name: "المدينة:",
        type: "select",
        role: "cities",
        class: "form-control",
        value: "",
        icon:"",
        option: [],
        validators: {
          required: false,
        }
      },
      {
        name: "الترتيب:",
        type: "select",
        role:"sort",
        class: "form-control",
        value: "",
        icon:"",
        option: [],
        validators: {
          required: false,
        }
      }
    ]
  }
