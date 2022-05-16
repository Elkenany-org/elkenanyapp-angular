
  
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
  