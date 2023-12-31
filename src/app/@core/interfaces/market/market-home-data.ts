
// ----------------------------------------- < Search & fillter  > -----------------------------------------------//

import { JsonFormData } from "../_app/horizontal-search"

  
export const market_Search_Form_Data: JsonFormData =
{   
  title: "السوق",
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
        name: "القسم ",
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
      },
      {
        name: "التاريخ",
        type: "date",
        role:"date",
        class: "form-control",
        value: "",
        icon:"",
        validators: {
          required: false,
        }
      },
    ]
  }


// ----------------------------------------- < Companies Home > -----------------------------------------------//

  


export interface SubSection {
  id: number
  name: string
  image: string
  companies_count: number
  logo_in: LogoIn[]
}

export interface LogoIn {
  id: number
  link: string
  image: string
}
