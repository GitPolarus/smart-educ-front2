export class SignUpRequest {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  sendEmail: boolean;
  password: string;
  looked: boolean;
  passwordExpired: boolean;
  enabled: boolean;
  creationDate: Date;
  updateDate: Date;
  createdBy: string;
  accessToken: string;
  token: string;
  tokenType: string;
  roles: Array<string> = new Array();
}
