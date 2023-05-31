import { JsonFormData } from "@app/@core/interfaces/_app/horizontal-search"

  
export let Stock_Search_Form_Data: JsonFormData =
{   
  title: "البورصة اليومية",
  class:"tabs tabs-4 px-2",
    controls: [
      {
        name: "القسم",
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
        name: "البورصة اليومية",
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
        name: "قارن الان",
        label: "Size",
        class:"stats__btn",
        role:"comparison",
        value: "",
        icon:"fas fa-poll",
        type: "a",
        routerLink: "/البورصة/1/comarsion",
        validators: {
          required: false,
        }
      },
      {
        name: "إحصائيات",
        label: "Size",
        class:"stats__btn",
        role:"statistics",
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
  export let Stock_Search_Form_Data_Local: JsonFormData =
  {   
    title: "البورصة اليومية",
    class:"tabs tabs-4",
      controls: [
        {
          name: "القسم",
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
          name: "البورصة اليومية",
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
          name: "إحصائيات",
          label: "Size",
          class:"stats__btn",
          role:"statistics",
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


  
export let Home_Stock_Search_Form_Data: JsonFormData =
{   
  title: "البورصة اليومية",
  class:"tabs tabs-4",
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
        name: "إحصائيات",
        label: "Size",
        class:"stats__btn",
        role:"statistics",
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
