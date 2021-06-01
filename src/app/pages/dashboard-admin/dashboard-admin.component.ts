import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CourseOutcome } from 'src/app/models/courseoutcome.model';
import { Semester } from 'src/app/models/semester.model';
import { Syllabus } from 'src/app/models/syllabus.model';
import { CatalogueService } from 'src/app/services/catalogue.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {
  data: any;
  syllabi: any = [];
  courseOutcomes: any[] = [];
  semesters: Semester[];
  selectedSemester: Semester;
  so1Tab: Array<number> = [0, 0, 0];
  so2Tab: Array<number> = [0, 0, 0];
  so3Tab: Array<number> = [0, 0, 0];
  so4Tab: Array<number> = [0, 0, 0];
  so5Tab: Array<number> = [0, 0, 0];
  so6Tab: Array<number> = [0, 0, 0];
  so7Tab: Array<number> = [0, 0, 0];


  chartOptions: any;

  subscription: Subscription;

  countNumbers: any = [];
  constructor(private catService: CatalogueService,
    private route: Router) { }

  ngOnInit() {
    this.getCountNumbers();

    this.getSyllabi();
    this.getSemesters();

  }

  public getSemesters(): void {
    this.catService.getList('semesters').subscribe(
      (data: any) => {
        this.semesters = data._embedded.semesters;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /**
   * onDropdownItemChange
   *  */
  public onDropdownItemChange(event: any): void {
    // console.log(event);
    if (event.value == null) {
      this.getSyllabi();
    } else {
      this.getSyllabiByYearAndSemester(
        event.value.semesterNumber,
        event.value.academicYear
      );
    }
  }

  public getCountNumbers(): void {
    this.catService.getList('all/countData').subscribe(
      (data: any) => {
        this.countNumbers = data;
        // console.log(countNumbers);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /**
   * navigateTo
   */
  public navigateTo(url: string): void {
    this.route.navigate([url])
  }


  public fillArray(array, so) {
    // let tmpTab:Array<number> = [0,0,0] ;
    // console.log('fill array called so' + so);

    switch (so) {
      case "I": array[0] = (array[0] + 1);
        break;
      case "R": array[1] = (array[1] + 1);
        break;
      case "E": array[2] = (array[2] + 1);
    }
  }

  public getSyllabiByYearAndSemester(s, y): void {
    this.catService
      .getList(
        'syllabi/search/findByAcademicYearAndSemesterNumber?academicYear=' +
        y +
        '&semesterNumber=' +
        s +
        '&sort=courseName&size=500&projection=mapping'
      )
      .subscribe(
        (data: any) => {
          this.syllabi = data._embedded.syllabi;
          // console.log(this.syllabi);
          this.getCourseOutcomes();

          this.buildGraph();
        },
        (error) => {
          console.error(error);
        }
      );
  }

  public getSyllabi(): void {
    this.catService
      .getList('syllabi?sort=courseName&&size=500&projection=mapping')
      .subscribe(
        (data: any) => {
          this.syllabi = data._embedded.syllabi;
          // console.log(this.syllabi);
          this.getCourseOutcomes();
          this.buildGraph();
        },
        (error) => {
          console.error(error);
        }
      );
  }

  /**
   * getCourseOUtcomes
   */
  public getCourseOutcomes() {
    this.courseOutcomes = [];
    this.syllabi.forEach(element => {
      element.courseOutcomes.forEach(cos => {
        this.courseOutcomes.push({ 
          "so1": cos.so1, 
        "so2": cos.so2,
        "so3": cos.so3,
        "so4": cos.so4,
        "so5": cos.so5,
        "so6": cos.so6,
        "so7": cos.so7,
       });
      });
    });
    // console.log(this.courseOutcomes);

  }

  public buildGraph() {
    for (let i = 0; i < this.courseOutcomes.length; i++) {
      this.fillArray(this.so1Tab, this.courseOutcomes[i].so1)
      this.fillArray(this.so2Tab, this.courseOutcomes[i].so2)
      this.fillArray(this.so3Tab, this.courseOutcomes[i].so3)
      this.fillArray(this.so4Tab, this.courseOutcomes[i].so4)
      this.fillArray(this.so5Tab, this.courseOutcomes[i].so5)
      this.fillArray(this.so6Tab, this.courseOutcomes[i].so6)
      this.fillArray(this.so7Tab, this.courseOutcomes[i].so7)
    }
    /* 
    console.log(this.so1Tab)
    console.log(this.so2Tab)
    console.log(this.so3Tab)
    console.log(this.so4Tab) */


    this.data = {
      labels: ['SO1', 'SO2', 'SO3', 'SO4', 'SO5', 'SO6', 'SO7'],
      datasets: [{
        type: 'bar',
        label: 'Introduce(I)',
        // borderColor: '#42A5F5',
        backgroundColor: '#42A5F5',
        // borderWidth: 2,
        // fill: false,
        data: [this.so1Tab[0], this.so2Tab[0], this.so3Tab[0], this.so4Tab[0], this.so5Tab[0], this.so6Tab[0], this.so7Tab[0]]
      }, {
        type: 'bar',
        label: 'Reinforce (R)',
        backgroundColor: '#66BB6A',
        data: [this.so1Tab[1], this.so2Tab[1], this.so3Tab[1], this.so4Tab[1], this.so5Tab[1], this.so6Tab[1], this.so7Tab[1]],
        // borderColor: 'white',
        // borderWidth: 2
      }, {
        type: 'bar',
        label: 'Emphasize (E)',
        backgroundColor: '#FFA726',
        data: [this.so1Tab[2], this.so2Tab[2], this.so3Tab[2], this.so4Tab[2], this.so5Tab[2], this.so6Tab[2], this.so7Tab[2]]
      }]
    };

    this.chartOptions = {
      responsive: true,
      title: {
        display: true,
        text: 'Mapping Course Outcomes and Student Outcomes'
      },
      tooltips: {
        mode: 'index',
        intersect: true
      }
    };
  }
}
