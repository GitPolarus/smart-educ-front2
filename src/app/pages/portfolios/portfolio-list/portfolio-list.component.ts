import { Component, OnInit } from '@angular/core';
import { Portfolio } from 'src/app/models/portfolio.model';
import { CatalogueService } from 'src/app/services/catalogue.service';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.scss']
})
export class PortfolioListComponent implements OnInit {
portfolios: Portfolio[] = [];
  loading: boolean = true;

  constructor(private catService: CatalogueService) { }

  ngOnInit() {
    this.getPortfolios();
  }

  onSyllabiItemClick(id): string{
    // console.log(href);
    let href = 'http://localhost:8080/portfolios/'+ id +'/syllabus'
    return btoa(href);
  }
  /**
   * getPortfolios
   */
  public getPortfolios(): void{
    this.catService.getList('portfolios').subscribe(
      (data: any) => {
        this.portfolios = data._embedded.portfolios;
        this.loading = false;
        console.log(this.portfolios);
        
      },
      (err) => {
        console.error(err);
      }
    );
  }

}
