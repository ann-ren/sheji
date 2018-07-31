import {Injectable,ComponentFactoryResolver, ApplicationRef,Injector} from "@angular/core";
import {ModalComponent,DialogHolderComponent} from '../components/modal/modal.component';
import {Observable, fromEvent} from 'rxjs'
@Injectable()
export class DialogService {
    private dialogHolderComponent: ModalComponent;
    constructor(private resolver: ComponentFactoryResolver, private  applicationRef: ApplicationRef, private injector: Injector) {

    }
    addDialog = (component,position) => {
        if(!this.dialogHolderComponent){
            this.dialogHolderComponent=this.createComponent();
        }
        return this.dialogHolderComponent.instance.addDialog(component,position);  
             
    }
    createComponent = () => {
        let componentFactory = this.resolver.resolveComponentFactory(DialogHolderComponent);
        let componentRef = componentFactory.create(this.injector);
        this.applicationRef['components'][0].hostView.rootNodes[0].appendChild(componentRef.hostView.rootNodes[0]);
        this.applicationRef.attachView(componentRef.hostView);
        componentRef.onDestroy(() => {
            this.applicationRef.detachView(componentRef.hostView);
        })
        return componentRef;
    }
}