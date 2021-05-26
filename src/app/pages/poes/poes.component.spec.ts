/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PoesComponent } from './poes.component';

describe('PoesComponent', () => {
  let component: PoesComponent;
  let fixture: ComponentFixture<PoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
