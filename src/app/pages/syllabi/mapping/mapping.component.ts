import { Semester } from './../../../models/semester.model';
import { Syllabus } from './../../../models/syllabus.model';
import { FileSaverService } from 'ngx-filesaver';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CatalogueService } from './../../../services/catalogue.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  providers: [MessageService, ConfirmationService],
})
export class MappingComponent implements OnInit {
  syllabi: Syllabus[];
  semesters: Semester[];
  selectedSemester: Semester;
  loading: boolean;
  rowGroupMetadata: any;
  mappingData: Array<any>;

  constructor(
    private authService: AuthService,
    private catService: CatalogueService,
    private msgService: MessageService,
    private confirmationService: ConfirmationService,
    private fileSaverService: FileSaverService
  ) {}

  ngOnInit(): void {
    this.getSyllabi();
    this.getSemesters();
  }

  /**
   * onDropdownItemChange
   *  */
  public onDropdownItemChange(event: any): void {
    console.log(event);
    if (event.value == null) {
      this.getSyllabi();
    } else {
      this.getSyllabiByYearAndSemester(
        event.value.semesterNumber,
        event.value.academicYear
      );
    }
  }

  public getSyllabi(): void {
    this.catService
      .getList('syllabi?sort=courseName&&size=500&projection=mapping')
      .subscribe(
        (data: any) => {
          this.syllabi = data._embedded.syllabi;
          console.log(this.syllabi);
          this.loading = false;
          this.getCourseOutcomes();
        },
        (error) => {
          console.error(error);
        }
      );
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
          console.log(this.syllabi);
          this.loading = false;
          this.getCourseOutcomes();
        },
        (error) => {
          console.error(error);
        }
      );
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

  updateRowGroupMetaData(): void {
    this.rowGroupMetadata = {};

    if (this.mappingData) {
      for (let i = 0; i < this.mappingData.length; i++) {
        let rowData = this.mappingData[i];
        let representativeName = rowData.courseName;

        if (i == 0) {
          this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
        } else {
          let previousRowData = this.mappingData[i - 1];
          let previousRowGroup = previousRowData.courseName;
          if (representativeName === previousRowGroup)
            this.rowGroupMetadata[representativeName].size++;
          else
            this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
        }
      }
    }
  }

  /**
   * getCourseOutcomes
   */
  public getCourseOutcomes(): void {
    this.mappingData = [];
    this.syllabi.forEach((s) => {
      s.courseOutcomes.forEach((co) => {
        this.mappingData.push({
          courseName: s.courseName,
          semesterNumber: s.semesterNumber,
          academicYear: s.academicYear,
          so1: co.so1,
          so2: co.so2,
          so3: co.so3,
          so4: co.so4,
          so5: co.so5,
          so6: co.so6,
        });
      });
    });
    this.updateRowGroupMetaData();
    console.log(this.rowGroupMetadata);

    console.log(this.mappingData);
  }
}
