import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent, AlertComponent } from './app.component';
import { ModalComponent,DialogHolderComponent } from './components/modal/modal.component'
import {DialogService} from './services/dialog.service';
// import {Observable, Observer} from 'rxjs/Rx';
import { TreeModule } from 'ng2-tree';
@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    ModalComponent,
    DialogHolderComponent
  ],
  imports: [
    BrowserModule,
    TreeModule
  ],
  providers: [DialogService],
  bootstrap: [AppComponent],
  entryComponents: [
    AlertComponent,
    ModalComponent,
    DialogHolderComponent
  ]
})
export class AppModule { }
