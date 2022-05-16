import { Banner, Logo } from "../_app/app-response";
import { JsonFormData } from "../_app/filter-list";

export const ship_traffic_Search_Form: JsonFormData  =
{   
  title: "حركة السفن",
  class:"tabs tabs-2",
    controls: [
      {
        name: "تاريخ الوصول",
        type: "date",
        role: "dataOfArrival",
        class: "form-control",
        value: "",
        icon:"fas fa-calendar",
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
        routerLink: "/ships-traffic/statistics",
        validators: {
          required: false,
        }
    },
    ]
  }

  //------------------------------------ Ships -----------------------------------//

  export interface Ships {
    banners: Banner[]
    logos: Logo[]
    ships: Ship[]
  }
  
  export interface Ship {
    id: number
    name: string
    load: number
    product: string
    country: string
    date: string
    company?: string
    Port: string
    agent: string
    dir_date: string
  }
  
  //-------------------------------statistics ----------------------------//

  export interface StatisticsShips {
    products: Product[]
    countries: Country[]
    ships: Ship[]
  }
  
  export interface Product {
    id: number
    name: string
    load: number
  }
  
  export interface Country {
    country: string
  }
  
  export interface Ship {
    id: number
    product: string
    country: string
    load: number
  }
  
  export const ship_traffic_Statistics_Search_Form: JsonFormData  =
{   
  title: "إحصائيات حركة السفن",
  class:"tabs tabs-2",
    controls: [
      {
        name: "من",
        type: "date",
        role: "date-from",
        class: "form-control",
        value: "",
        icon:"fas fa-calendar",
        option: [],
        validators: {
          required: false,
        }
      },
      {
        name: "إلى",
        type: "date",
        role: "date-to",
        class: "form-control",
        value: "",
        icon:"fas fa-calendar",
        option: [],
        validators: {
          required: false,
        }
      },
    ]
  }

  //--------------------------------------Statistic detials -------------------------------//


  
  export interface StatisticsDetials {
    countries: Country[]
    companies: Company[]
    ships_charts: ShipsChart[]
  }
  
  export interface Country {
    country: string
  }
  
  export interface Company {
    id: number
    name: string
    data: Daum[]
  }
  
  export interface Daum {
    product: string
    country: string
    load: number
    nums: string
  }
  
  export interface ShipsChart {
    product: string
    load: number
  }
  

  //////////

export let data:any = {
    "message": null,
    "error": null,
    "data": {
        "countries": [
            {
                "country": "ألمانيا"
            },
            {
                "country": "بلغاريا"
            },
            {
                "country": "روسيا"
            },
            {
                "country": "فرنسا"
            },
            {
                "country": "رومانيا"
            },
            {
                "country": "جمهورية ليتوانيا"
            },
            {
                "country": "الأرجنتين"
            },
            {
                "country": "جمهورية مولدوفا"
            },
            {
                "country": "البرازيل"
            },
            {
                "country": "أوكرانيا"
            },
            {
                "country": "اوكرانيا"
            },
            {
                "country": "بولندا"
            }
        ],
        "companies": [
            {
                "id": 391,
                "name": "شركة البستان للمطاحن وإستيراد القمح",
                "data": [
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 20000,
                        "nums": "-42.61"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 34852,
                        "nums": "120.58"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 15800,
                        "nums": "21.54"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13000,
                        "nums": "30.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-45.34"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 18295,
                        "nums": "61.59"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 11322,
                        "nums": "36.79"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 8277,
                        "nums": "-17.23"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-43.82"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 17800,
                        "nums": "109.41"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 8500,
                        "nums": "54.55"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 5500,
                        "nums": "-43.13"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 9672,
                        "nums": "-19.40"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 12000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 12000,
                        "nums": "-29.41"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 17000,
                        "nums": "70.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-50.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 20000,
                        "nums": "0"
                    }
                ]
            },
            {
                "id": 390,
                "name": "شركة مطاحن المناهيرى للحبوب ومنتجاتها",
                "data": [
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 20000,
                        "nums": "-42.61"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 34852,
                        "nums": "120.58"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 15800,
                        "nums": "21.54"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13000,
                        "nums": "30.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-45.34"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 18295,
                        "nums": "61.59"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 11322,
                        "nums": "36.79"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 8277,
                        "nums": "-17.23"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-43.82"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 17800,
                        "nums": "109.41"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 8500,
                        "nums": "54.55"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 5500,
                        "nums": "-43.13"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 9672,
                        "nums": "-19.40"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 12000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 12000,
                        "nums": "-29.41"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 17000,
                        "nums": "70.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-50.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 20000,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10942,
                        "nums": "65.79"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 6600,
                        "nums": "0"
                    }
                ]
            },
            {
                "id": 2201,
                "name": "روتس كوموديتيز",
                "data": [
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 20000,
                        "nums": "-42.61"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 34852,
                        "nums": "120.58"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 15800,
                        "nums": "21.54"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13000,
                        "nums": "30.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-45.34"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 18295,
                        "nums": "61.59"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 11322,
                        "nums": "36.79"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 8277,
                        "nums": "-17.23"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-43.82"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 17800,
                        "nums": "109.41"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 8500,
                        "nums": "54.55"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 5500,
                        "nums": "-43.13"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 9672,
                        "nums": "-19.40"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 12000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 12000,
                        "nums": "-29.41"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 17000,
                        "nums": "70.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-50.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 20000,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10942,
                        "nums": "65.79"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 6600,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13426,
                        "nums": "3.28"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13000,
                        "nums": "128.19"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 5697,
                        "nums": "42.43"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 4000,
                        "nums": "8.31"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 3693,
                        "nums": "0"
                    }
                ]
            },
            {
                "id": 2203,
                "name": "نيو جرين للتجارة والتوريدات",
                "data": [
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 20000,
                        "nums": "-42.61"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 34852,
                        "nums": "120.58"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 15800,
                        "nums": "21.54"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13000,
                        "nums": "30.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-45.34"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 18295,
                        "nums": "61.59"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 11322,
                        "nums": "36.79"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 8277,
                        "nums": "-17.23"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-43.82"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 17800,
                        "nums": "109.41"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 8500,
                        "nums": "54.55"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 5500,
                        "nums": "-43.13"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 9672,
                        "nums": "-19.40"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 12000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 12000,
                        "nums": "-29.41"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 17000,
                        "nums": "70.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-50.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 20000,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10942,
                        "nums": "65.79"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 6600,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13426,
                        "nums": "3.28"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13000,
                        "nums": "128.19"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 5697,
                        "nums": "42.43"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 4000,
                        "nums": "8.31"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 3693,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 2700,
                        "nums": "0"
                    }
                ]
            },
            {
                "id": 2202,
                "name": "برايم جراينيز",
                "data": [
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 20000,
                        "nums": "-42.61"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 34852,
                        "nums": "120.58"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 15800,
                        "nums": "21.54"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13000,
                        "nums": "30.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-45.34"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 18295,
                        "nums": "61.59"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 11322,
                        "nums": "36.79"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 8277,
                        "nums": "-17.23"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-43.82"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 17800,
                        "nums": "109.41"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 8500,
                        "nums": "54.55"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 5500,
                        "nums": "-43.13"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 9672,
                        "nums": "-19.40"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 12000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 12000,
                        "nums": "-29.41"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 17000,
                        "nums": "70.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-50.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 20000,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10942,
                        "nums": "65.79"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 6600,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13426,
                        "nums": "3.28"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13000,
                        "nums": "128.19"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 5697,
                        "nums": "42.43"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 4000,
                        "nums": "8.31"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 3693,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 2700,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 6000,
                        "nums": "0"
                    }
                ]
            },
            {
                "id": 2141,
                "name": "الهيئة العامة للسلع التموينية",
                "data": [
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 20000,
                        "nums": "-42.61"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 34852,
                        "nums": "120.58"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 15800,
                        "nums": "21.54"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13000,
                        "nums": "30.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-45.34"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 18295,
                        "nums": "61.59"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 11322,
                        "nums": "36.79"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 8277,
                        "nums": "-17.23"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-43.82"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 17800,
                        "nums": "109.41"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 8500,
                        "nums": "54.55"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 5500,
                        "nums": "-43.13"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 9672,
                        "nums": "-19.40"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 12000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 12000,
                        "nums": "-29.41"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 17000,
                        "nums": "70.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-50.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 20000,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10942,
                        "nums": "65.79"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 6600,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13426,
                        "nums": "3.28"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13000,
                        "nums": "128.19"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 5697,
                        "nums": "42.43"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 4000,
                        "nums": "8.31"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 3693,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 2700,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 6000,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 42700,
                        "nums": "-32.22"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 62998,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "9.09"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 57750,
                        "nums": "0"
                    }
                ]
            },
            {
                "id": 2138,
                "name": "كايرو ثري إيه",
                "data": [
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 20000,
                        "nums": "-42.61"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 34852,
                        "nums": "120.58"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 15800,
                        "nums": "21.54"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13000,
                        "nums": "30.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-45.34"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 18295,
                        "nums": "61.59"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 11322,
                        "nums": "36.79"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 8277,
                        "nums": "-17.23"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-43.82"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 17800,
                        "nums": "109.41"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 8500,
                        "nums": "54.55"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 5500,
                        "nums": "-43.13"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 9672,
                        "nums": "-19.40"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 12000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 12000,
                        "nums": "-29.41"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 17000,
                        "nums": "70.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-50.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 20000,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10942,
                        "nums": "65.79"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 6600,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13426,
                        "nums": "3.28"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13000,
                        "nums": "128.19"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 5697,
                        "nums": "42.43"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 4000,
                        "nums": "8.31"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 3693,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 2700,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 6000,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 42700,
                        "nums": "-32.22"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 62998,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "9.09"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 57750,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 50580,
                        "nums": "-8.04"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 55000,
                        "nums": "-15.38"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 65000,
                        "nums": "136.36"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 27500,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 27500,
                        "nums": "0"
                    }
                ]
            },
            {
                "id": 2091,
                "name": "المصرية السويسرية للطحن",
                "data": [
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 20000,
                        "nums": "-42.61"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 34852,
                        "nums": "120.58"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 15800,
                        "nums": "21.54"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13000,
                        "nums": "30.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-45.34"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 18295,
                        "nums": "61.59"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 11322,
                        "nums": "36.79"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 8277,
                        "nums": "-17.23"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-43.82"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 17800,
                        "nums": "109.41"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 8500,
                        "nums": "54.55"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 5500,
                        "nums": "-43.13"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 9672,
                        "nums": "-19.40"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 12000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 12000,
                        "nums": "-29.41"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 17000,
                        "nums": "70.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-50.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 20000,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10942,
                        "nums": "65.79"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 6600,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13426,
                        "nums": "3.28"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13000,
                        "nums": "128.19"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 5697,
                        "nums": "42.43"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 4000,
                        "nums": "8.31"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 3693,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 2700,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 6000,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 42700,
                        "nums": "-32.22"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 62998,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "9.09"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 57750,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 50580,
                        "nums": "-8.04"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 55000,
                        "nums": "-15.38"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 65000,
                        "nums": "136.36"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 27500,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 27500,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 21500,
                        "nums": "0"
                    }
                ]
            },
            {
                "id": 193,
                "name": "حورس للتجارة",
                "data": [
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 20000,
                        "nums": "-42.61"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 34852,
                        "nums": "120.58"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 15800,
                        "nums": "21.54"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13000,
                        "nums": "30.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-45.34"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 18295,
                        "nums": "61.59"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 11322,
                        "nums": "36.79"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 8277,
                        "nums": "-17.23"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-43.82"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 17800,
                        "nums": "109.41"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 8500,
                        "nums": "54.55"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 5500,
                        "nums": "-43.13"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 9672,
                        "nums": "-19.40"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 12000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 12000,
                        "nums": "-29.41"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 17000,
                        "nums": "70.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-50.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 20000,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10942,
                        "nums": "65.79"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 6600,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13426,
                        "nums": "3.28"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13000,
                        "nums": "128.19"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 5697,
                        "nums": "42.43"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 4000,
                        "nums": "8.31"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 3693,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 2700,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 6000,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 42700,
                        "nums": "-32.22"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 62998,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "9.09"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 57750,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 50580,
                        "nums": "-8.04"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 55000,
                        "nums": "-15.38"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 65000,
                        "nums": "136.36"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 27500,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 27500,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 21500,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 66000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 66000,
                        "nums": "3.04"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 64051,
                        "nums": "-1.16"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 64800,
                        "nums": "0"
                    }
                ]
            },
            {
                "id": 2089,
                "name": "كارجيل تريدنج إيجيبت",
                "data": [
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 20000,
                        "nums": "-42.61"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 34852,
                        "nums": "120.58"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 15800,
                        "nums": "21.54"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13000,
                        "nums": "30.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-45.34"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 18295,
                        "nums": "61.59"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 11322,
                        "nums": "36.79"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 8277,
                        "nums": "-17.23"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-43.82"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 17800,
                        "nums": "109.41"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 8500,
                        "nums": "54.55"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 5500,
                        "nums": "-43.13"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 9672,
                        "nums": "-19.40"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 12000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 12000,
                        "nums": "-29.41"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 17000,
                        "nums": "70.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-50.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 20000,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10942,
                        "nums": "65.79"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 6600,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13426,
                        "nums": "3.28"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13000,
                        "nums": "128.19"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 5697,
                        "nums": "42.43"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 4000,
                        "nums": "8.31"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 3693,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 2700,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 6000,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 42700,
                        "nums": "-32.22"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 62998,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "9.09"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 57750,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 50580,
                        "nums": "-8.04"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 55000,
                        "nums": "-15.38"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 65000,
                        "nums": "136.36"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 27500,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 27500,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 21500,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 66000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 66000,
                        "nums": "3.04"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 64051,
                        "nums": "-1.16"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 64800,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 66000,
                        "nums": "0"
                    }
                ]
            },
            {
                "id": 2209,
                "name": "مربط الصالح",
                "data": [
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 20000,
                        "nums": "-42.61"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 34852,
                        "nums": "120.58"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 15800,
                        "nums": "21.54"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13000,
                        "nums": "30.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-45.34"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 18295,
                        "nums": "61.59"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 11322,
                        "nums": "36.79"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 8277,
                        "nums": "-17.23"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-43.82"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 17800,
                        "nums": "109.41"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 8500,
                        "nums": "54.55"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 5500,
                        "nums": "-43.13"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 9672,
                        "nums": "-19.40"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 12000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 12000,
                        "nums": "-29.41"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 17000,
                        "nums": "70.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-50.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 20000,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10942,
                        "nums": "65.79"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 6600,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13426,
                        "nums": "3.28"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13000,
                        "nums": "128.19"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 5697,
                        "nums": "42.43"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 4000,
                        "nums": "8.31"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 3693,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 2700,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 6000,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 42700,
                        "nums": "-32.22"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 62998,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "9.09"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 57750,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 50580,
                        "nums": "-8.04"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 55000,
                        "nums": "-15.38"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 65000,
                        "nums": "136.36"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 27500,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 27500,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 21500,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 66000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 66000,
                        "nums": "3.04"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 64051,
                        "nums": "-1.16"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 64800,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 66000,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0"
                    }
                ]
            },
            {
                "id": 2251,
                "name": "جرين وايت للاستيراد والتصدير",
                "data": [
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 20000,
                        "nums": "-42.61"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 34852,
                        "nums": "120.58"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 15800,
                        "nums": "21.54"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13000,
                        "nums": "30.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-45.34"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 18295,
                        "nums": "61.59"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 11322,
                        "nums": "36.79"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 8277,
                        "nums": "-17.23"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-43.82"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 17800,
                        "nums": "109.41"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 8500,
                        "nums": "54.55"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 5500,
                        "nums": "-43.13"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 9672,
                        "nums": "-19.40"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 12000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 12000,
                        "nums": "-29.41"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 17000,
                        "nums": "70.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10000,
                        "nums": "-50.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 20000,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 10942,
                        "nums": "65.79"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 6600,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13426,
                        "nums": "3.28"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 13000,
                        "nums": "128.19"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 5697,
                        "nums": "42.43"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 4000,
                        "nums": "8.31"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 3693,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 2700,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 6000,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 42700,
                        "nums": "-32.22"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 62998,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "9.09"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 57750,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 50580,
                        "nums": "-8.04"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 55000,
                        "nums": "-15.38"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 65000,
                        "nums": "136.36"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 27500,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 27500,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 21500,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 66000,
                        "nums": "0.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 66000,
                        "nums": "3.04"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 64051,
                        "nums": "-1.16"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 64800,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 66000,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 63000,
                        "nums": "0"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 24729,
                        "nums": "253.27"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 7000,
                        "nums": "12.00"
                    },
                    {
                        "product": "قمح",
                        "country": "أوكرانيا",
                        "load": 6250,
                        "nums": "0"
                    }
                ]
            }
        ],
        "ships_charts": [
            {
                "product": "الهيئة العامة للسلع التموينية",
                "load": 42700
            },
            {
                "product": "جرين وايت للاستيراد والتصدير",
                "load": 24729
            },
            {
                "product": "جرين وايت للاستيراد والتصدير",
                "load": 7000
            },
            {
                "product": "جرين وايت للاستيراد والتصدير",
                "load": 6250
            },
            {
                "product": "شركة البستان للمطاحن وإستيراد القمح",
                "load": 20000
            },
            {
                "product": "شركة البستان للمطاحن وإستيراد القمح",
                "load": 34852
            },
            {
                "product": "الهيئة العامة للسلع التموينية",
                "load": 63000
            },
            {
                "product": "الهيئة العامة للسلع التموينية",
                "load": 63000
            },
            {
                "product": "شركة البستان للمطاحن وإستيراد القمح",
                "load": 15800
            },
            {
                "product": "شركة البستان للمطاحن وإستيراد القمح",
                "load": 13000
            },
            {
                "product": "كايرو ثري إيه",
                "load": 50580
            },
            {
                "product": "الهيئة العامة للسلع التموينية",
                "load": 63000
            },
            {
                "product": "حورس للتجارة",
                "load": 66000
            },
            {
                "product": "الهيئة العامة للسلع التموينية",
                "load": 63000
            },
            {
                "product": "حورس للتجارة",
                "load": 66000
            },
            {
                "product": "الهيئة العامة للسلع التموينية",
                "load": 62998
            },
            {
                "product": "مربط الصالح",
                "load": 63000
            },
            {
                "product": "كايرو ثري إيه",
                "load": 55000
            },
            {
                "product": "الهيئة العامة للسلع التموينية",
                "load": 63000
            },
            {
                "product": "الهيئة العامة للسلع التموينية",
                "load": 63000
            },
            {
                "product": "حورس للتجارة",
                "load": 64051
            },
            {
                "product": "شركة مطاحن المناهيرى للحبوب ومنتجاتها",
                "load": 10942
            },
            {
                "product": "كارجيل تريدنج إيجيبت",
                "load": 66000
            },
            {
                "product": "الهيئة العامة للسلع التموينية",
                "load": 63000
            },
            {
                "product": "شركة البستان للمطاحن وإستيراد القمح",
                "load": 10000
            },
            {
                "product": "شركة البستان للمطاحن وإستيراد القمح",
                "load": 18295
            },
            {
                "product": "شركة البستان للمطاحن وإستيراد القمح",
                "load": 11322
            },
            {
                "product": "حورس للتجارة",
                "load": 64800
            },
            {
                "product": "المصرية السويسرية للطحن",
                "load": 21500
            },
            {
                "product": "الهيئة العامة للسلع التموينية",
                "load": 63000
            },
            {
                "product": "شركة البستان للمطاحن وإستيراد القمح",
                "load": 8277
            },
            {
                "product": "روتس كوموديتيز",
                "load": 13426
            },
            {
                "product": "روتس كوموديتيز",
                "load": 13000
            },
            {
                "product": "الهيئة العامة للسلع التموينية",
                "load": 63000
            },
            {
                "product": "كايرو ثري إيه",
                "load": 65000
            },
            {
                "product": "شركة البستان للمطاحن وإستيراد القمح",
                "load": 10000
            },
            {
                "product": "شركة البستان للمطاحن وإستيراد القمح",
                "load": 17800
            },
            {
                "product": "شركة البستان للمطاحن وإستيراد القمح",
                "load": 8500
            },
            {
                "product": "شركة البستان للمطاحن وإستيراد القمح",
                "load": 5500
            },
            {
                "product": "روتس كوموديتيز",
                "load": 5697
            },
            {
                "product": "كايرو ثري إيه",
                "load": 27500
            },
            {
                "product": "شركة البستان للمطاحن وإستيراد القمح",
                "load": 9672
            },
            {
                "product": "كايرو ثري إيه",
                "load": 27500
            },
            {
                "product": "شركة البستان للمطاحن وإستيراد القمح",
                "load": 12000
            },
            {
                "product": "الهيئة العامة للسلع التموينية",
                "load": 57750
            },
            {
                "product": "شركة البستان للمطاحن وإستيراد القمح",
                "load": 12000
            },
            {
                "product": "شركة البستان للمطاحن وإستيراد القمح",
                "load": 17000
            },
            {
                "product": "شركة البستان للمطاحن وإستيراد القمح",
                "load": 10000
            },
            {
                "product": "برايم جراينيز",
                "load": 6000
            },
            {
                "product": "نيو جرين للتجارة والتوريدات",
                "load": 2700
            },
            {
                "product": "روتس كوموديتيز",
                "load": 4000
            },
            {
                "product": "روتس كوموديتيز",
                "load": 3693
            },
            {
                "product": "شركة مطاحن المناهيرى للحبوب ومنتجاتها",
                "load": 6600
            },
            {
                "product": "شركة البستان للمطاحن وإستيراد القمح",
                "load": 20000
            }
        ]
    }
}
