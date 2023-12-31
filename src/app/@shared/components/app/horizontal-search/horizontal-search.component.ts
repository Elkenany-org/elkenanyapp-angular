import {
  Component,
  OnChanges,
  Input,
  SimpleChanges,
  OnInit,
 
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { JsonFormControls, JsonFormData, optionBody } from '@app/@core/interfaces/_app/horizontal-search';



@Component({
  selector: 'app-horizontal-search',
  templateUrl: './horizontal-search.component.html',
  styleUrls: ['./horizontal-search.component.scss']
})

export class HorizontalSearchComponent implements OnChanges {

  @Output() newItemEvent = new EventEmitter<optionBody>();
  @Input() data?: JsonFormData 
  @Input() ships?: boolean
  public myForm: FormGroup = this.fb.group({});
  selected: number = 1;


  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const filterDpnBtn = document.querySelector(".sorting .sorting-cont .open");
    const filterDpn = document.querySelector(".sorting .sorting-cont .cont1 section");

    filterDpnBtn?.addEventListener('click', () => {
      filterDpn?.classList.toggle("active");
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes?.['data'])

    if (!changes['data'].firstChange) {

      this.createForm(this.data?.controls!);


 

    }
  }

  createForm(controls: JsonFormControls[] ) {
    for (const control of controls) {
      const validatorsToAdd = [];

      for (const [key, value] of Object.entries(control.validators)) {
        switch (key) {
          case 'min':
            validatorsToAdd.push(Validators.min(value));
            break;
          case 'max':
            validatorsToAdd.push(Validators.max(value));
            break;
          case 'required':
            if (value) {
              validatorsToAdd.push(Validators.required);
            }
            break;
          case 'requiredTrue':
            if (value) {
              validatorsToAdd.push(Validators.requiredTrue);
            }
            break;
          case 'email':
            if (value) {
              validatorsToAdd.push(Validators.email);
            }
            break;
          case 'minLength':
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case 'pattern':
            validatorsToAdd.push(Validators.pattern(value));
            break;
          case 'nullValidator':
            if (value) {
              validatorsToAdd.push(Validators.nullValidator);
            }
            break;
          default:
            break;
        }
      }

      this.myForm.addControl(
        control.name,
        this.fb.control(control.value, validatorsToAdd)
      );
    }
  }

  onSubmit() {
  
  }

  selectOption(value: any, type?:string,name?:string) { //ex: value = animal , type = sector, name = بورصه الاعلاف

    // if(type=="date"){
    //   console.log(value.substring(1,5)); 
    // }
    //   Search for id that inside options that inside controls 
    const id =this.data?.controls?.find(control => control.role == type)?.option?.find(option => ( option.type || option.name ) == value)?.id 
    const title =this.data?.controls?.find(control => control.role == type)?.option?.find(option => ( option.type || option.name ) == value)?.name 

    let option:any= {
      id: id,
      name: value,
      type: type ,
      title:title
      }

      if(type=="date" || type=="dataOfArrival"){
          if (parseInt(value.substring(0,4))>=2021 && parseInt(value.substring(0,5))<20211 && parseInt(value.substring(0,5))<202111){
             this.newItemEvent.emit(option);
          //  console.log(parseInt(value.substring(0,4)));
          }
          if(value == ''){
            this.newItemEvent.emit(option);
          }
        // else if(parseInt(value.substring(1,5))<202  ){
        //   console.log(parseInt(value.substring(1,5)));
        // }

      }else{
          this.newItemEvent.emit(option);
          // console.log(option);
      }


    }
    
    selectEmptydate(value: any, type?:string,name?:string,event? :KeyboardEvent) { //ex: value = animal , type = sector, name = بورصه الاعلاف
// console.log('====================================');
// console.log(event);
// console.log('====================================');

      // if(type=="date"){
      //   console.log(value.substring(1,5)); 
      // }
      //   Search for id that inside options that inside controls 
      const id =this.data?.controls?.find(control => control.role == type)?.option?.find(option => ( option.type || option.name ) == value)?.id 
      const title =this.data?.controls?.find(control => control.role == type)?.option?.find(option => ( option.type || option.name ) == value)?.name 
  
      let option:any= {
        id: id,
        name: value,
        type: type ,
        title:title
        }     
         console.log('====================================');
      console.log(option);
      console.log('====================================');
        if(type=="date" || type=="dataOfArrival"){
            if (parseInt(value.substring(0,4))>=2021 && parseInt(value.substring(0,5))<20211 && parseInt(value.substring(0,5))<202111){
               this.newItemEvent.emit(option);
             console.log(parseInt(value.substring(0,4)));
            }
          // else if(parseInt(value.substring(1,5))<202  ){
          //   console.log(parseInt(value.substring(1,5)));
          // }
  
        }else{
            this.newItemEvent.emit(option);
            console.log(option);
        }
  
  
      }

  }


