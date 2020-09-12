import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPageModule } from './tabs/tabs.module';
import { WalkthroughPageModule } from 'src/pages/walkthrough/walkthrough.module';
import { LoginPageModule } from 'src/pages/login/login.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'walkthrough',
    loadChildren: () => WalkthroughPageModule,
  },
  {
    path: 'login',
    loadChildren: () => LoginPageModule,
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
