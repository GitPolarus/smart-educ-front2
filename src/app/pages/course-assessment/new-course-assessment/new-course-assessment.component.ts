import { Component, OnInit } from '@angular/core';
import { CourseOutcome } from 'src/app/models/courseoutcome.model';
import { Syllabus } from 'src/app/models/syllabus.model';
import { UserAccount } from 'src/app/models/useraccount.model';
import { AuthService } from 'src/app/services/auth.service';
import { CatalogueService } from 'src/app/services/catalogue.service';

@Component({
  selector: 'app-new-course-assessment',
  templateUrl: './new-course-assessment.component.html',
  styleUrls: ['./new-course-assessment.component.scss']
})
export class NewCourseAssessmentComponent implements OnInit {
  syllabi: Syllabus[] = [];
  selectedSyllabi: Syllabus[];
  selectedSyllabus: Syllabus = null;
  newSyllabus: Syllabus;
  instructors: string;
  loading = true;
  displayDialog = false;
  syllabusIsMine: boolean = false;
  user: UserAccount = new UserAccount();
  courseOutcomes: CourseOutcome[] = [];
  constructor(private authService: AuthService,
    private catService: CatalogueService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.getSyllabiByProfName();
  }

  /**
   * getSyllabi
   * */

  public getSyllabiByProfName(): void {
    this.catService.getList('syllabi/search/findByInstructorName?instructorName=' + this.user.fullName).subscribe(
      (data: any) => {
        this.syllabi = data._embedded.syllabi;
        // console.log(this.syllabi);
        this.syllabusIsMine = true;
        this.loading = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onClikItem(e) {
    // console.log(this.selectedSyllabus);
    if (e != null) {
      console.log(e._links.courseOutcomes.href);
      this.getCourseOutcomes(e._links.courseOutcomes.href);
    } else {
      this.courseOutcomes = [];
    }


  }

  public getCourseOutcomes(href): void {
    this.catService.getResource(href).subscribe(
      (data: any) => {
        this.courseOutcomes = data._embedded.courseOutcomes;
        // console.log(this.syllabi);
        this.syllabusIsMine = true;
        this.loading = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public onSave() {
    this.courseOutcomes.forEach(element => {
      this.catService.update(element._links.self.href, element).subscribe(
        (data: any) => {
          // console.log(data);
        },
        (error) => {
          console.error(error);
        }
      );
    });

  }

}
