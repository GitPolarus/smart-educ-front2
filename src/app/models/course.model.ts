export class Course {
  id: number;
  courseName: string;
  facultyOption: string;
  semesterNumber: number;
  coordinatorEmail: string;
  opened: boolean;
  creationDate: Date;
  updateDate: Date;
  createdBy: string;

  _links: {
    self: {
      href: string;
    };
    course: {
      href: string;
    };
    portfolio: {
      href: string;
    };
    coordinator: {
      href: string;
    };
  };
}
