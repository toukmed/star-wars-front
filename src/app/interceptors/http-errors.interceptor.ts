import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from "rxjs/operators";
import {SnackBarService} from "../services/snakbar.service";

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {

  constructor(private snackBarService: SnackBarService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((response: any) => {
        if (response.body?.errors) {
          response.body.errors.forEach((error: any) => {
            this.snackBarService
              .openWarning(error.message);
          });
        }
      })
    )
  }
}
