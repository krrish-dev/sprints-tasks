import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainlayoutComponent } from './shared/mainlayout/mainlayout.component';
import { AllContactsComponent } from './contacts/all-contacts/all-contacts.component';

const routes: Routes = [
    { path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule) },
    { path: 'shared', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) },
    { path: '', component: MainlayoutComponent },
    { path: 'all-contacts', component: AllContactsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
