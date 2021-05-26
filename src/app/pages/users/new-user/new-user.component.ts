import { Table } from 'primeng/table';
import { AuthService } from './../../../services/auth.service';
import { MessageService, MenuItem, ConfirmationService } from 'primeng/api';
import { SignUpRequest } from './../../../models/signup.model';
import { Role } from './../../../models/role.model';
import { CatalogueService } from './../../../services/catalogue.service';
import { UserAccount } from './../../../models/useraccount.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
  providers: [MessageService, ConfirmationService],
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
  sendEmail: boolean = false;
  submitted = false;
  display = false;
  items: MenuItem[];
  update = false;
  header: string;
  exportColumns: any[];

  showDialog(): void {
    this.display = true;
  }

  constructor(
    private authService: AuthService,
    private catService: CatalogueService,
    private msgService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.newUser = new SignUpRequest();

    this.items = [
      { label: 'Detail', icon: 'pi pi-fw pi-search' },
      {
        label: 'Update',
        icon: 'pi pi-fw pi-pencil',
        command: () => this.editUser(this.selectedUser),
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-times',
        command: () => this.deleteUser(this.selectedUser),
      },
    ];
  }

  deleteUser(user: any): void {
    this.selectedUser = user;

    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete ' +
        this.selectedUser.lastName +
        ' ' +
        this.selectedUser.firstName +
        '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(this.selectedUser._links.self.href);
        this.catService
          .deleteByUrl(this.selectedUser._links.self.href)
          .subscribe(
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
      },
    });
  }

  deleteSelectedUsers(): void {}

  editUser(user: any): void {
    this.update = true;
    this.newUser = new SignUpRequest();
    this.newUser.email = user.email;
    this.newUser.createdBy = this.authService.getUser().email;
    this.newUser.firstName = user.firstName;
    this.newUser.lastName = user.lastName;
    this.header = 'Update User ' + this.newUser.email;
    this.displayMaximizable = true;
    // this.showModalDialog();
  }

  updateUser(): void {
    this.newUser.createdBy = this.authService.getUser().email;
    console.log(this.newUser);
    this.catService.postResource('auth/update', this.newUser).subscribe(
      (data: any) => {
        console.log(data);
        this.getUsers();
        this.newUser = new SignUpRequest();
        this.displayMaximizable = false;
        this.msgService.add({
          key: 'signup',
          severity: 'success',
          summary: 'Update User',
          detail: 'User Succefull Updated',
        });
      },
      (err) => {
        console.error(err);
        this.msgService.add({
          key: 'signup',
          severity: 'error',
          summary: 'Update User',
          detail: err.message,
        });
      }
    );
  }

  onSave(): void {
    console.log(this.update);

    if (this.update == true) {
      this.updateUser();
    } else {
      this.saveUser();
    }
  }
  public saveUser(): void {
    this.newUser.roles = [];
    this.submitted = true;
    if (this.adminRole) {
      this.newUser.roles.push('admin');
    }
    if (this.coordinatorRole) {
      this.newUser.roles.push('coord');
    }
    if (this.instructorRole) {
      this.newUser.roles.push('inst');
    }

    this.newUser.sendEmail = this.sendEmail;

    this.newUser.createdBy = this.authService.getUser().email;
    console.log(this.newUser);

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
    this.catService.getList('users?size=500').subscribe(
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

  showModalDialog(): void {
    this.header = 'New User';
    this.update = false;
    this.displayMaximizable = true;
  }
  hideDialog(): void {
    this.displayMaximizable = false;
    this.newUser = new SignUpRequest();
    this.adminRole = false;
    this.coordinatorRole = false;
    this.instructorRole = false;
    this.sendEmail = false;
    this.submitted = false;
  }

  exportPdf() {
    // const doc = new jsPDF();
    // // doc.autoTable(this.exportColumns, this.users);
    // // doc.autoTable(this.exportColumns, this.users);
    // doc.save('users.pdf');
  }

  /*  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.users);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'products');
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then((FileSaver) => {
      let EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      FileSaver.saveAs(
        data,
        fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  } */

  clear(table: Table) {
    table.clear();
  }
}
