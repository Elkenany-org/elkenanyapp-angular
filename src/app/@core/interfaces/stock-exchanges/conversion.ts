export interface Comparison {
    stock_name: string
    companies: Company[]
    feeds: Feed[]
  }
  
  export interface Company {
    id: number
    name: string
  }
  
  export interface Feed {
    id: number
    name: string
  }
  


  export interface CompareBody {
    companies_id: number[]
    fodder_items_id: number[]
  }
  



  export interface Compare {
    companies: Company[]
  }
  
  export interface Company {
    id: number
    name: string
    image: string
    feed: Feed[]
  }
  
  export interface Feed {
    id: number
    name: string
    price: number
    created_at: string
  }
  