import { City, Country, Sector, Sort, SubSection } from "./app-response"

export interface FilterList {
    sectors: Sector[]
    sort: Sort[]
    countries?: Country[]
    cities?: City[]
    sub_sections?: SubSection[]
  }
  

  




  //////////////////////////////////////////////////


  
interface JsonFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
  pattern?: string;
  nullValidator?: boolean;
}
interface JsonFormControlOptions {
  min?: string;
  max?: string;
  step?: string;
  icon?: string;
}

interface JsonFormControls {
  name: string;
  label?: string;
  value: string;
  type: string;
  options?: JsonFormControlOptions;
  required?: boolean;
  validators: JsonFormValidators;
  role?:string,
  class?:string,
  icon?:string,
  routerLink?:string
  option?: options[]
}

export interface JsonFormData {
  title:string
  class?: string
  controls?: JsonFormControls[];
}

export interface options {
  id: number
  name: string
  selected:number
  type: string
}