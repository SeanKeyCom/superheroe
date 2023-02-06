import { SuperheroeService } from 'src/app/shared/services/superheroe.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Super Heroes';

  constructor(private readonly _superheroeservice: SuperheroeService) {
    //This set eleven registers to start working with
    this._superheroeservice.setStartingDummyLoad();
   }

}
