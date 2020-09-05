import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  @Input() project: Project;
  @Output() imageClick: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

 public clickImage(): void {
   this.imageClick.emit(this.project.id);
 }
}
