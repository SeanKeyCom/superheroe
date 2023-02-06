import { TypesSuperheroes } from "src/app/shared/enums/typesSuperheroes.enum";

export interface ISuperheroe {
  id:         number;             //  Unique value as PrimaryKey
  type:       TypesSuperheroes;   //  Enum of types of SuperHeroes
  alias?:     string;
  name:       string;
  skills?:    number;             //  Amount of skills
  power?:     number;             //  From 0 to 100
  email?:     string;
}
