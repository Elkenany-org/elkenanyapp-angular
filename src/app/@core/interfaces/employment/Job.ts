export interface Job {
    job_detials: JobDetials
  }
  

  
  export interface JobDetials {
    id: number
    title: string
    salary: number
    phone: string
    view_count: number
    address: string
    paid: string
    user: string
    type: string
    desc: string
    created_at: string
    user_created_at:string
    images: {image:string}[]
    email:string
    experience:number
    category_id:number
    company_id:number
    work_hours:string
  }
  
  export interface Image {
    id: number
    image: string
  }
  

