export interface JobDetails {
    id: number
    title: string
    salary: number
    phone: string
    email:string
    view_count: number
    address: string
    paid: string
    user: string
    type: string
    desc: string
    created_at: string
    user_created_at:string
    images: {image:string}[]
    experience:number
    category_id:number
    company_id:number
    company_name?:string
    user_type?:string
    work_hours:string
    applicants_count:string
    notqualified_count:string
    qualified_count:string
    skills:string[]
  }
  

  
