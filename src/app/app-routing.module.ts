import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPageModule } from './tabs/tabs.module';
import { WalkthroughPageModule } from 'src/pages/walkthrough/walkthrough.module';
import { LoginPageModule } from 'src/pages/login/login.module';
import { DashboardPageModule } from 'src/pages/dashboard/dashboard.module';
import { FriendsListPageModule } from 'src/pages/friends-list/friends-list.module';
import { HistoryPageModule } from 'src/pages/history/history.module';
import { MapPageModule } from 'src/pages/map/map.module';
import { ProfilePageModule } from 'src/pages/profile/profile.module';
import { SettingsPageModule } from 'src/pages/settings/settings.module';
import { ProfileEditPageModule } from 'src/pages/profile-edit/profile-edit.module';
import { ChatPageModule } from 'src/pages/chat/chat.module';
import { ImageSharePageModule } from 'src/pages/image-share/image-share.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    loadChildren: () => TabsPageModule,
  },
  {
    path: 'walkthrough',
    loadChildren: () => WalkthroughPageModule,
  },
  {
    path: 'login',
    loadChildren: () => LoginPageModule,
  },
  {
    path: 'dashboard',
    loadChildren: () => DashboardPageModule,
  },
  {
    path: 'map',
    loadChildren: () => MapPageModule,
  },
  {
    path: 'friends-list',
    loadChildren: () => FriendsListPageModule,
  },
  {
    path: 'profile/:id',
    loadChildren: () => ProfilePageModule,
  },
  {
    path: 'history',
    loadChildren: () => HistoryPageModule,
  },
  {
    path: 'settings',
    loadChildren: () => SettingsPageModule,
  },
  {
    path: 'profile-edit',
    loadChildren: () => ProfileEditPageModule,
  },
  {
    path: 'chat/:id',
    loadChildren: () => ChatPageModule,
  },
  {
    path: 'image-share',
    loadChildren: () => ImageSharePageModule,
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
