import { Grading } from './../../../models/grading.model';
import { TopicalOutline } from './../../../models/topicaloutline.model';
import { CatalogueService } from './../../../services/catalogue.service';
import { AuthService } from './../../../services/auth.service';
import { Semester } from './../../../models/semester.model';
import { Syllabus } from './../../../models/syllabus.model';
import { UserAccount } from './../../../models/useraccount.model';
import { Course } from './../../../models/course.model';
import { MessageService, MenuItem, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { saveAs } from 'file-saver';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as FileSaver from 'file-saver';
import * as fileSaver from 'file-saver';

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

  fileUploaded = false;

  courses: Course[];

  syllabi: Syllabus[];

  selectedCourse: Course;

  selectedPreRequisiteCourses: Course[] = [];

  selectedCoRequisiteCourses: Course[] = [];

  users: UserAccount[];

  semesters: Semester[];

  selectedsemester: Semester = new Semester();

  loading = true;

  items: MenuItem[];

  file: any;

  autoResize = true;

  tos: any[] = [];
  gradings: any[] = [];
  selectedInstructor: UserAccount = new UserAccount();

  poids = [
    { label: 'None', value: '' },
    { label: 'I', value: 'I' },
    { label: 'R', value: 'R' },
    { label: 'E', value: 'E' },
  ];
  courseOutcomes: any[] = [];

  tbForm: FormGroup;

  formArray: FormArray;

  subscription: Subscription;
  filteredCourses: Course[];
  filteredUsers: UserAccount[];

  submitted = false;
  submittedSyllabus: Syllabus = new Syllabus();
  constructor(
    private authService: AuthService,
    private catService: CatalogueService,
    private msgService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
  ) {
    this.tbForm = this.fb.group({});
    this.formArray = this.fb.array([]);
    this.tos = [
      { weekNumber: this.tos.length + 1, chapter: '', lectureTopic: '' },
    ];
    this.gradings = [
      { item: 'Final exam 1', percentage: 50 },
      { item: 'Midterm 1 (CC1)', percentage: 0 },
      { item: 'Midterm 2 (CC2)', percentage: 0 },
    ];

    this.courseOutcomes = [
      {
        index: 'CO' + (this.courseOutcomes.length + 1),
        co: '',
        so1: '',
        so2: '',
        so3: '',
        so4: '',
        so5: '',
        so6: '',
        so7: '',
      },
    ];
  }

  ngOnInit(): void {
    this.getOpenedSemesters();
    this.getCourses();
    this.getUsers();
    this.newSyllabus = new Syllabus();
    this.tbForm.addControl('tb', this.formArray);
    this.formArray.push(this.addFormControl());
  }

  /**
   * onUpload File
   */
  public onUpload(event): void {
    this.fileUploaded = true;
    this.file = event.files[0];
    this.newSyllabus.syllabusFileName = event.files[0].name;
  }

  /**
   * onProgress
   */
  public onProgress(event): void {
    console.log(event);
  }

  addFormControl(): any {
    return this.fb.group({ reference: '' });
  }

  onAddTopicalOutline(): any {
    return this.tos.push({
      weekNumber: this.tos.length + 1,
      chapter: '',
      lectureTopic: '',
    });
  }

  onRemoveTopicalOutline(): void {
    if (this.tos.length > 1) {
      this.tos.pop();
    }
  }

  onAddGrading(): any {
    return this.gradings.push({
      item: '',
      percentage: 0,
    });
  }

  onRemoveGrading(): void {
    if (this.gradings.length > 1) {
      this.gradings.pop();
    }
  }

  onAddCourseOutcomes(): any {
    return this.courseOutcomes.push({
      index: 'CO' + (this.courseOutcomes.length + 1),
      co: '',
      so1: '',
      so2: '',
      so3: '',
      so4: '',
      so5: '',
      so6: '',
      so7: '',
    });
  }

  onRemoveCourseOutcomes(): void {
    if (this.courseOutcomes.length > 1) {
      this.courseOutcomes.pop();
    }
  }

  onAddFormControl(): void {
    this.formArray.push(this.addFormControl());
  }

  // onAddTOFormControl() {
  //   this.TOFormArray.push(this.addTOFormControl());
  // }

  onRemoveFormControl(): void {
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
        console.log(this.courses);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /**
   * get Opened semesters
   */
  public getOpenedSemesters(): void {
    this.catService.getList('semesters/search/findByOpened').subscribe(
      (data: any) => {
        this.semesters = data._embedded.semesters;
        // console.log(this.semesters);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /**
   * getSyllabi
   */
  public getSyllabi(): void {
    this.catService.getList('syllabi').subscribe(
      (data: any) => {
        this.syllabi = data._embedded.syllabi;
        // console.log(this.semesters);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // get user list
  public getUsers(): void {
    this.catService.getList('users?projection=forList').subscribe(
      (data: any) => {
        this.users = data._embedded.users;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  filterCourse(event: any): void {
    const filtered: Course[] = [];
    const query = event.query;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.courses.length; i++) {
      const course = this.courses[i];
      if (course.courseName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(course);
      }
    }

    this.filteredCourses = filtered;
    console.log(this.filteredCourses);
  }

  filterUser(event: any): void {
    const filtered: UserAccount[] = [];
    const query = event.query;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.users.length; i++) {
      const inst = this.users[i];
      if (inst.fullName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(inst);
      }
    }
    this.filteredUsers = filtered;
    console.log(this.filteredUsers);
  }

  /**
   * onSave
   */
  public onSave(): void {
    this.getArraysElements();
    this.newSyllabus.topicalOutlines = this.tos;
    this.newSyllabus.gradings = this.gradings;
    this.newSyllabus.semesterNumber = this.selectedsemester.semesterNumber;
    this.newSyllabus.academicYear = this.selectedsemester.academicYear;
    this.newSyllabus.courseName = this.selectedCourse.courseName;
    this.newSyllabus.coordinatorEmail = this.selectedCourse.coordinatorEmail;
    this.getCoordinatorInfos(this.selectedCourse.coordinatorEmail);
    this.newSyllabus.instructorEmail = this.selectedInstructor.email;
    this.newSyllabus.instructorName = this.selectedInstructor.fullName;

    console.log(this.newSyllabus);

    this.catService.postResource('syllabi/new', this.newSyllabus).subscribe(
      (data: any) => {
        console.log(data);
        this.msgService.add({
          key: 'message',
          severity: 'success',
          summary: 'New Syllabus',
          detail: 'Syllabus Succefull created',
        });
        this.submitted = true;
        this.submittedSyllabus = data;
        this.getSyllabi();
      },
      (err) => {
        console.error(err);
        this.msgService.add({
          key: 'message',
          severity: 'error',
          summary: 'New Syllabus',
          detail: err.message,
        });
      }
    );
  }

  /**
   * getArraysElements
   */
  public getArraysElements(): void {
    // set array empty every time
    this.newSyllabus.coRequisiteCourses = [];
    this.newSyllabus.preRequisiteCourses = [];
    this.newSyllabus.textBooks = [];

    // get selected CoRequisite Courses
    this.selectedCoRequisiteCourses.forEach((coReq) => {
      this.newSyllabus.coRequisiteCourses.push(coReq.courseName);
    });

    // get selected PreRequisite Courses
    this.selectedPreRequisiteCourses.forEach((preReq) => {
      this.newSyllabus.preRequisiteCourses.push(preReq.courseName);
    });

    // get text books
    this.formArray.controls.forEach((tb) => {
      this.newSyllabus.textBooks.push(tb.value);
    });

    // get CourseOutcomes
    this.courseOutcomes.forEach((element) => {
      this.newSyllabus.courseOutcomes.push(element);
    });
  }

  /**
   * getCoordinatorInfos
   */
  public getCoordinatorInfos(e: string): void {
    this.users.forEach((coord) => {
      if (coord.email == e) {
        this.newSyllabus.coordinatorFirstName = coord.firstName;
        this.newSyllabus.coordinatorLastName = coord.lastName;
      }
    });
  }

  /**
   * onDownloadFile()
   */
  public onDownloadFile(): void {
    this.catService
      .getList('filestorage/files/' + this.submittedSyllabus.syllabusFileName)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.saveFile(data,this.submittedSyllabus.syllabusFileName)
        },
        (error) => {
          console.error(error);
        }
      );
  }

  saveFile(data: any, filename?: string) {
    const blob = new Blob([data], {type: 'pdf; charset=utf-8'});
    fileSaver.saveAs(blob, filename);
  }
}
