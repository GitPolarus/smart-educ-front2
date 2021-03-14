import { LoaderService } from './../../services/loader.service';
import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  loading: boolean;
  mode: ProgressSpinnerMode = 'indeterminate';

  constructor(private loaderService: LoaderService) {


    this.loaderService.isLoading.subscribe((v) => {
      // console.log(v);
      this.loading = v;

    });
  }
  ngOnInit() {
  }

}
