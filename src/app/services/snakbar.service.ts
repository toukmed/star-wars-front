import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  BASE_URL = 'https://swapi.dev/api/';

  constructor(private snackBar: MatSnackBar) { }

  openSuccess(message: string){
    this.snackBar.open(message,
      'OK', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['success-snackbar'],
      })
  }

  openWarning(message: string){
    this.snackBar.open(message,
      'OK', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['warning-snackbar'],
      })
  }


}
