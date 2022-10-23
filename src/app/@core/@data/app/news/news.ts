import { Banner, Logo, Section } from "@app/@core/interfaces/_app/app-response"
import { JsonFormData } from "@app/@core/interfaces/_app/horizontal-search"


 
export const News_Search_Form_Data: JsonFormData  =
{   
  title:"الأخبار",
  class:"tabs tabs-2",
    controls: [
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
        name: "الترتيب",
        type: "select",
        role: "sort",
        class: "form-control",
        value: "",
        icon:"fas fa-sort-amount-down",
        option: [],
        validators: {
          required: false,
        }
      },
    ]
  }

  export const Tenders_Search_Form_Data: JsonFormData  =
{   
  title:"المناقصات",
  class:"tabs tabs-2",
    controls: [
      {
        name: "الاقسام",
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
        name: "الترتيب",
        type: "select",
        role: "sort",
        class: "form-control",
        value: "",
        icon:"fas fa-sort-amount-down",
        option: [],
        validators: {
          required: false,
        }
      },
    ]
  }

  export const Tenders_Home_Search_Form_Data: JsonFormData  =
  {   
    title:"المناقصات",
    class:"tabs tabs-2",
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
          name: "الترتيب",
          type: "select",
          role: "sort",
          class: "form-control",
          value: "",
          icon:"fas fa-sort-amount-down",
          option: [],
          validators: {
            required: false,
          }
        },
      ]
    }
  