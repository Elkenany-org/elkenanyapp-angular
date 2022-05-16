
import { ToasterService } from '@app/@shared/services/toastr.service';

export class Fillter{
    // constructor(private toster:ToasterService) {

    // }
    public filterdata: {[key:string]:string} = {
        from:"",
        to:"",
        section_id:"",
        sub_id:"",
        sort:"",
        country_id:"",//was 1
        city_id:"1",
        search: "",
        page:'1'
      } 


      public filter(option:any):{[key:string]:string} {
        console.log(option);
        // this.toster.loading('حاري التحميل')
        switch (option.type){
          case "date-to":
            this.filterdata['to'] = option.name
            break
          case "date-from":
            this.filterdata['from'] = option.name
            break
            case "section":
          this.filterdata["section_id"] = option.id
            break;
        case "sector":
          this.filterdata["sub_id"] = option.id 
          break;
        case "sort":
          this.filterdata["sort"] = option.id
            break;
        case "countries":
          this.filterdata["country_id"] = option.id 
            break
        case "cities":
          this.filterdata["city_id"] = option.id 
            break
        case "search":
            this.filterdata["search"] = option.name
            break            
          default:
            break
        }
        // console.log(this.filterdata)
        return this.filterdata

        
      }
}