import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SuperheroeService } from 'src/app/shared/services/superheroe.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
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

    if(nameFilterValue !== null && nameFilterValue !== undefined && nameFilterValue!=='') {
      setTimeout(() => this._superheroeservice.getAllSuperheroeByNameLike(this?.form?.get('nameFilter')?.value.toUpperCase()),
                 400);
    } else {
      //We are not subscribing to this because we are just interested in the execution of .next() which will do the job
      this._superheroeservice.getAllSuperheroe();
    }
  }
}
