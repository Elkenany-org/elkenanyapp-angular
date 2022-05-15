import { Banner, Logo, Section } from "@app/@core/interfaces/_app/app-response"
import { JsonFormData } from "@app/@shared/components/form/cva/cva.component"


 
export const News_Search_Form_Data: JsonFormData  =
{   
  title:"لأخبار",
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
