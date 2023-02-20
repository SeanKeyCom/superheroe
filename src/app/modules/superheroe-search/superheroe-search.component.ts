import { DeleteDialogComponent } from './../../shared/components/dialog-modal/delete-dialog/delete-dialog.component';
import { ISuperheroe } from './../../core/models/superheroe.model';
import { Component, OnInit } from '@angular/core';
import { SuperheroeService } from 'src/app/shared/services/superheroe.service';
import { Router } from '@angular/router';
import {AfterViewInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

// Angular Material
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-superheroe-search',
  templateUrl: './superheroe-search.component.html',
  styleUrls: ['./superheroe-search.component.scss']
})
export class SuperheroeSearchComponent implements OnInit, AfterViewInit  {
  displayedColumns: string[] = ['id', 'type', 'alias', 'name', 'skills', 'power', 'email', 'actions'];
  public dataSource: MatTableDataSource<ISuperheroe>;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  //public form: FormGroup = this._fb.group({nameFilter: [null]});

  private _subscriptions: Subscription[] = [];

  constructor(
    private readonly _superheroeservice: SuperheroeService,
    //private readonly _fb: FormBuilder,
    private readonly _route: Router,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<ISuperheroe>(this._superheroeservice.lstSuperheroe);
  }


  ngOnInit(): void {
    let sub: Subscription;

    sub = this._superheroeservice.lstSuperheroe$.subscribe({
      next: (data: ISuperheroe[]) => {
        this.dataSource = new MatTableDataSource<ISuperheroe>(data);
        this.dataSource.paginator = this.paginator
      },
      error: (err) => {
        console.error('superheroe-search - ngOnInit - error err:', err);
      },
      complete: () => {
        console.log('superheroe-search - ngOnInit - complete');
      }
    });

    this._subscriptions.push(sub);
  }


  ngAfterViewInit() {
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }


  // public filterTable(): void {
  //   let nameFilterValue: string | null | undefined = this?.form?.get('nameFilter')?.value;

  //   if(nameFilterValue !== null && nameFilterValue !== undefined && nameFilterValue!=='') {
  //     setTimeout(() => this._superheroeservice.getAllSuperheroeByNameLike(this?.form?.get('nameFilter')?.value.toUpperCase()),
  //                400);
  //   } else {
  //     //We are not subscribing to this because we are just interested in the execution of .next() which will do the job
  //     this._superheroeservice.getAllSuperheroe();
  //   }
  // }


  /** Buttons actions **/
  public onEdit(row: any): void {
    let superheroe: ISuperheroe;

    console.log('superheroe-search.component - onEdit - row:', row);

    if(row!== undefined && row !== null) {
      superheroe = row as ISuperheroe;
      this._route.navigate(['/management', superheroe.id]);
    } else {
        console.error('There is a problem with the data of the row');
    }
  }


  public onDelete(row: any): void {
    let sub: Subscription;

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
             name: (row as ISuperheroe)?.name,
             alias: (row as ISuperheroe)?.alias,
             email: (row as ISuperheroe)?.email,
             id: (row as ISuperheroe)?.id,
             power: (row as ISuperheroe)?.power,
             skills: (row as ISuperheroe)?.skills,
             type: (row as ISuperheroe)?.type
            },
    });

    console.log('superheroe-search.component - onDelete() - row:', row);

    sub = dialogRef.afterClosed().subscribe({
      next: (result) => {
        console.log('The dialog was closed - result:', result);
        if(result !== undefined && result !== null) {
          this.delete(row);
        }
      },
      error: (err) => {
        console.error('superheroe-search() - onDelete() - dialogRef.afterClosed() - error:', err);
      },
      complete: () => {
        console.info('superheroe-search() - onDelete() - dialogRef.afterClosed() - complete');
      }
    });

    this._subscriptions.push(sub);
  }


  public delete(row: any): void {
    let superheroe: ISuperheroe;

    console.log('superheroe-search.component - delete() - row:', row);

    if(row!== undefined && row !== null) {
      superheroe = row as ISuperheroe;

      //We are not subscribing to this because we are just interested in the execution of .next() which will do the job
      this._superheroeservice.deleteSuperheroe(superheroe);
    } else {
        console.error('There is a problem with the data of the row');
    }
  }


  // public onNew(): void {
  //   this._route.navigate(['/management']);
  // }
  /** /Buttons actions */


  ngOnDestroy(): void {
    this._subscriptions.forEach((sub: Subscription) => { sub?.unsubscribe(); });
  }
}


