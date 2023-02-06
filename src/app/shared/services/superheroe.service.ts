import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, EMPTY, from, Observable, of, Subscription } from "rxjs";
import { ISuperheroe } from "src/app/core/models/superheroe.model";
import { TypesSuperheroes } from "../enums/typesSuperheroes.enum";
import { delay } from 'rxjs/operators';

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


  constructor() {
    this.lstSuperheroe = this.getStartingDummyLoad();
    this.lstSuperheroeBS.next(this.lstSuperheroe);
  }


  public getAllSuperheroe() : Observable<ISuperheroe[]> {
    let result: Observable<ISuperheroe[]>;

    if(this.lstSuperheroe !== null && this.lstSuperheroe !== undefined && this.lstSuperheroe.length > 0) {
      this.lstSuperheroeBS.next(this.lstSuperheroe);
      result = of(this.lstSuperheroe).pipe(delay(200));
    } else {
      this.lstSuperheroeBS.next([]);
      result = EMPTY;
    }

    return result;
  }


  public getAllSuperheroeByNameLike(name: string) : Observable<ISuperheroe[]> {
    let preResult: ISuperheroe[] = [];
    let result: Observable<ISuperheroe[]> = EMPTY;

    if(name && name!== undefined) {
      if(this.lstSuperheroe !== null && this.lstSuperheroe !== undefined && this.lstSuperheroe.length > 0) {
        preResult = this.lstSuperheroe.filter(sh => sh.name.includes(name));
      }
    }

    if(preResult) {
      if(preResult?.length === 0) {
        this.lstSuperheroeBS.next([]);
        result = EMPTY;
      } else {
        this.lstSuperheroeBS.next(preResult);
        result = of(preResult).pipe(delay(700));
      }
    }

    return result;
  }


  //CRUD methods
  public getSuperheroeByID(idSuperheroe: number) : Observable<ISuperheroe> {
    let result: ISuperheroe | undefined | null = null;

    if(this.lstSuperheroe !== null && this.lstSuperheroe !== undefined && this.lstSuperheroe?.length>0) {
      result = this.lstSuperheroe?.find(data => data?.id === idSuperheroe);
    }

    return (result && result !== undefined) ?
                of(result).pipe(delay(500))
              : EMPTY;

  }


  public putSuperheroe(pSuperheroe: ISuperheroe) : Observable<ISuperheroe[]> {
    let position: number = -1;
    let superheroe2Bmodified: ISuperheroe | undefined | null = null;
    let result: Observable<ISuperheroe[]>;

    superheroe2Bmodified = this.lstSuperheroe.find(sh => sh.id === pSuperheroe.id);

    position = superheroe2Bmodified && superheroe2Bmodified !== undefined ?
                this.lstSuperheroe.indexOf(superheroe2Bmodified)
                : -1;

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


  public deleteSuperheroe(superheroe2Bdeleted: ISuperheroe): Observable<ISuperheroe[]> {
    let position: number = -1;

    position = this.lstSuperheroe.indexOf(superheroe2Bdeleted);
    this.lstSuperheroe.splice(position, 1);

    this.lstSuperheroeBS.next(this.lstSuperheroe);
    return of(this.lstSuperheroe).pipe(delay(1100));
  }


  public addSuperheroe(superheroe2Badded: ISuperheroe) : Observable<boolean> {
    let result: boolean = false;

    if(superheroe2Badded !== undefined && superheroe2Badded!== null) {
      //Compulsory properties for a valid superheroe entity
      if(superheroe2Badded.hasOwnProperty('name') && superheroe2Badded.hasOwnProperty('type')) {
        superheroe2Badded.id = this.getNextIDavailable(this.lstSuperheroe);
        this._lstSuperheroe.push(superheroe2Badded);
        result = true;
        this.lstSuperheroeBS.next(this._lstSuperheroe);
      }
    }

    return of(result);
  }


  // *************************** Auxiliary methods ***************************
  public getStartingDummyLoad(): ISuperheroe[] {
    let result: ISuperheroe[] = [];

    result =  [
                  {id: 0, type: TypesSuperheroes.CAN_FLY, alias: 'WonderMan', name: 'SUPERMAN', skills: 90, power: 10, email: 'test@now.com'},
                  {id: 1, type: TypesSuperheroes.NINJA, alias: 'MortaBond', name: 'FRANCISCO IBAÑEZ', skills: 45, power: 89, email: 'test2@later.es'},
                  {id: 3, type: TypesSuperheroes.SOCIAL_SKILLS, alias: 'Three', name: 'IBAN ACCOUNT', skills: 33, power: 333, email: '3@three.tres'},
                  {id: 4, type: TypesSuperheroes.SOCIAL_SKILLS, alias: 'Fourth', name: 'FOURTHMAN', skills: 44, power: 444, email: '4@4.es'},
                  {id: 5, type: TypesSuperheroes.SOCIAL_SKILLS, alias: 'Fifth', name: 'FIFTHMAN', skills: 44, power: 444, email: '4@4.es'},
                  {id: 6, type: TypesSuperheroes.SOCIAL_SKILLS, alias: 'Sixth', name: 'SIXTHMAN', skills: 44, power: 444, email: '4@4.es'},
                  {id: 7, type: TypesSuperheroes.SOCIAL_SKILLS, alias: 'Seventh', name: 'SEVENTHMAN', skills: 44, power: 444, email: '4@4.es'},
                  {id: 8, type: TypesSuperheroes.SOCIAL_SKILLS, alias: 'Eighth', name: 'EIGTHMAN', skills: 44, power: 444, email: '4@4.es'},
                  {id: 9, type: TypesSuperheroes.SOCIAL_SKILLS, alias: 'Ninth', name: 'NINTHMAN', skills: 44, power: 444, email: '4@4.es'},
                  {id: 10, type: TypesSuperheroes.SOCIAL_SKILLS, alias: 'Tenth', name: 'TENTHMAN', skills: 44, power: 444, email: '4@4.es'},
                  {id: 11, type: TypesSuperheroes.SOCIAL_SKILLS, alias: 'Eleventh', name: 'AQUAMAN', skills: 44, power: 444, email: '4@4.es'}
              ];

    return result;
  }

  public setStartingDummyLoad(): void {
    let result: ISuperheroe[] = [];

    result =  [
      {id: 0, type: TypesSuperheroes.CAN_FLY, alias: 'WonderMan', name: 'SUPERMAN', skills: 90, power: 10, email: 'test@now.com'},
      {id: 1, type: TypesSuperheroes.NINJA, alias: 'MortaBond', name: 'FRANCISCO IBAÑEZ', skills: 45, power: 89, email: 'test2@later.es'},
      {id: 3, type: TypesSuperheroes.SOCIAL_SKILLS, alias: 'Three', name: 'IBAN ACCOUNT', skills: 33, power: 333, email: '3@three.tres'},
      {id: 4, type: TypesSuperheroes.SOCIAL_SKILLS, alias: 'Fourth', name: 'FOURTHMAN', skills: 44, power: 444, email: '4@4.es'},
      {id: 5, type: TypesSuperheroes.SOCIAL_SKILLS, alias: 'Fifth', name: 'FIFTHMAN', skills: 44, power: 444, email: '4@4.es'},
      {id: 6, type: TypesSuperheroes.SOCIAL_SKILLS, alias: 'Sixth', name: 'SIXTHMAN', skills: 44, power: 444, email: '4@4.es'},
      {id: 7, type: TypesSuperheroes.SOCIAL_SKILLS, alias: 'Seventh', name: 'SEVENTHMAN', skills: 44, power: 444, email: '4@4.es'},
      {id: 8, type: TypesSuperheroes.SOCIAL_SKILLS, alias: 'Eighth', name: 'EIGTHMAN', skills: 44, power: 444, email: '4@4.es'},
      {id: 9, type: TypesSuperheroes.SOCIAL_SKILLS, alias: 'Ninth', name: 'NINTHMAN', skills: 44, power: 444, email: '4@4.es'},
      {id: 10, type: TypesSuperheroes.SOCIAL_SKILLS, alias: 'Tenth', name: 'TENTHMAN', skills: 44, power: 444, email: '4@4.es'},
      {id: 11, type: TypesSuperheroes.SOCIAL_SKILLS, alias: 'Eleventh', name: 'AQUAMAN', skills: 44, power: 444, email: '4@4.es'}
              ];

    this._lstSuperheroe = result;
    this.lstSuperheroeBS.next(this._lstSuperheroe);
  }

  /************* Utils ********************/
  public getNextIDavailable(array: ISuperheroe[]): number {
    let result: number = 0;

    if(array!== undefined && array!== null && array.length > 0) {
      result = Math.max(...array.map(o => o.id)) + 1;
    }

    return result;

  }

  /************* /Utils ********************/


  // ************ TEST *************************
  public testMethodsService() : void {
    let sub: Subscription;

    sub = this.getAllSuperheroe().subscribe({
      next: (superheroe: ISuperheroe[]) => {
        console.log('getAllSuperheroe() - next - superheroe:', superheroe);
      },
      error: (err) => {
        console.error('getAllSuperheroe() - error:', err);
      },
      complete: () => {
          console.log('getAllSuperheroe() - complete');
      }
    });

    this._subscriptions.push(sub);

    /** ** **** ** **** ** **** ** **** ** **** ** **/

    sub = this.getSuperheroeByID(1).subscribe({
      next: (superheroe: ISuperheroe) => {
        console.log('getSuperheroeByID(idSuperheroe: number) : Observable<ISuperheroe> - next - superhero:', superheroe);
      },
      error: (err) => {
        console.error('getSuperheroeByID - error:', err);
      },
      complete: () => {
        console.log('getSuperheroeByID(idSuperheroe: number) : Observable<ISuperheroe> - complete - superhero:');
      }
    });

    this._subscriptions.push(sub);

    /** ** **** ** **** ** **** ** **** ** **** ** **/

    //matching
    sub = this.getAllSuperheroeByNameLike('Iba').subscribe({
      next: (superheroes: ISuperheroe[]) => {
        console.log('getAllSuperheroeByNameLike(name: string) : Observable<ISuperheroe[]> - next - superheroes', superheroes);
      },
      error: (err) => {
        console.error('getAllSuperheroeByNameLike - error:', err);
      },
      complete: () => {
        console.log('getAllSuperheroeByNameLike - complete - superhero:');
      }
    });

    this._subscriptions.push(sub);

    /** ** **** ** **** ** **** ** **** ** **** ** **/

    //not matching
    sub = this.getAllSuperheroeByNameLike('XYZ').subscribe({
      next: (superheroes: ISuperheroe[]) => {
        console.log('getAllSuperheroeByNameLike(name: string) : Observable<ISuperheroe[]> - next - superheroes:', superheroes);
      },
      error: (err) => {
        console.error('getAllSuperheroeByNameLike - error:', err);
      },
      complete: () => {
        console.log('getAllSuperheroeByNameLike - complete - superhero:');
      }
    });

    this._subscriptions.push(sub);

    /** ** **** ** **** ** **** ** **** ** **** ** **/

    //matching
    //Element to modify an existing one, therefore having the same "id"
    let auxSuperHeroeMatching: ISuperheroe = {id: 0, type: TypesSuperheroes.SUPER_STRENGTH, alias: '1111111', name: 'LadyGaGa1', skills: 11, power: 1, email: '1@one.tw'};

    //this._superheroeservice.putSuperheroe(auxSuperHeroeMatching).subscribe({
    sub = this.putSuperheroe(auxSuperHeroeMatching).subscribe({
      next: (superheroeList: ISuperheroe[]) => {
        console.log('putSuperheroe() - matching - next - modifying with auxSuperHeroe:', auxSuperHeroeMatching, 'superheroeList:', superheroeList);
      },
      error:
        (err) => {
          console.error('putSuperheroe() - error - err:', err);
        },
      complete:
        //When there is no match to substitute
        () => {
          console.log('putSuperheroe() - complete - superhero:');
        }
    });

    this._subscriptions.push(sub);

    /** ** **** ** **** ** **** ** **** ** **** ** **/

    //not matching
    //Element to modify an existing one, therefore having the same "id"
    let auxSuperHeroeNotMatching: ISuperheroe = {id: 999, type: TypesSuperheroes.SOCIAL_SKILLS, alias: '2222', name: 'MrGoGo2', skills: 22, power: 2, email: '2two@two.tw'};

    //this._superheroeservice.putSuperheroe(auxSuperHeroeNotMatching).subscribe({
    sub = this.putSuperheroe(auxSuperHeroeNotMatching).subscribe({
      next: (superheroeList: ISuperheroe[]) => {
        console.log('putSuperheroe() - not matching - next - modifying with auxSuperHeroe:', auxSuperHeroeNotMatching, 'superheroeList:', superheroeList);
      },
      error:
        (err) => {
          console.error('putSuperheroe() - error - not matching - err:', err);
        },
      complete:
        //When there is no match to substitute
        () => {
          console.log('putSuperheroe() - complete - not matching ');
        }
    });

    this._subscriptions.push(sub);
    /** ** **** ** **** ** **** ** **** ** **** ** **/

    let auxSuperHeroeMatching2delete: ISuperheroe = {id: 0, type: TypesSuperheroes.SUPER_STRENGTH, alias: '1111111', name: 'LadyGaGa1', skills: 11, power: 1, email: '1@one.tw'};

    sub = this.deleteSuperheroe(auxSuperHeroeMatching2delete).subscribe({
      next: (lstSuperheroe: ISuperheroe[]) => {
        console.log('deleteSuperheroe - next - listA after deletion:', lstSuperheroe);
      },
      error: (err) => {
        console.error('deleteSuperheroe() - error - err:', err);
      },
      complete: () => {
        console.log('deleteSuperheroe() - complete');
      }
    });

    this._subscriptions.push(sub);

    // ************ /TEST *************************
  }


    ngOnDestroy(): void {
      this._subscriptions.forEach((sub: Subscription) => { sub?.unsubscribe(); });
    }
}

