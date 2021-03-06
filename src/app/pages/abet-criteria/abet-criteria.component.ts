import { Component, OnInit } from '@angular/core';
import { AbetCriteria } from 'src/app/models/abet-criteria.model';
import { CatalogueService } from 'src/app/services/catalogue.service';

@Component({
  selector: 'app-abet-criteria',
  templateUrl: './abet-criteria.component.html',
  styleUrls: ['./abet-criteria.component.scss']
})
export class AbetCriteriaComponent implements OnInit {
  data: any;
  chartOptions: any;
  newAbetCriteria: AbetCriteria = new AbetCriteria();
  abetCriteriaList: AbetCriteria[] = [];
  abetCriteriaListFiltered: string[] = [];
  loading = true;
  displayDialog: boolean = false;
  selectedOption: any;
  statusOptions: any = [
    { name: 'Compliant', value: 'COMPLIANT' },
    { name: 'In Progress', value: 'IN_PROGRESS' },
    { name: 'Non Compliant', value: 'NON_COMPLIANT' },
  ]

  statusPercentage: number[] = [0, 0, 0];
  rowGroupMetadata: any;


  constructor(private catService: CatalogueService) { }

  ngOnInit() {
    this.getCriteriaList();
  }

  public getCriteriaList(): void {
    this.catService.getList('abetCriterias?size=100').subscribe(
      (data: any) => {
        this.abetCriteriaList = data._embedded.abetCriterias;
        this.setPropositionList();
        this.updateRowGroupMetaData();
        this.buildGraph();
        this.loading = false;
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  setPropositionList() {
    let criteria: string = '';
    this.abetCriteriaListFiltered = [];

    this.abetCriteriaList.forEach(element => {
      if (element.criteriaCategory != criteria) {
        this.abetCriteriaListFiltered.push(element.criteriaCategory)
        criteria = element.criteriaCategory;
      }
    });
    // console.log(this.abetCriteriaListFiltered);

  }

  public save() {
    this.newAbetCriteria.status = this.selectedOption.value;
    this.catService.postResource('abetCriterias', this.newAbetCriteria).subscribe(
      (data: any) => {
        this.loading = false;
        this.getCriteriaList();
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public cancel(): void {
    this.displayDialog = false;
    this.newAbetCriteria = new AbetCriteria();
  }

  public newCriteriaDialog(): void {
    this.displayDialog = true;
  }


  public filterCategory(event: any): void {
    const filtered: string[] = [];
    this.setPropositionList();
    const query = event.query;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.abetCriteriaListFiltered.length; i++) {
      const criteria = this.abetCriteriaListFiltered[i];
      if (criteria.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(criteria);
      }

    }
    // console.log(filtered);
    this.abetCriteriaListFiltered = filtered;
  }



  onSort() {
    this.updateRowGroupMetaData();
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};

    if (this.abetCriteriaList) {
      for (let i = 0; i < this.abetCriteriaList.length; i++) {
        let rowData = this.abetCriteriaList[i];
        let representativeCateg = rowData.criteriaCategory;

        if (i == 0) {
          this.rowGroupMetadata[representativeCateg] = { index: 0, size: 1 };
        }
        else {
          let previousRowData = this.abetCriteriaList[i - 1];
          let previousRowGroup = previousRowData.criteriaCategory;
          if (representativeCateg === previousRowGroup)
            this.rowGroupMetadata[representativeCateg].size++;
          else
            this.rowGroupMetadata[representativeCateg] = { index: i, size: 1 };
        }
      }
    }
  }

  public buildGraph() {

    this.abetCriteriaList.forEach(element => {
      console.log(element.status);
      switch(element.status){
        
        case 'NON_COMPLIANT': this.statusPercentage[0] = this.statusPercentage[0]+1; 
        break;

        case 'COMPLIANT': this.statusPercentage[1] = this.statusPercentage[1]+1; 
        break; 
        
        case 'IN_PROGRESS': this.statusPercentage[2] = this.statusPercentage[2]+1; 
        break;
      }
      console.log(this.statusPercentage);

    });
   let total = this.statusPercentage[0]+this.statusPercentage[1]+this.statusPercentage[2];
    let p_noncompliant = (this.statusPercentage[0] *100)/total;
    let p_compliant = (this.statusPercentage[1] * 100)/total;
    let p_inprogress = (this.statusPercentage[2] * 100)/total;

    // console.log(p_noncompliant);
    
    this.data = {
      labels: [ p_noncompliant.toFixed(2)+'% Non Compliant', p_compliant.toFixed(2)+'% Compliant', p_inprogress.toFixed(2)+'% In progress'],
      datasets: [
        {
          data: [p_noncompliant, p_compliant, p_inprogress],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
    };
    this.chartOptions = {
      responsive: true,
      title: {
        display: true,
        text: 'Criteria performance level'
      },
      tooltips: {
        mode: 'index',
        intersect: true
      }
    };

  }

}
