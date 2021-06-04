import { Portfolio } from './portfolio.model';
import { TextBook } from './textbook.model';
import { TopicalOutline } from './topicaloutline.model';
import { Grading } from './grading.model';
import { Course } from './course.model';
import { CourseOutcome } from './courseoutcome.model';

export class Syllabus {
  id: number;
  portfolio: Portfolio;
  preRequisiteCourses: string[] = [];
  coRequisiteCourses: string[] = [];
  catalogueDescription: string;
  textBooks: string[]= [];
  courseOutcomes: CourseOutcome[] = [];
  topicalOutlines: TopicalOutline[] = [];
  gradings: Grading[] = [];
  // instructors: string[] = [];
  instructorName: string;
  instructorEmail: string;
  academicEthics: string;
  archived = false;
  syllabusFileName: string;
  lectureHours: number = 0;
  tutorialHours: number  = 0;
  labHours: number  = 0;
  creditHours: number  = 0;
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
