import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ISuperheroe } from "src/app/core/models/superheroe.model";
import { TypesSuperheroes } from "../enums/typesSuperheroes.enum";


@Injectable({
  providedIn: 'root'
})

export class auxiliaryService {
    
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


  /************* Utils ********************/
  public getNextIDavailable(array: ISuperheroe[]): number {
    let result: number = 0;

    if(array!== undefined && array!== null && array.length > 0) {
      result = Math.max(...array.map(o => o.id)) + 1;
    }

    return result;
  }

  /************* /Utils ********************/


  // // ************ TEST *************************
  // public testMethodsService() : void {
  //   let sub: Subscription;

  //   // sub = this.getAllSuperheroe().subscribe({
  //   //   next: (superheroe: ISuperheroe[]) => {
  //   //     console.log('getAllSuperheroe() - next - superheroe:', superheroe);
  //   //   },
  //   //   error: (err) => {
  //   //     console.error('getAllSuperheroe() - error:', err);
  //   //   },
  //   //   complete: () => {
  //   //       console.log('getAllSuperheroe() - complete');
  //   //   }
  //   // });

  //   //this._subscriptions.push(sub);

  //   /** ** **** ** **** ** **** ** **** ** **** ** **/

  //   sub = this.getSuperheroeByID(1).subscribe({
  //     next: (superheroe: ISuperheroe) => {
  //       console.log('getSuperheroeByID(idSuperheroe: number) : Observable<ISuperheroe> - next - superhero:', superheroe);
  //     },
  //     error: (err) => {
  //       console.error('getSuperheroeByID - error:', err);
  //     },
  //     complete: () => {
  //       console.log('getSuperheroeByID(idSuperheroe: number) : Observable<ISuperheroe> - complete - superhero:');
  //     }
  //   });

  //   this._subscriptions.push(sub);

  //   /** ** **** ** **** ** **** ** **** ** **** ** **/

  //   //matching
  //   // sub = this.getAllSuperheroeByNameLike('Iba').subscribe({
  //   //   next: (superheroes: ISuperheroe[]) => {
  //   //     console.log('getAllSuperheroeByNameLike(name: string) : Observable<ISuperheroe[]> - next - superheroes', superheroes);
  //   //   },
  //   //   error: (err) => {
  //   //     console.error('getAllSuperheroeByNameLike - error:', err);
  //   //   },
  //   //   complete: () => {
  //   //     console.log('getAllSuperheroeByNameLike - complete - superhero:');
  //   //   }
  //   // });

  //   // this._subscriptions.push(sub);

  //   /** ** **** ** **** ** **** ** **** ** **** ** **/

  //   //not matching
  //   // sub = this.getAllSuperheroeByNameLike('XYZ').subscribe({
  //   //   next: (superheroes: ISuperheroe[]) => {
  //   //     console.log('getAllSuperheroeByNameLike(name: string) : Observable<ISuperheroe[]> - next - superheroes:', superheroes);
  //   //   },
  //   //   error: (err) => {
  //   //     console.error('getAllSuperheroeByNameLike - error:', err);
  //   //   },
  //   //   complete: () => {
  //   //     console.log('getAllSuperheroeByNameLike - complete - superhero:');
  //   //   }
  //   // });

  //   this._subscriptions.push(sub);

  //   /** ** **** ** **** ** **** ** **** ** **** ** **/

  //   //matching
  //   //Element to modify an existing one, therefore having the same "id"
  //   let auxSuperHeroeMatching: ISuperheroe = {id: 0, type: TypesSuperheroes.SUPER_STRENGTH, alias: '1111111', name: 'LadyGaGa1', skills: 11, power: 1, email: '1@one.tw'};

  //   //this._superheroeservice.putSuperheroe(auxSuperHeroeMatching).subscribe({
  //   sub = this.putSuperheroe(auxSuperHeroeMatching).subscribe({
  //     next: (superheroeList: ISuperheroe[]) => {
  //       console.log('putSuperheroe() - matching - next - modifying with auxSuperHeroe:', auxSuperHeroeMatching, 'superheroeList:', superheroeList);
  //     },
  //     error:
  //       (err) => {
  //         console.error('putSuperheroe() - error - err:', err);
  //       },
  //     complete:
  //       //When there is no match to substitute
  //       () => {
  //         console.log('putSuperheroe() - complete - superhero:');
  //       }
  //   });

  //   this._subscriptions.push(sub);

  //   /** ** **** ** **** ** **** ** **** ** **** ** **/

  //   //not matching
  //   //Element to modify an existing one, therefore having the same "id"
  //   let auxSuperHeroeNotMatching: ISuperheroe = {id: 999, type: TypesSuperheroes.SOCIAL_SKILLS, alias: '2222', name: 'MrGoGo2', skills: 22, power: 2, email: '2two@two.tw'};

  //   //this._superheroeservice.putSuperheroe(auxSuperHeroeNotMatching).subscribe({
  //   sub = this.putSuperheroe(auxSuperHeroeNotMatching).subscribe({
  //     next: (superheroeList: ISuperheroe[]) => {
  //       console.log('putSuperheroe() - not matching - next - modifying with auxSuperHeroe:', auxSuperHeroeNotMatching, 'superheroeList:', superheroeList);
  //     },
  //     error:
  //       (err) => {
  //         console.error('putSuperheroe() - error - not matching - err:', err);
  //       },
  //     complete:
  //       //When there is no match to substitute
  //       () => {
  //         console.log('putSuperheroe() - complete - not matching ');
  //       }
  //   });

  //   this._subscriptions.push(sub);
  //   /** ** **** ** **** ** **** ** **** ** **** ** **/

  //   let auxSuperHeroeMatching2delete: ISuperheroe = {id: 0, type: TypesSuperheroes.SUPER_STRENGTH, alias: '1111111', name: 'LadyGaGa1', skills: 11, power: 1, email: '1@one.tw'};

  //   // sub = this.deleteSuperheroe(auxSuperHeroeMatching2delete).subscribe({
  //   //   next: (lstSuperheroe: ISuperheroe[]) => {
  //   //     console.log('deleteSuperheroe - next - listA after deletion:', lstSuperheroe);
  //   //   },
  //   //   error: (err) => {
  //   //     console.error('deleteSuperheroe() - error - err:', err);
  //   //   },
  //   //   complete: () => {
  //   //     console.log('deleteSuperheroe() - complete');
  //   //   }
  //   // });

  //   this._subscriptions.push(sub);

  //   // ************ /TEST *************************
  }
