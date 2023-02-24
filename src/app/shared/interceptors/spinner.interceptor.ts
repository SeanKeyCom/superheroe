import { Injectable, isDevMode } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  // I couldn't make it work
  constructor() {
    environment.disableLog ? '' : console.log('spinner.interceptor - constructor');
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    environment.disableLog ? '' : console.log('interceptor-spinner');  
    return next.handle(request);
  }
}
