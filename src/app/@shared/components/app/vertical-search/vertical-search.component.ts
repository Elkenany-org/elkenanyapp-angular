import {
  Component,
  OnChanges,
  Input,
  SimpleChanges,
 
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { JsonFormData } from '@app/@core/interfaces/_app/horizontal-search';
// import { JsonFormControls, JsonFormData } from '../horizontal-search/_core/data';
// import {  JsonFormData,  } from './_core/data';

@Component({
  selector: 'app-vertical-search',
  templateUrl: './vertical-search.component.html',
  styleUrls: ['./vertical-search.component.scss']
})
export class VerticalSearchComponent implements OnChanges {

  @Output() newItemEvent = new EventEmitter<string>();
  @Input() data?: JsonFormData 
  showContent: Boolean = false;

  public myForm: FormGroup = this.fb.group({});
  selected: number = 1;
  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges) {
    //  console.log(changes['data'].firstChange)

  }
  onSubmit() {

  }

  selectOption(value: any, type?:string) {
    //getted from event
    const id =this.data?.controls?.find(control => control.role == type)?.option?.find((option:any) => ( option.type || option.name ) ==value)?.id 
    let option:any= {
      id: id,
      name: value,
      type: type 
      }

      console.log(option)

    this.newItemEvent.emit(option)

  }


  ShowHideContent() {
    
    this.showContent = this.showContent ? false : true;
 }
}
