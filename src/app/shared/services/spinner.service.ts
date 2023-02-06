import { Injectable } from '@angular/core';

//import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(
    private spinnerService: SpinnerService
  ) { }


  public mostrarSpinner() {
    this.spinnerService.mostrarSpinner();
  }


  public ocultarSpinner() {
    this.spinnerService.ocultarSpinner();
  }
}
