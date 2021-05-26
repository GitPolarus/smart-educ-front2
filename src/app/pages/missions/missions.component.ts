import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss'],
})
export class MissionsComponent implements OnInit {
  poes: any[] = [
    {
      mission: 'Excellence in undergraduate education (Quality Education)',
      poe: 'Demonstrate the highest standards of technical and ethical practice.',
    },
    {
      mission: 'Positive Contributions',
      poe: 'Apply skills and knowledge to contribute to the evolution of the IT sector to serve the community.',
    },
    {
      mission: 'Intellectual and practical abilities(Knowledge society)',
      poe: 'Acquire advanced competency levels in IT by engaging in continuous self-development, certification, and graduate studies.',
    },
    {
      mission: 'Leadership abilities (Preparation for leadership)',
      poe: 'Attain leadership roles that promote the development of IT.',
    },
  ];
  constructor() {}

  ngOnInit() {}
}
