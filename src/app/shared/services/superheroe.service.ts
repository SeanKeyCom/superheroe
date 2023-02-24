import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, EMPTY, from, Observable, of, Subscription } from "rxjs";
import { ISuperheroe } from "src/app/core/models/superheroe.model";
import { TypesSuperheroes } from "../enums/typesSuperheroes.enum";
import { delay } from 'rxjs/operators';
import { auxiliaryService } from "./auxiliary.service";

@Injectable({
  providedIn: 'root'
})

export class SuperheroeService implements OnDestroy {
  private _lstSuperheroe: ISuperheroe[] = [];
  public get lstSuperheroe(): ISuperheroe[] {
    return this._lstSuperheroe;
  }
  public set lstSuperheroe(value: ISuperheroe[]) {
    this._lstSuperheroe = value;
  }

  private lstSuperheroeBS: BehaviorSubject<ISuperheroe[]> = new BehaviorSubject<ISuperheroe[]>(this._lstSuperheroe);
  public lstSuperheroe$: Observable<ISuperheroe[]> = this.lstSuperheroeBS.asObservable();

  private _subscriptions: Subscription[] = [];
  private INDEX_OUT_OF_BOUNDS: number = -1;


  constructor(private readonly _auxiliaryService: auxiliaryService) {
    this.lstSuperheroe = this._auxiliaryService.getStartingDummyLoad();
    this.lstSuperheroeBS.next(this.lstSuperheroe);
  }


  public getAllSuperheroe() : void {
    if(this.lstSuperheroe !== null && this.lstSuperheroe !== undefined && this.lstSuperheroe.length > 0) {
      this.lstSuperheroeBS.next(this.lstSuperheroe);
    } else {
      this.lstSuperheroeBS.next([]);
    }
  }


  public getAllSuperheroeByNameLike(name: string) : void {
    let preResult: ISuperheroe[] = [];

    if(name && name!== undefined) {
      if(this.lstSuperheroe !== null && this.lstSuperheroe !== undefined && this.lstSuperheroe.length > 0) {
        preResult = this.lstSuperheroe.filter(sh => sh.name.includes(name));
      }
    }

    if(preResult) {
      if(preResult?.length === 0) {
        this.lstSuperheroeBS.next([]);
      } else {
        this.lstSuperheroeBS.next(preResult);
      }
    }
  }


  //CRUD methods
  public getSuperheroeByID(idSuperheroe: number) : Observable<ISuperheroe> {
    let result: ISuperheroe | undefined | null = null;

    if(this.lstSuperheroe !== null && this.lstSuperheroe !== undefined && this.lstSuperheroe?.length>0) {
      result = this.lstSuperheroe?.find(data => data?.id === idSuperheroe);
    }

    return (result && result !== undefined) ?
                of(result)
              : EMPTY;

  }


  public putSuperheroe(pSuperheroe: ISuperheroe) : Observable<ISuperheroe[]> {
    let position: number = this.INDEX_OUT_OF_BOUNDS;
    let superheroe2Bmodified: ISuperheroe | undefined | null = null;
    let result: Observable<ISuperheroe[]>;

    superheroe2Bmodified = this.lstSuperheroe.find(sh => sh.id === pSuperheroe.id);

    position = superheroe2Bmodified && superheroe2Bmodified !== undefined ?
                this.lstSuperheroe.indexOf(superheroe2Bmodified)
              : this.INDEX_OUT_OF_BOUNDS;

    if(position !== null && position !== undefined && position >= 0) {
      this.lstSuperheroe[position] = pSuperheroe;
      this.lstSuperheroeBS.next(this.lstSuperheroe);
      result = of(this.lstSuperheroe).pipe(delay(900));
    } else {
      this.lstSuperheroeBS.next([]);
      result = EMPTY;
    }

    return result;
  }


  public deleteSuperheroe(superheroe2Bdeleted: ISuperheroe): void {
    let position: number = this.INDEX_OUT_OF_BOUNDS;

    position = this.lstSuperheroe.indexOf(superheroe2Bdeleted);
    this.lstSuperheroe.splice(position, 1);

    this.lstSuperheroeBS.next(this.lstSuperheroe);
  }


  public addSuperheroe(superheroe2Badded: ISuperheroe) : Observable<boolean> {
    let result: boolean = false;

    if(superheroe2Badded !== undefined && superheroe2Badded!== null) {
      //Compulsory properties for a valid superheroe entity
      if(superheroe2Badded.hasOwnProperty('name') && superheroe2Badded.hasOwnProperty('type')) {
        superheroe2Badded.id = this._auxiliaryService.getNextIDavailable(this.lstSuperheroe);
        this._lstSuperheroe.push(superheroe2Badded);
        result = true;
        this.lstSuperheroeBS.next(this._lstSuperheroe);
      }
    }

    return of(result);
  }


    ngOnDestroy(): void {
      this._subscriptions.forEach((sub: Subscription) => { sub?.unsubscribe(); });
    }
}

