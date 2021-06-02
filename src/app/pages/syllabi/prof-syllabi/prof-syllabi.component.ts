import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Syllabus } from 'src/app/models/syllabus.model';
import { UserAccount } from 'src/app/models/useraccount.model';
import { AuthService } from 'src/app/services/auth.service';
import { CatalogueService } from 'src/app/services/catalogue.service';

@Component({
  selector: 'app-prof-syllabi',
  templateUrl: './prof-syllabi.component.html',
  styleUrls: ['./prof-syllabi.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ProfSyllabiComponent implements OnInit {
  items: MenuItem[];
  syllabi: Syllabus[];
  selectedSyllabi: Syllabus[];
  selectedSyllabus: Syllabus;
  newSyllabus: Syllabus;
  instructors: string;
  loading = true;
  displayDialog = false;
  syllabusIsMine: boolean = false;
  user: UserAccount = new UserAccount();
  constructor( private authService: AuthService,
    private catService: CatalogueService,
    private msgService: MessageService,
    private confirmationService: ConfirmationService,) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.getSyllabiByProfName();
  }

   /**
   * newSyllabusDialog
   */
    public newSyllabusDialog(): void {
      this.displayDialog = true;
    }
  
    /**
     * deleteSelectedSyllabi
     * */
  
    public deleteSelectedSyllabi(): void {}
  
    /**
     * getSyllabi
     * */
  
    public getSyllabiByProfName(): void {
      this.catService.getList('syllabi/search/findByInstructorName?instructorName='+this.user.fullName).subscribe(
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
    
    public getSyllabi(): void {
      this.catService.getList('syllabi?size=500').subscribe(
        (data: any) => {
          this.syllabi = data._embedded.syllabi;
          // console.log(this.syllabi);
          this.syllabusIsMine = false;
          this.loading = false;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  
    public editSyllabus(syllabus): void {}
  
    /**
     * hide
     */
    public hide() {
      this.displayDialog = false;
    }
  
    clear(table: Table) {
      table.clear();
    }
  
    /**
     * onDownloadFile()
     */
    public onDownloadFile(fileName): void {
      this.catService.getList('filestorage/files/' + fileName).subscribe(
        (data: any) => {
          console.log(data);
          // this.saveFile(data, fileName);
          // this.fileSaverService.save(data.filename, fileName);
        },
        (err) => {
          console.error(err);
        }
      );
    }
  

}
