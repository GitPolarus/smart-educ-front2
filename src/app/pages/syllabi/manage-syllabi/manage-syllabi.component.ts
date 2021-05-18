import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Table } from 'primeng/table';
import { CatalogueService } from './../../../services/catalogue.service';
import { AuthService } from './../../../services/auth.service';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { Syllabus } from './../../../models/syllabus.model';
import { Component, OnInit } from '@angular/core';
import * as fileSaver from 'file-saver';
import { FileSaverService } from 'ngx-filesaver';

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
  displayDialog = false;

  constructor(
    private authService: AuthService,
    private catService: CatalogueService,
    private msgService: MessageService,
    private confirmationService: ConfirmationService,
    private fileSaverService: FileSaverService
  ) {}

  ngOnInit(): void {
    this.getSyllabi();
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

  public getSyllabi(): void {
    this.catService.getList('syllabi?size=500').subscribe(
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
        this.fileSaverService.save(data.filename, fileName);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  // saveFile(data: any, filename?: string) {
  //   const blob = new Blob([data], { type: 'pdf; charset=utf-8' });
  //   fileSaver.saveAs(blob, filename);
  // }

  // /**
  //  * onSaveFile
  //  */
  // public onSaveFile() {
  //   this._http.get('demo.pdf', {
  //     responseType: ResponseContentType.Blob // This must be a Blob type
  //   }).subscribe(res => {
  //     this._FileSaverService.save((<any>res)._body, fileName);
  //   });
  // }
  // }

  // onRemote(filename: string, fromRemote: boolean): Observable<Response> {
  //   return this.http.get('http://localhost:8080/filestorage/files/' + filename, {
  //     responseType: ResponseContentType.Blob
  //   }).map(response => {
  //     response.headers.set('filename', `demo.${type}`)
  //     return response;
  //   });
  // }
}
