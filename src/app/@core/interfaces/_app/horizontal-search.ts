export interface JsonFormValidators {
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
  export interface JsonFormControlOptions {
    min?: string;
    max?: string;
    step?: string;
    icon?: string;
  }
  
  export interface JsonFormControls {
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
    option?: options[]
    routerLink?:string
  }
  
  export interface JsonFormData {
    title:string
    class?: string
    controls?: JsonFormControls[];
  }
  
  export interface options {
    id?: number
    name?: string
    selected?:number
    type?: string
    value?:string
  }
  
  export interface optionBody {
    section_id? : string,
    sub_id? :  string,
    sort? :  string,
    country_id? : string,
    city_id? :  string,
    search? :  string,
    page?:string
  }