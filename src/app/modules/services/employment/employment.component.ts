import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { sector } from '@app/@core/@data/app/filter-list';

@Component({
  selector: 'app-employment',
  templateUrl: './employment.component.html',
  styleUrls: ['./employment.component.scss']
})
export class EmploymentComponent implements OnInit {

  public loading: boolean = true
  id?: number
  type?:string
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe(parm => {
      this.type=parm['type']
      this.id = sector.find(i => i.type ==  parm['type'])?.id
      // console.log(this.id)
    })
  }
}
