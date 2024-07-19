child.component.ts


export class ChildComponent {
  title: string = 'Child data';
  childData(titleChange: string) {
    this.title = titleChange;
  }
}

child.component.html

<div>
    <p>{{title}}</p>
</div>



app.component.ts

export class AppComponent {
  childAccessMethodModel!: string;
  @ViewChild('childRef') childRefElement!: ChildComponent; // ElementRef of type can also be given,ChildComponent given here because it refers to ChildComponent 

  changeChildTitle() {
    this.childRefElement.title = "Updated child title from parent";
  }

  accessChildMethod() {
    this.childRefElement.childData(this.childAccessMethodModel);
  }
}


app.component.html

<h1>View child with components</h1>
<app-child #childRef></app-child>
<hr/>
<app-child #childRef></app-child>
<input type="text" [(ngModel)]="childAccessMethodModel"/>
<button (click)="accessChildMethod()">Access child methods</button>
<br>
<button (click)="changeChildTitle()">Change Child Title</button>



Here there is 2 times calling the api <app-child> with same reference variable #childRef ( i.e.   <app-child #childRef></app-child> called exactly same twice). Hence, @ViewChild ( i.e.  @ViewChild('childRef') childRefElement!: ChildComponent;  )  will call the first reference variable (  i.e. first app selector's reference variable  <app-child #childRef></app-child> ). Since, the first reference variable #childRef is called @ViewChild will not go second reference variable  (  i.e.  second app selector's refernce variable  <app-child #childRef></app-child> )


Using @ViewChildren


child.component.ts

export class ChildComponent {
  title: string = 'Child data';
  childData(titleChange: string) {
    this.title = titleChange;
  }
}



child.component.html

<div>
    <p>{{title}}</p>
</div>


app.component.ts


export class AppComponent {
  childAccessMethodModel!: string;
  @ViewChildren('childRef') childRefElements!: ChildComponent; // ElementRef of type can also be given,ChildComponent given here because it refers to ChildComponent 

  changeChildTitle() {
     console.log(this.childRefElements, "View Children Elements");
    let counter = 0;
    for(const childcomponent of this.childRefElements){
      console.log("View all Children Elements", childcomponent);
      counter++;
      childcomponent.title = childcomponent .title + counter; // we want to append counter calue along with the title coming from child component
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



app.component.html


<h1>View child with components</h1>
<app-child #childRef></app-child>
<hr/>
<app-child #childRef></app-child>
<hr/>
<app-child #childRef></app-child>
<input type="text" [(ngModel)]="childAccessMethodModel"/>
<button (click)="accessChildMethod()">Access child methods</button>
<br>
<button (click)="changeChildTitle()">Change Child Title</button>


When clicking 'Change child title' button the console for this (  console.log(this.childRefElements, "View Children Elements");
 ) only will have these 2 reference variable which are same in the app-child selector hence @ViewChildren will take the first as first appi-child reference variable #childRef, similarly last as the third reference variable #childRef. (consoling the 'childRefElements' is shown below).But here it prints the first and third not the second to get all the refrence variable selectors used we need to use a for loop.



QueryList {_emitDistinctChangesOnly: true, dirty: false, _onDirty: undefined, _results: Array(2), _changesDetected: true, …}dirty: falsefirst: _ChildComponenttitle: "Child data"__ngContext__: 1[[Prototype]]: Objectlast: _ChildComponenttitle: "Child data"__ngContext__: 1[[Prototype]]: Objectlength: 2_changes: undefined_changesDetected: true_emitDistinctChangesOnly: true_onDirty: undefined_results: Array(2)0: _ChildComponenttitle: "Child data"__ngContext__: 1[[Prototype]]: Object1: _ChildComponenttitle: "Child data"__ngContext__: 1[[Prototype]]: Objectlength: 2[[Prototype]]: Array(0)changes: (...)[[Prototype]]: Object 'View Children Elements'




When you give below piece of code in app.component.ts and click on the button 'Change child title', you will get all the reference variable selector . Here looped 3 times because there are 3 selector with same reference variable. 

 changeChildTitle() {
for(const childcomponent of this.childRefElements){
      console.log("View all Children Elements", childcomponent);
    }
}


Hence the console is given below

View all Children Elements 
_ChildComponent {title: 'Child data', __ngContext__: 1}
title
: 
"Child data"
__ngContext__
: 
1
[[Prototype]]
: 
Object
app.component.ts:16 View all Children Elements 
_ChildComponent {title: 'Child data', __ngContext__: 1}
title
: 
"Child data"
__ngContext__
: 
1
[[Prototype]]
: 
Object
app.component.ts:16 View all Children Elements 
_ChildComponent {title: 'Child data', __ngContext__: 1}
title
: 
"Child data"
__ngContext__
: 
1
[[Prototype]]
: 
Object 




For the below piece of code 


changeChildTitle() {
     console.log(this.childRefElements, "View Children Elements");
    let counter = 0;
    for(const childcomponent of this.childRefElements){
      console.log("View all Children Elements", childcomponent);
      counter++;
      childcomponent.title = childcomponent .title + counter; // we want to append counter calue along with the title coming from child component
    }
      }


This line of code will append title with incremented counter value (i.e iterator.title = iterator .title + counter). In this way we can append value to iterator.


Now we are going to use @ViewChildren  ' childRefElements' in a method ( childRefElements before we used for variable 'title' )  

Below method

accessChildMethod() {
   let counter =0;
   for(const childComponent of this.childRefElements){
    counter++;
    childComponent.childData(`${childComponent.title} method ${counter}`) 
   }
  }


Here title of childComponent is added with the counter value using method childData(). Hence the above code shows that the for loop of @ViewChildren can not only access variable (i.e title) , but also ( method childData() )
