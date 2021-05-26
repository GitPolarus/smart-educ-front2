import { CourseOutcome } from './../../../models/courseoutcome.model';
import { Syllabus } from './../../../models/syllabus.model';
import { CatalogueService } from './../../../services/catalogue.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-Syllabus-details',
  templateUrl: './Syllabus-details.component.html',
  styleUrls: ['./Syllabus-details.component.scss'],
})
export class SyllabusDetailsComponent implements OnInit {
  href: string;
  syllabus: Syllabus = new Syllabus();
  courseOutcomes: CourseOutcome[];
  constructor(
    private route: ActivatedRoute,
    private catService: CatalogueService
  ) {}

  ngOnInit(): void {
    this.href = atob(this.route.snapshot.paramMap.get('href'));
    this.getSyllabus(this.href);
  }

  /**
   * getSyllabus
href
  */
  public getSyllabus(href): void {
    this.catService.getResource(href).subscribe(
      (data: any) => {
        this.syllabus = data;
        console.log(data);
        this.getSyllabusCourseOutcomes(this.syllabus);
        // this.loading = false;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  public getSyllabusCourseOutcomes(syllabus: Syllabus): void {
    this.catService.getResource(syllabus._links.courseOutcomes.href).subscribe(
      (data: any) => {
        this.courseOutcomes = data._embedded.courseOutcomes;
        console.log(data);

        // this.loading = false;
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
