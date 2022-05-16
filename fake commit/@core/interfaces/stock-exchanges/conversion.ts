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
  