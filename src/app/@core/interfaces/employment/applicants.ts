  export interface applicants{
    data:Applicant[]
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
    education:string
    experience:string
    job_id:string
    expected_salary:string
    cv:File
    other_info:string
  }

  export interface applicationRes{
    id:number
    education:string
    experience:string
    expected_salary:string
    cv_link:string
  }
