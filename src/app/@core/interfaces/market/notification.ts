  
  /////////////////////notifications
  export interface notifications_market {
    data: noty[]
  }
  
  export interface noty {
    id: number
    noty: string
    ads: string
    created_at: string
  }



export interface notifications {
  nots: Not[]
}

export interface Not {
  id: number
  title: string
  desc: string
  image: string
  product_id: any
  product_name: any
  product_image: any
  created_at:string
}
