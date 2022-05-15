


import { JsonFormData } from "@app/@shared/components/form/cva/cva.component";

export const comparsion_Search_Form_Data: JsonFormData =
{   
  title:"",
  class:"tabs tabs-3",
    controls: [
      {
        name: "اختر الشركات:",
        type: "select",
        role: "companies",
        class: "form-control",
        value: "",
        icon:"",
        option: [],
        validators: {
          required: false,
        }
      },
      {
        name: "الترتيب:",
        type: "checkbox",
        role:"feeds",
        class: "form-control",
        value: "",
        icon:"",
        option: [],
        validators: {
          required: false,
        }
      },
   
      {
        name: "تطبيق:",
        label: "Size",
        class:"stats__btn",
        role:"sort",
        value: "",
        icon:"",
        type: "a",
        validators: {
          required: false,
        }
        
      }

    ]
  }
