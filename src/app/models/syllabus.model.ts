import { Course } from './course.model';
import { CourseOutcome } from './courseoutcome.model';


export class Syllabus{
  public nomProf:String;
  public nomCourse:String;
  public syllabusURL:String;
  public co:CourseOutcome[]
  public course:Course;
  public anneeAcademique: string;

  _links:{
    self:{
      href:string;
    },
    objectifs:{
      href:string;
    }
  }


  constructor(nomProf: String,nomCourse: String, syllabusURL: String, co: CourseOutcome[], anneeAcademique:string) {
    this.nomProf = nomProf;
    this.nomCourse = nomCourse;
    this.syllabusURL = syllabusURL;
    this.co = co;
    this.anneeAcademique = anneeAcademique;
  }
}
