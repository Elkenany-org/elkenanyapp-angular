import { JsonFormData } from "@app/@shared/components/form/cva/cva.component";

  
export const Stock_Search_Form_Data: JsonFormData =
{   
  title: "البورصة اليومية",
  class:"tabs tabs-4",
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
        name: "احصائيات",
        label: "Size",
        class:"stats__btn",
        role:"sort",
        value: "",
        icon:"fas fa-poll",
        type: "a",
        routerLink: "/stock-exchange/poultry/statistics",
        validators: {
          required: false,
        }
    },

    ]
  }



  
export const Home_Stock_Search_Form_Data: JsonFormData =
{   
  title: "البورصة اليومية",
  class:"tabs tabs-4",
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
        name: "احصائيات",
        label: "Size",
        class:"stats__btn",
        role:"sort",
        value: "",
        icon:"fas fa-poll",
        type: "a",
        routerLink: "/stock-exchange/poultry/statistics",
        validators: {
          required: false,
        }
    },

    ]
  }
