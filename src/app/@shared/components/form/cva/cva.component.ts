import {
  Component,
  OnChanges,
  Input,
  ChangeDetectionStrategy,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


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
@Component({
  selector: 'app-cva',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cva.component.html',
  styleUrls: ['./cva.component.scss']
})
export class CvaComponent implements OnChanges {

  @Input() data?: JsonFormData 

  public myForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) {

  }

  ngOnChanges(changes: SimpleChanges) {
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

}
