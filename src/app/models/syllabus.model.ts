import {Objectif} from './objectif.model';
import { Course } from "./Course";

export class Syllabus{
  public nomProf:String;
  public nomCourse:String;
  public syllabusURL:String;
  public objectifs:Objectif[]
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


  constructor(nomProf: String,nomCourse: String, syllabusURL: String, objectifs: Objectif[], anneeAcademique:string) {
    this.nomProf = nomProf;
    this.nomCourse = nomCourse;
    this.syllabusURL = syllabusURL;
    this.objectifs = objectifs;
    this.anneeAcademique = anneeAcademique;
  }
}
