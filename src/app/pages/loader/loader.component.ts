import { LoaderService } from './../../services/loader.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  loading: boolean;

  constructor(private loaderService: LoaderService) {


    this.loaderService.isLoading.subscribe((v) => {
      // console.log(v);
      this.loading = v;

    });
  }
  ngOnInit() {
  }

}
