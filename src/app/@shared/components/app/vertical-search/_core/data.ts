
   export interface JsonFormData {
    title:string
    class?: string
    controls?: Controls[];
  }
  
  
  export interface Controls {
    label?: string;
    value?: string;
    type?: string;
    role?:string,
    class?:string,
    name?:string,
    icon?:string
    option?:any
  }
  export interface Div {
    button:Button;
    controls:Controls
  }

  export interface Button {
    name:string
    directive_atr:{atr:string, value:string}
    i: {class:string}
  }
  

  // export const Search_Form_Data: JsonFormData =
  // {   
  //   title: "الأسعار الاسترشادية",
  //   class:"tabs tabs-4",
  //   div:[
  //     {
  //       button: {
  //         name:" البحث",
  //         directive_atr: {
  //           atr:"#s1",
  //           value:"s1"
  //         },
  //         i: {
  //           class:"fas fa-puzzle-piece"
  //         }
  //        },
  //        controls:{
          
  //          label:"الداجني"

  //        }
  //     },
  //     {
  //       button: {
  //         name:" القطاع",
  //         directive_atr: {
  //           atr:"#s1",
  //           value:"s1"
  //         },
  //         i: {
  //           class:"fas fa-puzzle-piece"
  //         }
  //        },
  //        controls:{
          
  //          label:"الداجني"

  //        }
  //     },
  //     {
  //       button: {
  //         name:" الترتيب",
  //         directive_atr: {
  //           atr:"#s1",
  //           value:"s1"
  //         },
  //         i: {
  //           class:"fas fa-puzzle-piece"
  //         }
  //        },
  //        controls:{
          
  //          label:"الداجني"

  //        }
  //     },
  //   ]
      
   
  
     
  // }
  