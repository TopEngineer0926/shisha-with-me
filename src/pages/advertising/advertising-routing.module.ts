import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdSavedPageModule } from '../ad-saved/ad-saved.module';
import { AdvertisingPage } from './advertising.page';
import { AdPageModule } from './pages/ad/ad.module';


const routes: Routes = [
  {
    path: '',
    component: AdvertisingPage,
  },
  {
    path: ':id',
    loadChildren: () => AdPageModule,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvertisingPageRoutingModule { }
