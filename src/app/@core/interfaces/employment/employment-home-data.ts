
// ----------------------------------------- < Search & fillter  > -----------------------------------------------//

import { JsonFormData } from "../_app/horizontal-search"

  
export const employment_Search_Form_Data: JsonFormData =
{   
  title: "الوظائف",
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
        name: "القسم",
        type: "select",
        role: "category",
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
      // {
      //   name: "التاريخ",
      //   type: "date",
      //   role:"date",
      //   class: "form-control",
      //   value: "",
      //   icon:"",
      //   validators: {
      //     required: false,
      //   }
      // },
    ]
  }

  export const applicants_Search_Form_Data: JsonFormData =
  {   
    title: "المتقدمين للوظائف",
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
          name: "التحديد",
          type: "select",
          role:"qualified",
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
  