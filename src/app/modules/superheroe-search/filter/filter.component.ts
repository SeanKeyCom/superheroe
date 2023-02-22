import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SuperheroeService } from 'src/app/shared/services/superheroe.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent {
  @Output()
  public name2Bfiltered: EventEmitter<string> = new EventEmitter<string>();
  public form: FormGroup = this._fb.group({nameFilter: [null]});
  
  constructor(private readonly _route: Router,
              private readonly _superheroeservice: SuperheroeService,
              private readonly _fb: FormBuilder
             ) {}

  public onNew(): void {
    this._route.navigate(['/management']);
  }

  public filterTable(): void {
    let nameFilterValue: string | null | undefined = this?.form?.get('nameFilter')?.value;

    if(nameFilterValue !== null && nameFilterValue !== undefined) {
      //FIXME: Could be improved by using a debounce()
      this.name2Bfiltered.emit(nameFilterValue.toUpperCase());
    } 
  }
}
