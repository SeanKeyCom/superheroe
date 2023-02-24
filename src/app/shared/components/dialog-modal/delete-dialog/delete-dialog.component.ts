import { ISuperheroe } from './../../../../core/models/superheroe.model';
import { Component, EventEmitter, isDevMode, OnInit, Output } from '@angular/core';
import { Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {
  @Output()
  public shOkDeletion: EventEmitter<ISuperheroe> = new EventEmitter<ISuperheroe>();

  constructor(
              public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ISuperheroe
            ) { }


  public onNoClick(): void {
    this.shOkDeletion.emit({} as ISuperheroe);

    environment.disableLog ? null : console.log('delete-dialog.component - onNoClick()');

    this.dialogRef.close();
  }
}
