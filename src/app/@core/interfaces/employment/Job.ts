export interface Job {
    job_detials: JobDetials
  }
  

  
  export interface JobDetials {
    id: number
    title: string
    desc: string
    phone: string
    address: string
    con_type: string
    salary: number
    images: Image[]
  }
  
  export interface Image {
    id: number
    image: string
  }
  

