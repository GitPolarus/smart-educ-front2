import { Portfolio } from './portfolio.model';
import { TextBook } from './textbook.model';
import { TopicalOutline } from './topicaloutline.model';
import { Grading } from './grading.model';
import { Course } from './course.model';
import { CourseOutcome } from './courseoutcome.model';

export class Syllabus {
  id: number;
  portfolio: Portfolio;
  preRequisiteCourses: string[];
  coRequisiteCourses: string[];
  catalogueDescription: string;
  textBooks: TextBook[];
  courseOutcomes: CourseOutcome[];
  topicalOutlines: TopicalOutline[];
  gradings: Grading[];
  instructors: string[];
  academicEthics: string;
  archived = false;
  syllabusFileName: string;
  lectureHours: number;
  tutorialHours: number;
  labHours: number;
  creditHours: number;
  school: string;
  generated = false;
  courseName: string;
  coordinatorEmail: string;
  coordinatorFirstName: string;
  coordinatorLastName: string;
  coordinatorFullName: string;
  semesterNumber: number;
  academicYear: number;
  createdBy: string;
  creationDate: Date;
  updateDate: Date;

  _links: {
    self: {
      href: string;
    };
    syllabus: {
      href: string;
    };
    portfolio: {
      href: string;
    };
    courseOutcomes: {
      href: string;
    };
  };

}
