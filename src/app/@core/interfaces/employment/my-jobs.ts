export interface MyJobs {
    data: Data[]
    current_page: number
    last_page: number
    first_page_url: string
    next_page_url: any
    last_page_url: string
  }
  
  export interface Data {
    id: number
    title: string
    desc:string
    salary: number
    address: string
    image: string
    status:string
    message:string
    created_at: string
  }
  