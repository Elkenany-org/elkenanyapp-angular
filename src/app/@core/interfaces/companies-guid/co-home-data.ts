import { Banner, Logo, Sector } from "@app/@core/interfaces/_app/app-response";
import { JsonFormData } from "../_app/horizontal-search";

// ----------------------------------------- < Search & fillter  > -----------------------------------------------//
  
export const co_Search_Form_Data: JsonFormData =
{   
  title: "دليل الشركات",
  class:"tabs tabs-3",
    controls: [
      {
        name: "بحث",
        type: "search",
        role:"search",
        class: "form-control",
        value: "",
        icon:"fas fa-search",
        validators: {
          required: false,
        }
      },
      {
        name: "القسم الرئيسي",
        type: "select",
        role: "sector",
        class: "form-control",
        value: "",
        icon:"fas fa-list",
        option: [],
        validators: {
          required: false,
        }
      },
      {
        name: "الترتيب",
        type: "select",
        role:"sort",
        class: "form-control",
        value: "",
        icon:"fas fa-sort-amount-down",
        option: [],
        validators: {
          required: false,
        }
      }
    ]
  }


// ----------------------------------------- < Companies Home > -----------------------------------------------//

  
export interface CompaniesHome {
  sectors: Sector[]
  banners: Banner[]
  logos: Logo[]
  // sector_name: string,
  // count: string,
  sub_sections: SubSection[]
}



export interface SubSection {
  id: number
  name: string
  image: string
  companies_count: number
  type:string
  logo_in: LogoIn[]
}

export interface LogoIn {
  id: number
  link: string
  image: string
}
