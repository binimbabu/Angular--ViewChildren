import { Component } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss'
})
export class ChildComponent {
  title: string = 'Child data';
  childData(titleChange: string) {
    this.title = titleChange;
  }
}
