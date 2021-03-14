/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CatalogueService } from './catalogue.service';

describe('Service: Catalogue', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatalogueService]
    });
  });

  it('should ...', inject([CatalogueService], (service: CatalogueService) => {
    expect(service).toBeTruthy();
  }));
});
