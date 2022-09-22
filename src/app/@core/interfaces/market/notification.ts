  
  /////////////////////notifications
  export interface notifications_market {
    data: noty[]
  }
  
  export interface noty {
    id: number
    noty: string
    ads: string
    created_at: string
    time:string
  }



export interface notifications {
  result: Not[]
}

export interface Not {
  id: number
  title: string
  desc: string
  image: string
  created_at: string
  time: string
  created_at1: string
  key_name: string
  key_id: number
}
