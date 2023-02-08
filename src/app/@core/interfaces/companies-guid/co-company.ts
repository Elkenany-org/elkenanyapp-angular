
  
  export interface company {
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
    phones: Phone[]
    emails: Email[]
    mobiles: Mobile[]
    faxs: Fax[]
    social: Social[]
    addresses: any[]
    gallary: any[]
    gallary_alboum:any[]
    products: any[]
    localstock: Localstock[]
    fodderstock: Fodderstock[]
    transports: any[]
    cities: City[]
  }
  
  export interface Phone {
    phone: string
  }
  
  export interface Email {
    email: string
  }
  
  export interface Mobile {
    mobile: string
  }
  
  export interface Fax {
    fax: string
  }
  
  export interface Social {
    social_id: number
    social_link: string
    social_name: string
    social_icon: string
  }
  
  export interface Localstock {
    image: string
    name: string
    id: number
  }
  
  export interface Fodderstock {
    image: string
    name: string
    id: number
  }
  
  export interface City {
    id: number
    name: string
  }
  