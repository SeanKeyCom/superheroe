import { ISuperheroe } from './../../core/models/superheroe.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuperheroeService } from 'src/app/shared/services/superheroe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-superheroe-management',
  templateUrl: './superheroe-management.component.html',
  styleUrls: ['./superheroe-management.component.scss']
})
export class SuperheroeManagementComponent implements OnInit, OnDestroy {
  public form: FormGroup = this._fb.group({
    type:   [null, [Validators.required]],
    alias:  [null],
    name:   [null, [Validators.required]],
    skills: [null],
    power:  [null],
    email:  [null, [Validators.email]]
  });

  private idSH: number = -1;
  private _subscriptions: Subscription[] = [];

  constructor(
    private readonly _superheroeservice: SuperheroeService,
    private readonly _fb: FormBuilder,
    private readonly _route: Router,
    private readonly _activatedRoute: ActivatedRoute
  ) {
      if(this._activatedRoute.snapshot.paramMap.get('id') !== undefined && this._activatedRoute.snapshot.paramMap.get('id') !== null)  {
        this.idSH = Number(this._activatedRoute.snapshot.paramMap.get('id'));
      }
  }


  ngOnInit(): void {
    let sub: Subscription;

    if(this.idSH !== undefined && this.idSH !== null && this.idSH >= 0) {
      sub = this._superheroeservice.getSuperheroeByID(this.idSH).subscribe({
        next: (supeH: ISuperheroe) => {
          this.form.patchValue(supeH);
        },
        error: (err) => {
          console.error('An error has happened while trying to get the id from the url');
        },
        complete: () => {
          console.info('superheroe-management.component - ngOnInit() - complete()');
        }
      });

      this._subscriptions.push(sub);
    }
  }


  public onSave(): void {
    let superheroe: ISuperheroe;
    let result: boolean = false;
    let sub: Subscription;

    if(!this.form.invalid) {
      superheroe = this.form.value;

      if(this.idSH !== undefined && this.idSH !== null && this.idSH >= 0 ) {
          // Due to the fact that the id of the superheroe to modify is not stored as a field in the form
          // we will get it from the url and set it into the object to store.
          superheroe.id =  this.idSH;
          sub = this._superheroeservice.putSuperheroe(superheroe).subscribe({
            next: (result: ISuperheroe[]) => {
              if(result) {
                this._route.navigate(['/home']);
              } else {
                //Modal window telling the user about the error
                console.error('Saving has not been possible!')
              }
            },
            error: (err) => {
              console.error('Error modifiying a superheroe');
            },
            complete: () => {
              console.info('Modifiying action has been fulfilled');
            }
          });
          this._subscriptions.push(sub);
      } else {
        sub = this._superheroeservice.addSuperheroe(superheroe).subscribe({
          next: (result: boolean) => {
            if(result) {
              this._route.navigate(['/home']);
            } else {
              //Modal window telling the user about the error
              console.error('Saving has not been possible!')
            }
          },
          error: (err) => {
            console.error('Error saving the superheroe');
          },
          complete: () => {
            console.info('Saving action has been fulfilled');
          }
        });

        this._subscriptions.push(sub);
      }
    } else {
      this.form.markAllAsTouched();
      console.error('Invalid state of the form');
    }
  }

  public onCancel() : void {
    history.back();
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((sub: Subscription) => { sub?.unsubscribe(); });
  }
}
