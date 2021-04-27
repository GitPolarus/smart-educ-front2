import { CatalogueService } from './../../../services/catalogue.service';
import { AuthService } from './../../../services/auth.service';
import { Semester } from './../../../models/semester.model';
import { Syllabus } from './../../../models/syllabus.model';
import { UserAccount } from './../../../models/useraccount.model';
import { Course } from './../../../models/course.model';
import { MessageService, MenuItem, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

class DropdownCourse {
  name: string;
}

@Component({
  selector: 'app-new-syllabus',
  templateUrl: './new-syllabus.component.html',
  styleUrls: ['./new-syllabus.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class NewSyllabusComponent implements OnInit {
  newSyllabus: Syllabus;

  courses: Course[];

  selectedCourse: Course;

  preRequisiteselectedCourses: Course[];

  coRequisiteselectedCourses: Course[];

  users: UserAccount[];

  semesters: Semester[];

  loading = true;

  items: MenuItem[];

  autoResize = true;

  textBooks: string[];

  tbForm: FormGroup;
  toForm: FormGroup;
  grForm: FormGroup;
  coForm: FormGroup;

  formArray: FormArray;
  TOFormArray: FormArray;
  grFormArray: FormArray;
  coFormArray: FormArray;

  subscription: Subscription;
  filteredCourses: Course[];

  constructor(
    private authService: AuthService,
    private catService: CatalogueService,
    private msgService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) {
    this.tbForm = this.fb.group({});
    this.toForm = this.fb.group({});
    this.formArray = this.fb.array([]);
    this.TOFormArray = this.fb.array([]);
  }

  ngOnInit(): void {
    this.getCourses();
    this.getUsers();
    this.textBooks = ['debut', 'milieu', 'test'];
    this.newSyllabus = new Syllabus();
    this.tbForm.addControl('tb', this.formArray);
    this.toForm.addControl('to', this.TOFormArray);
    this.formArray.push(this.addFormControl());
    this.TOFormArray.push(this.addTOFormControl());
  }

  addFormControl() {
    return this.fb.group({ textBook: '' });
  }

  addTOFormControl() {
    return this.fb.group({ week: '', chapter: '', lectureTopic: '' });
  }

  onAddFormControl() {
    this.formArray.push(this.addFormControl());
  }

  onAddTOFormControl() {
    this.TOFormArray.push(this.addTOFormControl());
  }

  onRemoveFormControl() {
    if (this.formArray.controls.length > 1) {
      this.formArray.controls.pop();
    }
  }

  onRemoveTOFormControl() {
    if (this.formArray.controls.length > 1) {
      this.formArray.controls.pop();
    }
  }

  /**
   * getCourses
   */
  public getCourses(): void {
    this.catService.getList('courses').subscribe(
      (data: any) => {
        this.courses = data._embedded.courses;
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
        this.users = data._embedded.users;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  filterCourse(event: any) {
    let filtered: Course[] = [];
    let query = event.query;
    for (let i = 0; i < this.courses.length; i++) {
      let course = this.courses[i];
      if (course.courseName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(course);
      }
    }

    this.filteredCourses = filtered;
    console.log(this.filteredCourses);
  }
}
