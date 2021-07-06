import { Grading } from './../../../models/grading.model';
import { TopicalOutline } from './../../../models/topicaloutline.model';
import { CatalogueService } from './../../../services/catalogue.service';
import { AuthService } from './../../../services/auth.service';
import { Semester } from './../../../models/semester.model';
import { Syllabus } from './../../../models/syllabus.model';
import { UserAccount } from './../../../models/useraccount.model';
import { Course } from './../../../models/course.model';
import { MessageService, MenuItem, ConfirmationService } from 'primeng/api';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  newSyllabus: Syllabus = new Syllabus();

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

  maxCreditHours: number = 50;
  maxLectureHours: number = 48
  maxTutorialHours: number = 24;
  maxLabHours: number = 24;

  maxGrading = 100;

  @Input() selectedInstructor: UserAccount = new UserAccount();

  @Input() isAdmin: boolean = true;

  @Output() newSaveEvent = new EventEmitter();

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

  submitted: boolean = false;
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

    for (let index = 0; index < 8; index++) {
      this.tos.push({ weekNumber: this.tos.length + 1, chapter: '', lectureTopic: '' },)

    }

    this.gradings = [
      { item: 'Final exam', percentage: 50, disabled: true, max: 100 },
      { item: 'Midterm 2 (CC2)', percentage: 0, disabled: false, max: 50 },
      { item: 'Midterm 1 (CC1)', percentage: 0, disabled: false, max: 50 },
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
   * onUpdateMaxHours
   */
  public onUpdateMaxHours() {
    // console.log(e.value);
    if (this.newSyllabus.creditHours < (this.newSyllabus.tutorialHours + this.newSyllabus.labHours + this.newSyllabus.lectureHours)) {
      this.newSyllabus.tutorialHours = 0;
      this.newSyllabus.labHours = 0;
      this.newSyllabus.lectureHours = this.newSyllabus.creditHours;
    }
    this.maxLectureHours = this.newSyllabus.creditHours - (this.newSyllabus.tutorialHours + this.newSyllabus.labHours);
    this.maxTutorialHours = this.newSyllabus.creditHours - (this.newSyllabus.lectureHours + this.newSyllabus.labHours);
    this.maxLabHours = this.newSyllabus.creditHours - (this.newSyllabus.lectureHours + this.newSyllabus.tutorialHours);
    // console.log(this.maxLectureHours);
    // console.log(this.maxLabHours);
    // console.log(this.maxTutorialHours);

  }
  /* 
    public onUpdateMaxGradings() {
      for (let index = 0; index < this.gradings.length; index++) {
  
        if (index > 0) {
          let gp = this.gradings[index - 1];
          let g = this.gradings[index];
          console.log(g.max);
          if(this.maxGrading > 0 && this.maxGrading > gp.percentage){
            this.maxGrading = this.maxGrading  - gp.percentage; 
          }
          
        }
      }
  
    }
   */
  refreshSyllabusList() {
    this.newSaveEvent.emit('saved');
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
      percentage: 0, disabled: false, max: 50
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
    this.catService.getList('courses?size=500').subscribe(
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
    this.newSyllabus.topicalOutlines = this.tos.reverse();
    this.newSyllabus.gradings = this.gradings.reverse();
    this.newSyllabus.semesterNumber = this.selectedsemester.semesterNumber;
    this.newSyllabus.academicYear = this.selectedsemester.academicYear;
    this.newSyllabus.courseName = this.selectedCourse.courseName;
    this.newSyllabus.coordinatorEmail = this.selectedCourse.coordinatorEmail;
    this.getCoordinatorInfos(this.selectedCourse.coordinatorEmail);
    this.newSyllabus.instructorEmail = this.selectedInstructor.email;
    this.newSyllabus.instructorName = this.selectedInstructor.fullName;
    this.newSyllabus.school = "Ecole Supérieur d'Informatique et du Numérique.";
    this.newSyllabus.academicEthics = "The university has strict policy against cheating, and anybody caught cheating will be given an F in the course pending an investigation. I expect all my students to behave ethically, that is, no cheating and no plagiarism, or any other kind of fraud. I define plagiarism as presenting other people’s work (whether it is from your classmate, or your friend, or from a text book, or from a on-line source) as your own. Fraud includes making up the results for programming projects. You are advised to read the university academic policy against cheating in the undergraduate catalog.";

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
        this.refreshSyllabusList();
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

  public init(): void{
    this.newSyllabus.coRequisiteCourses = [];
    this.newSyllabus.preRequisiteCourses = [];
    this.newSyllabus.semesterNumber = null;
    this.newSyllabus.academicYear = null;
    this.newSyllabus.courseName = "";
    this.newSyllabus.coordinatorEmail = "";
    this.newSyllabus.instructorEmail = "";
    this.newSyllabus.instructorName ="";
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
      // console.log(tb.value.reference);
      
      let textBook = '' + tb.value.reference;
      if (textBook.trim() != '') {
        this.newSyllabus.textBooks.push(tb.value);
      }

    });

    // get CourseOutcomes
    // this.courseOutcomes.forEach((element) => {
    //   this.newSyllabus.courseOutcomes.push(element);
    // });
    this.newSyllabus.courseOutcomes = this.courseOutcomes.reverse();
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

  onNewSyllabusClick() {
    this.newSyllabus = new Syllabus();
    this.submitted = false;
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
        },
        (error) => {
          console.error(error);
        }
      );
  }

}
