import { LogoIn } from "../_app/app-response"
import { Sector } from "../_app/filter-list"

  
  export interface guide {
    sectors: Sector[]
    banners: any[]
    logos: any[]
    sub_sections: SubSection[]
  }
  

  
  export interface SubSection {
    id: number
    name: string
    image: string
    companies_count: number
    logo_in: LogoIn[]
  }
  
