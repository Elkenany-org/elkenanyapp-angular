
  export interface Jobs {
    categories: category[]
    jobs: JobsData[]
    current_page: number
    last_page: number
    first_page_url: string
    next_page_url: any
    last_page_url: string
  }
  
  
  export interface JobsData {
    id: number
    title: string
    salary: number
    address: string
    image: string
    created_at: string
  }
  
  export interface category{
    id: number
    name: string
  }
  