import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  public filterData:{[key:string]:string}= {
    type:"",
    sort:"",
    search:"",
  }
  filter(option:any) {
    let sectorId: any 
    let sectorType 

      // 
      switch ( option.type ) {
        case "section":
          this.filterData["section_id"] = option.id
            break;
        case "sector":
          this.filterData["sub_id"] = option.id 
          break;
        case "sort":
          this.filterData["sort"] = option.id
            break;
        case "countries":
          this.filterData["country_id"] = option.id 
            break
        case "cities":
          this.filterData["city_id"] = option.id 
            break
        default: 
            // 
            break;
     }
    
  }
  
}
