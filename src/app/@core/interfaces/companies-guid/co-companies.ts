import { City, Country, Logo, Sector, Sort } from "@app/@core/interfaces/_app/app-response";
import { JsonFormData } from "../_app/horizontal-search";

  // ----------------------------------------- < Companies search data > -----------------------------------------------//
export const co_Search_Form_Data: JsonFormData =
{   
  title: "دليل الشركات",
  class:"tabs tabs-5",
    controls: [
      {
        name: "بحث",
        type: "text",
        role:"search",
        class: "form-control",
        value: "",
        icon:"fas fa-search",
        validators: {
          required: false,
        }
      },
      {
        name: "القطاع",
        type: "select",
        role: "sector",
        class: "form-control",
        value: "",
        icon:"fas fa-puzzle-piece",
        option: [],
        validators: {
          required: false,
        }
      },
      {
        name: "الدول",
        type: "select",
        role:"countries",
        class: "form-control",
        value: "",
        icon:"fas fa-map-marker-alt",
        option: [],
        validators: {
          required: false,
        }
      },
      {
        name: "المدينة",
        type: "select",
        role:"cities",
        class: "form-control",
        value: "",
        icon:"fas fa-map-marker-alt",
        option: [],
        validators: {
          required: false,
        }
      },{
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
      },
      // {
      //   name: "القسم",
      //   type: "select",
      //   role:"section",
      //   class: "form-control",
      //   value: "",
      //   icon:"fas fa-list-ul",
      //   option: [],
      //   validators: {
      //     required: false,
      //   }
      // }
    ]
  }

  // ----------------------------------------- < Companies > -----------------------------------------------//

  export interface Companies {
      sectors: Sector[]
      banners: any[]
      logos: Logo[]
      compsort: any[]
      data: SubSection[]
      current_page: number
      last_page: number
      first_page_url: string
      next_page_url: any
      last_page_url: string
    }
    

    export interface SubSection {
      id: number
      name: string
      rate: number
      image: string
      desc: string
      address: string
    }
    



// ----------------------------------------- < Filter List Companies > -----------------------------------------------//

    export interface FilterListCompanies {
      sectors: Sector[]
      sub_sections: SubSection[]
      countries: Country[]
      cities: City[]
      sort: Sort[]
    }
    

    
    export interface SubSection {
      id: number
      name: string
    }
    

    
  
    

    