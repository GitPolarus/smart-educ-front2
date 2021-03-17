/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListSyllabusComponent } from './list-syllabus.component';

describe('ListSyllabusComponent', () => {
  let component: ListSyllabusComponent;
  let fixture: ComponentFixture<ListSyllabusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSyllabusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSyllabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
