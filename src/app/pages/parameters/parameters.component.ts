import { Component, OnInit } from '@angular/core';
import { Faculty } from 'src/app/models/faculty.model';
import { CatalogueService } from 'src/app/services/catalogue.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {
 
  faculty: Faculty = new Faculty();
  faculties: Faculty[] = [];
  params:any[] = [];

  constructor(private catService:CatalogueService) { }

  ngOnInit() {
    this.getFaculties();
    if(this.faculties.length == 0){
    }

    this.params.push(
      {item:'Faculty Name', value:this.faculty.facultyName},
      {item:'Academic Ethics', value:this.faculty.academicEthics},
      )
  }

  public getFaculties(): void {
    let ps;
    this.catService.getList('faculties').subscribe(
      (data: any) => {
        this.faculties = data._embedded.faculties;
        console.log(data);
      },
      (err) => {
        console.error(err);
      }
    );
  }

}
