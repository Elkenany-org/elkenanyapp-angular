
export interface Majors {
    sectors: Sector[]
    banners: any[]
    logos: any[]
    sub_sections: SubSection[]
  }
  
  export interface Sector {
    id: number
    name: string
    type: string
    selected: number
  }
  
  export interface SubSection {
    id: number
    name: string
    image: string
    Doctor_count: number
    logo_in: any[]
  }
  

//   export interface Doctors {
//     data: Daum[]
//     current_page: number
//     last_page: number
//     first_page_url: string
//     next_page_url: any
//     last_page_url: string
//   }
  
  export interface Doctors {
    id: number
    name: string
    certificates: string
    adress: string
    image: string
    type: string
  }
  