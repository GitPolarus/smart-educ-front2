import { Syllabus } from './../../../models/syllabus.model';
import { CatalogueService } from './../../../services/catalogue.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-syllabus',
  templateUrl: './list-syllabus.component.html',
  styleUrls: ['./list-syllabus.component.scss'],
})
export class ListSyllabusComponent implements OnInit {
  private syllabi: Syllabus[];

  constructor(private catservice: CatalogueService) {}

  ngOnInit() {
    this.getSyllabi();
  }

  public getSyllabi(): void {
    this.catservice.getList('syllabi').subscribe(
      (data: any) => {
        this.syllabi = data;
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
