export class Portfolio {
  id: number;
  instructorEmail: string;
  courseName: string;
  semesterNumber: number;
  academicYear: number;
  instructor;
  semester;
  course;
  syllabus;
  bestMarkFile: string;
  mediumMarkFile: string;
  worseMarkFile: string;
  coursSupportFiles: string[];
  cvFile: string;
  creationDate: Date;
  updateDate: Date;
  createdBy: string;
  updated: boolean;
  complete: boolean;
  _links: {
    self: {
      href: string;
    };
    portfolio: {
      href: string;
    };
    syllabus: {
      href: string;
    };
    instructor: {
      href: string;
    };
    semester: {
      href: string;
    };
    course: {
      href: string;
    };
  };
}
