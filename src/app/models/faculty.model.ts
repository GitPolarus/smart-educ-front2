import { Semester } from './semester.model';
import { StudentOutcome } from './studentoutcome.model';
export class Faculty{
  id: number;
  facultyName: string;
  logo: string;
  description: string;
  academicEthics: string;
  soNumber: number;
  studentOutcomes: StudentOutcome[];
  semesters: Semester[];
  creationDate: Date;
  updateDate: Date;
  createdBy: string;
}
