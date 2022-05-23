import { JsonFormData } from "@app/@shared/components/form/cva/cva.component";

  
export let Stock_Search_Form_Data: JsonFormData =
{   
  title: "البورصة اليومية",
  class:"tabs tabs-4",
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
        name: "البورصة",
        type: "select",
        role: "stock",
        class: "form-control",
        value: "",
        icon:"fas fa-puzzle-piece",
        option: [],
        validators: {
          required: false,
        }
      },
      {
        name: "التاريخ",
        type: "date",
        role: "date",
        class: "form-control",
        value: "",
        icon:"fas fa-puzzle-piece",
        option: [],
        validators: {
          required: false,
        }
      },
      {
        name: "مقارنة",
        label: "Size",
        class:"stats__btn",
        role:"sort",
        value: "",
        icon:"fas fa-poll",
        type: "a",
        routerLink: "/stock-exchange/poultry/comarsion",
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



  
export let Home_Stock_Search_Form_Data: JsonFormData =
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
        routerLink: "",
        validators: {
          required: false,
        }
    },

    ]
  }
