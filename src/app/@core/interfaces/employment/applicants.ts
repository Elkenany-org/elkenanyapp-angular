  export interface applicants{
    applicants:Applicant[]
  }
  
  export interface Applicant{
    id: number
    name: string
    email: string
    created_at: string
    cv: string
    image:string
  }

  export interface application{
    id:number
    full_name:string
    phone:string
    education:string
    experience:string
    job_id:string
    expected_salary:string
    cv:File
    notice_period:string
    other_info:string
  }

  export interface applicationRes{
    id:number
    education:string
    experience:string
    expected_salary:string
    cv_link:string
  }

  export interface applicationDetails {
    application: Applicantion
  }
  export interface Applicantion{
    id: number
    name: string
    email: string
    phone: string
    notice_period: string
    education: string
    experience: number
    expected_salary: number
    created_at: string
    cv: string
    image: string
    other_info:string
    qualified:string
  }