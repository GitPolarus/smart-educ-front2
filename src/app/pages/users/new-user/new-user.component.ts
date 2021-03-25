import { AuthService } from './../../../services/auth.service';
import { MessageService, MenuItem } from 'primeng/api';
import { SignUpRequest } from './../../../models/signup.model';
import { Role } from './../../../models/role.model';
import { CatalogueService } from './../../../services/catalogue.service';
import { UserAccount } from './../../../models/useraccount.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
  providers: [MessageService],
})
export class NewUserComponent implements OnInit {
  users: UserAccount[];
  selectedUsers: UserAccount[];
  selectedUser: UserAccount;
  newUser: SignUpRequest;
  loading = true;
  authorities: Role[];
  displayMaximizable: boolean;
  adminRole = false;
  coordinatorRole = false;
  instructorRole = false;
  sendEmail = false;
  display = false;
  items: MenuItem[];

  showDialog(): void {
    this.display = true;
  }

  constructor(
    private authService: AuthService,
    private catService: CatalogueService,
    private msgService: MessageService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.newUser = new SignUpRequest();

    this.items = [
      { label: 'Detail', icon: 'pi pi-fw pi-search' },
      { label: 'Update', icon: 'pi pi-fw pi-pencil',
      command: () => this.updateUser(this.selectedUser),
     },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-times',
        command: () => this.deleteUser(this.selectedUser),
      },
    ];
  }

  deleteUser(user: UserAccount): void {
    this.selectedUser = user;
    console.log(this.selectedUser._links.self.href);
    this.catService.delete(this.selectedUser._links.self.href).subscribe(
      (data: any) => {
        this.getUsers();
        // this.selectedUser = null;
        this.displayMaximizable = false;
        this.msgService.add({
          severity: 'Delete User',
          summary: 'New User',
          detail: 'User Succefull deleted',
        });
      },
      (err) => {
        console.error(err);
        this.msgService.add({
          key: 'signup',
          severity: 'error',
          summary: 'New User',
          detail: err.message,
        });
      }
    );
  }

  updateUser(user: any): void {
    this.newUser = user;
    this.showMaximizableDialog();
  }

  public onSubmit(): void {
    if (this.adminRole) {
      this.newUser.roles.push('admin');
    }
    if (this.coordinatorRole) {
      this.newUser.roles.push('coord');
    }
    if (this.instructorRole) {
      this.newUser.roles.push('inst');
    }
    if (this.sendEmail) {
      this.newUser.sendEmail = true;
    }

    this.newUser.createdBy = this.authService.getUser().email;
    // console.log(this.newUser);

    this.catService.postResource('auth/signup', this.newUser).subscribe(
      (data: any) => {
        console.log(data);
        this.getUsers();
        this.newUser = new SignUpRequest();
        this.displayMaximizable = false;
        this.msgService.add({
          key: 'signup',
          severity: 'success',
          summary: 'New User',
          detail: 'User Succefull created',
        });
      },
      (err) => {
        console.error(err);
        this.msgService.add({
          key: 'signup',
          severity: 'error',
          summary: 'New User',
          detail: err.message,
        });
      }
    );
  }

  public getUsers(): void {
    this.catService.getList('users').subscribe(
      (data: any) => {
        this.users = data._embedded.users;
        this.loading = false;
        console.log(this.users);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  public clear(): void {}

  showModalDialog(): void {
    this.display = true;
  }

  showMaximizableDialog(): void {
    this.displayMaximizable = true;
  }
}
