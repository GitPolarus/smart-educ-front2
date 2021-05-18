import { TestBed } from '@angular/core/testing';

import { ProfGuard } from './prof.guard';

describe('ProfGuard', () => {
  let guard: ProfGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProfGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
