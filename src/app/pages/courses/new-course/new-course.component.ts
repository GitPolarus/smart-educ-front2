import { UserAccount } from './../../../models/useraccount.model';
import { AuthService } from './../../../services/auth.service';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import { CatalogueService } from './../../../services/catalogue.service';
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';

interface FO {
  name: string;
}

class User {
  name: string;
  email: string;
  public constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}


@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class NewCourseComponent implements OnInit {
  courses: Course[];
  selectedCourses: Course[];
  selectedCourse: Course;
  newCourse: Course;
  loading = true;
  displayDialog: boolean;
  submitted = false;
  displayFOptions = false;
  update = false;
  header: string;
  items: MenuItem[];
  exportColumns: any[];
  facultyOptions: FO[];
  selectedOption: FO;
  users: UserAccount[];
  selectedUser: User;

  constructor(
    private authService: AuthService,
    private catService: CatalogueService,
    private msgService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.facultyOptions = [
      { name: 'information System Engineering' },
      { name: 'Information System Security' },
      { name: 'Big Data' },
    ];

  }

  ngOnInit(): void {
    this.getCourses();
    this.newCourse = new Course();
    this.users = [];
    this.items = [
      { label: 'Detail', icon: 'pi pi-fw pi-search' },
      {
        label: 'Update',
        icon: 'pi pi-fw pi-pencil',
        command: () => this.editCourseDialog(this.selectedCourse),
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-times',
        command: () => this.deleteCourse(this.selectedCourse),
      },
    ];
  }
  editCourseDialog(selectedCourse: any): void {}

  /**
   * getCourses
   */
  public getCourses(): void {
    this.catService.getList('courses').subscribe(
      (data: any) => {
        this.courses = data._embedded.courses;
        this.loading = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // get user list
  public getUsers(): void {
    this.catService.getList('users').subscribe(
      (data: any) => {
        // console.log(data);
        this.users = data._embedded.users;
        /* for (let index = 0; index < data._embedded.users.length; index++) {
          this.users.push(
            new User(
              data._embedded.users[index].firstName +
                ' ' +
                data._embedded.users[index].lastName,
              data._embedded.users[index].email
            )
          );
        } */
      },
      (err) => {
        console.error(err);
      }
    );
  }

  /**
   * onSave
   */
  public onSave(): void {
    this.saveCourse();
  }

  /**
   * onCancel
   */
  public onCancel(): void {
    this.displayDialog = false;
  }

  /**
   * saveCourse
   */
  public saveCourse(): void {
    this.newCourse.createdBy = this.authService.getUser().email;
    if (this.selectedOption != null) {
      this.newCourse.facultyOption = this.selectedOption.name;
    }

    // console.log(this.selectedUser);

    this.newCourse.coordinatorEmail = this.selectedUser.email;
    this.newCourse.opened = false;
    // console.log(this.newCourse);
    this.catService.postResource('courses/new', this.newCourse).subscribe(
      (data: any) => {
        this.getCourses();

        this.msgService.add({
          key: 'toast',
          severity: 'success',
          summary: 'New Course',
          detail: 'Course Succefull created',
        });
      },
      (error) => {
        console.error(error);
        this.msgService.add({
          key: 'toast',
          severity: 'error',
          summary: 'New Course',
          detail: error,
        });
      }
    );
  }

  /**
   * updateCourse
 : void  */
  public updateCourse(): void {}

  /**
   * deleteCourse
   */
  public deleteCourse(course: Course): void {
    this.selectedCourse = course;

    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete ' +
        this.selectedCourse.courseName +
        '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(this.selectedCourse._links.self.href);
        this.catService
          .deleteByUrl(this.selectedCourse._links.self.href)
          .subscribe(
            (data: any) => {
              this.getCourses();
              // this.selectedCourse = null;
              this.displayDialog = false;
              this.msgService.add({
                severity: 'Delete Course',
                summary: 'New Course',
                detail: 'Course Succefull deleted',
              });
            },
            (err) => {
              console.error(err);
              this.msgService.add({
                key: 'signup',
                severity: 'error',
                summary: 'New Course',
                detail: err.message,
              });
            }
          );
      },
    });
  }

  public deleteSelectedCourses(): void {}

  /**
   * showDialog
   */
  public newCourseDialog(): void {
    this.header = 'New Course';
    this.getUsers();
    this.displayDialog = true;
  }

  /**
   * name
   */
  public onValueChange(sn: any): void {
    console.log(sn);

    if (sn > 6) {
      this.displayFOptions = true;
    } else {
      this.displayFOptions = false;
    }
  }
}
