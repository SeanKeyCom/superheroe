import { SuperheroeService } from 'src/app/shared/services/superheroe.service';
import { Component } from '@angular/core';
import { auxiliaryService } from './shared/services/auxiliary.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Super Heroes';

  constructor() {
   }

}
