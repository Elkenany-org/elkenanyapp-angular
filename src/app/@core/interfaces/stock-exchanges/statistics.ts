
  
  export interface StatisticsSubSec {
    Section: string
    list_subs: ListSub[]
    changes_subs: ChangesSub[]
  }
  
  export interface ListSub {
    id: number
    name: string
  }
  
  export interface ChangesSub {
    id: number
    name: string
    change: string
    counts: number
  }
  



  
//------------------------------- Stock Exchange ---------------------------------------//

export interface StatisticsMember {
  list_members: ListMember[]
  changes_members: ChangesMember[]
}

export interface ListMember {
  id: number
  name: string
}

export interface ChangesMember {
  id: number
  name: string
  change: string
  counts: number
}

//------------------------------- Stock Exchange ---------------------------------------//
export interface StatisticsSubsSections {
  Section: string
  list_subs: ListSub[]
  changes_subs: ChangesSub[]
}

export interface ListSub {
  id: number
  name: string
  image_url: string
}

export interface ChangesSub {
  id: number
  name: string
  change: string
  counts: number
  changes:any
}




export interface FilterListSubItems {
  sections: Section[]
  sub_sections: SubSection[]
  fodder_sub_sections: FodderSubSection[]
}

export interface Section {
  id: number
  name: string
  type: string
  selected: string
}

export interface SubSection {
  id: number
  name: string
  type: string
}

export interface FodderSubSection {
  id: number
  name: string
  type: string
  selected: string
}



//------------------------------ -------------------------------/





export interface StatisicsStocksDetials {
  members: Member[]
}

export interface Member {
  id: number
  name: string
  counts: number
  days: string
  week: string
  oldprice: string
}
