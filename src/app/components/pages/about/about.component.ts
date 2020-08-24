import { Component, OnInit } from '@angular/core';
import { Language } from 'src/app/models/language';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public experienceLink = 'https://www.linkedin.com/in/anilde-santo-32a85b98';
  public languages: Array<Language> = [
    {title: 'Portuguese', level: 'Native'},
    {title: 'English', level: 'Fluent'},
    {title: 'Spanish', level: 'Intermediate'},
  ];

  public profileText = `I graduated from the University of East London with a BSc in Computer Games Development.
   Even though I had an artistic side,
    I chose the development path instead of the design due to my curiosity and interest in problem solving.
    After seeing how games impact people’s lives, I decided to understand more about how to create and design them myself.
    The degree allowed me to obtain essential skills which enabled me to start a career as a software developer.
    I desire the developer path since it will enhance my abilities,
   knowledge and enable me to create more than just games. I want to be able to program and use a diverse range of technologies.`;

  ngOnInit(): void {
  }

}
