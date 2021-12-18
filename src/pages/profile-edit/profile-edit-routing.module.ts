import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';

import { ProfileEditPage } from './profile-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileEditPage
  },
  {
    path: 'edit',
    component: EditProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileEditPageRoutingModule { }
