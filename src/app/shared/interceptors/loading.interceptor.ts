import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../services/spinner.service';

@Injectable({
  providedIn: 'root'
})

export class LoadingInterceptor implements HttpInterceptor {
  private countRequest = 0;
  private idMessage!: string;

  constructor(
    private spinnerService: SpinnerService
  ) {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.spinnerService.mostrarSpinner();
      return next.handle(req).pipe(
          finalize( () => this.spinnerService.ocultarSpinner())
      );
  }
}
