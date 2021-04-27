export class Semester {
  semesterNumber: number;
  academicYear: number;
  portfolio;
  faculty;
  opened: boolean;
  creationDate: Date;
  updateDate: Date;
  createdBy: string;
  _links: {
    self: {
      href: string;
    };
    semester: {
      href: string;
    };
    faculty: {
      href: string;
    };
    portfolio: {
      href: string;
    };
  };
}
