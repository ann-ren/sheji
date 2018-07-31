import {Component,ViewChild,ViewContainerRef,ComponentFactoryResolver,Injector} from "@angular/core";
import {Observable,fromEvent} from 'rxjs'
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @ViewChild('element',{read: ViewContainerRef}) element: ViewContainerRef;
  @ViewChild('container',{ read: ViewContainerRef }) container: ViewContainerRef;
  content;
  constructor(private resolver: ComponentFactoryResolver,private injector: Injector) {
  }
  addComponent = (component,position) => {
    let factory = this.resolver.resolveComponentFactory(component);
    let componentRef = factory.create(this.injector);
    componentRef.instance.style=position;
    this.element.insert(componentRef.hostView);
    this.content = componentRef.instance;
    return this.content;
  }
}

@Component({

  template:`<div><div #element></div><div>`
})
export class DialogHolderComponent{
  @ViewChild('element', {read: ViewContainerRef}) element: ViewContainerRef;
  componentRef
  constructor(private resolver: ComponentFactoryResolver){}
  addDialog = (component,position) => {
    let factory = this.resolver.resolveComponentFactory(ModalComponent);
    this.componentRef&&this.componentRef.destroy();
    this.componentRef = this.element.createComponent(factory);
    // console.log(componentRef.instance.style,'style')
    let dialogWrapper = <ModalComponent> this.componentRef.instance;
    console.log(dialogWrapper,'3333')
    let _component = dialogWrapper.addComponent(component,position);
    fromEvent(document,'click').subscribe(() => {
      this.componentRef && this.componentRef.destroy();
  })
  }
}
   