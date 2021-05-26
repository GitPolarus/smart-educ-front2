import { Table } from 'primeng/table';
import { MenuItem } from 'primeng/api';
import { Syllabus } from './../../../models/syllabus.model';
import { CatalogueService } from './../../../services/catalogue.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-syllabus',
  templateUrl: './list-syllabus.component.html',
  styleUrls: ['./list-syllabus.component.scss'],
})
export class ListSyllabusComponent implements OnInit {
  items: MenuItem[];
  syllabi: Syllabus[];
  selectedSyllabi: Syllabus[];
  selectedSyllabus: Syllabus;
  newSyllabus: Syllabus;
  instructors: string;
  loading = true;
  displayDialog = false;

  constructor(private catservice: CatalogueService) {}

  ngOnInit() {
    this.getSyllabi();
    console.log(btoa('bonjours'));

  }

  public getSyllabi(): void {
    this.catservice.getList('syllabi?size=500').subscribe(
      (data: any) => {
        this.syllabi = data._embedded.syllabi;
        this.loading = false;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  onSyllabiItemClick(href): string{
    // console.log(href);
    return btoa(href);
  }

  clear(table: Table): void {
    table.clear();
  }

}
