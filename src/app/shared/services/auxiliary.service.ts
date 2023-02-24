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
 }
