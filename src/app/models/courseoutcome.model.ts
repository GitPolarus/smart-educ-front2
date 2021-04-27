export class CourseOutcome {
  id: number;
  co: string;
  so1: string;
  so2: string;
  so3: string;
  so4: string;
  so5: string;
  so6: string;
  so7: string;
  validationPercentage: number;
  syllabus;
  creationDate: Date;
  updateDate: Date;
  createdBy: string;
  // tslint:disable-next-line: variable-name
  _links: {
    self: {
      href: string;
    };
    syllabus: {
      href: string;
    };
  };
}
