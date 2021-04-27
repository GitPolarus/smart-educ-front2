import { CatalogueService } from './../../../services/catalogue.service';
import { AuthService } from './../../../services/auth.service';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { Syllabus } from './../../../models/syllabus.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-syllabi',
  templateUrl: './manage-syllabi.component.html',
  styleUrls: ['./manage-syllabi.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ManageSyllabiComponent implements OnInit {
  items: MenuItem[];
  syllabi: Syllabus[];
  selectedSyllabi: Syllabus[];
  selectedSyllabus: Syllabus;
  newSyllabus: Syllabus;
  instructors: string;
  loading = true;

  constructor(
    private authService: AuthService,
    private catService: CatalogueService,
    private msgService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getSyllabi();
  }

  /**
   * newSyllabusDialog
   */
  public newSyllabusDialog(): void {}

  /**
   * deleteSelectedSyllabi
   * */

  public deleteSelectedSyllabi(): void {}

  /**
   * getSyllabi
   * */

  public getSyllabi(): void {
    this.catService.getList('syllabi').subscribe(
      (data: any) => {
        this.syllabi = data._embedded.syllabi;
        // console.log(this.syllabi);
        this.loading = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public editSyllabus(syllabus): void{

  }
}
