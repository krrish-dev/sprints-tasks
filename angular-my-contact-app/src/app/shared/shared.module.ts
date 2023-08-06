import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainlayoutComponent } from './mainlayout/mainlayout.component';
//import { AllContactsComponent } from '../contacts/all-contacts/all-contacts.component'; // Make sure the path is correct


@NgModule({
  declarations: [
    SharedComponent,
    HeaderComponent,
    FooterComponent,
    MainlayoutComponent,


  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [HeaderComponent, FooterComponent , MainlayoutComponent]

})
export class SharedModule { }
