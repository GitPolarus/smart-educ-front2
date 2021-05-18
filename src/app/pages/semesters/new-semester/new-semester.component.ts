import { Table } from 'primeng/table';
import { CatalogueService } from './../../../services/catalogue.service';
import { AuthService } from './../../../services/auth.service';
import { Semester } from './../../../models/semester.model';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-semester',
  templateUrl: './new-semester.component.html',
  styleUrls: ['./new-semester.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class NewSemesterComponent implements OnInit {
  items: MenuItem[];
  selectedSemester: Semester;
  selectedSemesters: Semester[];
  newSemester: Semester;
  semesters: Semester[];
  loading = true;
  header = "New Semester";
  displayDialog = false;

  constructor(
    private authService: AuthService,
    private catService: CatalogueService,
    private msgService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.newSemester = new Semester();
    this.getSemesters();
    this.items = [
      { label: 'Detail', icon: 'pi pi-fw pi-search' },
      {
        label: 'Update',
        icon: 'pi pi-fw pi-pencil',
        command: () => this.editSemesterDialog(this.selectedSemester),
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-times',
        command: () => this.deleteSemester(this.selectedSemester),
      },
    ];
  }



  /**
   * getSemesters
   */
  public getSemesters(): void {
    this.catService.getList('semesters').subscribe(
      (data: any) => {
        this.semesters = data._embedded.semesters;
        this.loading = false;
        console.log(this.semesters);

      },
      (error) => {
        console.error(error);
      }
    );
  }

  /**
   * onSave
   */
  public onSave(): void {
    this.saveSemester();
  }

  /**
   * onCancel
   */
  public onCancel(): void {
    this.displayDialog = false;
  }

  /**
   * saveSemester
   */
  public saveSemester(): void {
    this.newSemester.createdBy = this.authService.getUser().email;
    this.newSemester.opened = true;

    this.catService.postResource('semesters', this.newSemester).subscribe(
      (data: any) => {
        this.getSemesters();

        this.msgService.add({
          key: 'toast',
          severity: 'success',
          summary: 'New Semester',
          detail: 'Semester Succefull created',
        });
      },
      (error) => {
        console.error(error);
        this.msgService.add({
          key: 'toast',
          severity: 'error',
          summary: 'New Semester',
          detail: error,
        });
      }
    );
  }

  editSemesterDialog(selectedSemester: Semester): void {
    throw new Error('Method not implemented.');
  }
  deleteSemester(selectedSemester: Semester): void {
    throw new Error('Method not implemented.');
  }

  /**
   * name
   */
  public deleteSelectedSemesters(): void {}

  /**
   * newSemesterDialog
   */
  public newSemesterDialog(): void {
    this.displayDialog = true;
  }

  clear(table: Table) {
    table.clear();
  }
}
