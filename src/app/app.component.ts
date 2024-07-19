import { Component, ViewChildren } from '@angular/core';
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  childAccessMethodModel!: string;
  @ViewChildren('childRef') childRefElements!: any; // ElementRef of type can also be given,ChildComponent given here because it refers to ChildComponent 

  changeChildTitle() {
    console.log(this.childRefElements, "View Children Elements");
    let counter = 0;
    for(const childComponent of this.childRefElements){
      console.log("View all Children Elements", childComponent);
      counter++;
      childComponent.title = childComponent .title + counter; // we want to append counter calue along with the title coming from child component
    }
  }

  accessChildMethod() {
   let counter =0;
   for(const childComponent of this.childRefElements){
    counter++;
    childComponent.childData(`${childComponent.title} method ${counter}`) 
   }
  }
}
