import { Role } from "./role.model";

export class UserAccount{
  id: number;
  firstName:string;
  lastName: string;
  email: string;
  password : string;
  looked: boolean;
  passwordExpired: boolean;
  enabled: boolean;
  creationDate: Date;
  updateDate: Date;
  createdBy: string;
  accessToken:string
  tokenType: string;
  authorities: Array<Role>;
  _links:{
    self:{
      href:string;
      },
    roles:{
      href:string;
    },
    portfolio:{
      href:string;
    },
    userProfile:{
      href:string;
    }
  }

}
