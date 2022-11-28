export interface Banner {
    id: number
    link: string
    image: string
  }
  
export interface Logo extends Banner {

}

export interface Sector {
  id: number
  name: string
  type: string
  selected: number

}

export interface Qualified{
  id: number
  name: string
  value: string
}
//----------------------------- FilterList  -----------------------------//

  
export interface FilterList {
  sectors: Sector[]
  sort: Sort[]
  countries?: Country[]
  cities?: City[]
  sub_sections?: SubSection[]
  categories?: Category[]
  qualified?: Qualified[]

}

//----------------------------- Social  -----------------------------//
export interface Social {
  social_id: number
  social_link: string
  social_name: string
  social_icon: string
}


//----------------------------- Member  -----------------------------//
  
export interface Member {
  name: string
  image?: string
  mem_id: number
  price: number
  feed: string
  change: string
  change_date: string
  type: number
  statistics: string
  kind?: string
  new_columns?: string[]
}


//----------------------------- Category  -----------------------------//

export interface Category {
  id: number
  name: string
  selected: number
}

//----------------------------- Category  -----------------------------//

export interface Column {
  title: string
}


export interface LogoIn {
  id: number
  link: string
  image: string
}


export interface SubSection extends FodSection{}


export interface FodSection {
  id: number
  name: string
  image: string
  members: number
  type: string
  logo_in: any[]
}

//----------------------------- Company  -----------------------------//

  export interface Company {
    id: number
    name: string
    image: string
  }
 //----------------------------- Section  -----------------------------//

export interface Section {
  id: number
  name: string
  type: string
  selected: string
}


 //----------------------------- FodderSubSection  -----------------------------//

 export interface FodderSubSection {
  id: number
  name: string
  type: string
  selected: string
}

//----------------------------- City  -----------------------------//

export interface City {
  id: number
  name: string
}

export interface Country {
  id: number
  name: string
  selected: number
}


////////
export interface Sort {
  id: number
  name: string
  value: number
}


//---------------------------- search --------------------------//

export interface Search {
  result: Result[]
}

export interface Result {
  id: number
  name: string
  price:number
  count:number
  date:string[]
  image: string
  short_desc: string
  address: string
  type: string
  section_id:string
  created_at:string
}

///////filter tenders
export interface TendersFilterList {
  sections: Sector[]
  sort: Sort[]
  cities?: City[]
}