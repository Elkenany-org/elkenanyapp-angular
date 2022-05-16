import { Banner, Category, Column, Company, FodderSubSection, FodSection, Logo, Member, Section, Sector, SubSection } from "../_app/app-response"



//------------------------------- Stock Exchange ---------------------------------------//

export interface StockExchange {
  sectors: Sector[]
  banners: Banner[]
  logos: Logo[]
  sub_sections: SubSection[]
  fod_sections?: FodSection[]
}

  //----------------------------- Fodder local  -----------------------------//

  export interface Local {
    message: string
    status: string
    columns: string[]
    banners: any[]
    logos: Logo[]
    members: Member[]
  }
  

  export interface Fodder extends Local {
    company_name: string
    feed_name: string
  }

// ----------------------------------------- < LocalStockFodder > -----------------------------------------------//

  export interface  LocalStockFodder {
    message: string
    status: string
    columns:string[]
    feed_name: string
    company_name: string
    banners: Banner[]
    logos: any[]
    section_type: string
    members: Member[]
 }
      
// ----------------------------------------- < FeedsItem > -----------------------------------------------//
    
export interface FeedsItems {
    fodder_categories: Category[]
    fodder_list: Category[]
  }


  
//------------------------------- ComprisonFodderGetData ---------------------------------------//
  
  export interface ComprisonFodderGetData {
    companies: Company[]
  }
//------------------------------- ComprisonFodderGetData ---------------------------------------//
 



export interface FilterListSub {
  sections: Section[]
  sub_sections: SubSection[]
  fodder_sub_sections: FodderSubSection[]
}





  export interface CompaniesItems extends Category {}
  export interface FodderList extends Category{}
  export interface FodderCategory extends Category{}





  








  



