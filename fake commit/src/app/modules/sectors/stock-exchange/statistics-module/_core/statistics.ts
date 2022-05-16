
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

  // export interface StockExchange {
  //   sectors: Sector[]
  //   banners: Banner[]
  //   logos: Logo[]
  //   sub_sections: SubSection[]
  //   fod_sections?: FodSection[]
  // }
  
  // export interface Sector {
  //   id: number
  //   name: string
  //   type: string
  //   selected: number
  // }
  
  // export interface Banner {
  //   id: number
  //   link: string
  //   image: string
  // }
  
  // export interface Logo {
  //   id: number
  //   link: string
  //   image: string
  // }
  
  // export interface SubSection {
  //   id: number
  //   name: string
  //   image: string
  //   members: number
  //   type: string
  //   logo_in: LogoIn[]
  // }
  
  // export interface LogoIn {
  //   id: number
  //   link: string
  //   image: string
  // }
  
  // export interface FodSection {
  //   id: number
  //   name: string
  //   image: string
  //   members: number
  //   type: string
  //   logo_in: any[]
  // }

//------------------------------- filter_list---------------------------------------//
  
  // export interface FilterList {
  //   sectors: Sector[]
  //   sort: Sort[]
  // }
  
  // export interface Sector {
  //   id: number
  //   name: string
  //   type: string
  //   selected: number
  // }
  
  // export interface Sort {
  //   id: number
  //   name: string
  //   value?: number
  // }
  

//------------------------------- Stock Fodder Sub ---------------------------------------//

  
//   export interface StockFodderSub {
//     columns: Column[]
//     feeds: Feed[]
//     companies: Company[]
//     banners: Banner[]
//     logos: any[]
//     section_type: string
//     members: Member[]
//   }
  
//   export interface Column {
//     title: string
//   }
  
//   export interface Feed {
//     name: string
//     id: number
//   }
  
//   export interface Company {
//     name: string
//     id: number
//   }
  
//   export interface Banner {
//     id: number
//     link: string
//     image: string
//   }
  
//   export interface Member {
//     name: string
//     mem_id: number
//     feed: string
//     price: number
//     change: string
//     change_date: string
//     statistics: string
//     type: number
//   }
  
  
// //----------------------------- Comprision Fodder -----------------------------//
//   export interface ComprisionFodder {
//     companies: Company[]
//     feeds: Feed[]
//   }
  
//   export interface Company {
//     id: number
//     name: string
//   }
  
//   export interface Feed {
//     id: number
//     name: string
//   }
  
// //----------------------------- Comprison Fodder Get Data -----------------------------//

//   export interface ComprisonFodderGetData {
//     companies: Company[]
//   }
  
//   export interface Company {
//     id: number
//     name: string
//     image: string
//   }
  
// //----------------------------- Statisics Members -----------------------------//

//   export interface StatisicsMembers {
//     list_members: ListMember[]
//     changes_members: ChangesMember[]
//   }
  
//   export interface ListMember {
//     id: number
//     name: string
//   }
  
//   export interface ChangesMember {
//     id: number
//     name: string
//     change: string
//     counts: number
//   }

//   //----------------------------- Statisics Members -----------------------------//

//   export interface StatisicsMembersDetials {
//     id: number
//     name: string
//     counts: number
//     days: string
//     week: string
//     oldprice: string
//   }
  
//   //----------------------------- Statisics Sub Sections -----------------------------//

//   export interface StatisicsSubSections {
//     sectors: Sector[]
//     banners: Banner[]
//     logos: Logo[]
//     sub_sections: SubSection[]
//     fod_sections: FodSection[]
//   }
  
//   export interface Sector {
//     id: number
//     name: string
//     type: string
//     selected: number
//   }
  
//   export interface Banner {
//     id: number
//     link: string
//     image: string
//   }
  
//   export interface Logo {
//     id: number
//     link: string
//     image: string
//   }
  
//   export interface SubSection {
//     id: number
//     name: string
//     image: string
//     members: number
//     type: string
//     logo_in: LogoIn[]
//   }
  
//   export interface LogoIn {
//     id: number
//     link: string
//     image: string
//   }
  
//   export interface FodSection {
//     id: number
//     name: string
//     image: string
//     members: number
//     type: string
//     logo_in: any[]
//   }
  
//   //----------------------------- Statisics tocks Detials -----------------------------//

//   export interface StatisicsStocksDetials {
//     members: Member[]
//   }
  
//   export interface Member {
//     id: number
//     name: string
//     counts: number
//     days: string
//     week: string
//     oldprice: string
//   }
  