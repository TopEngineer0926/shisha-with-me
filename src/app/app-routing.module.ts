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
import { PlacePageModule } from 'src/pages/map/place/place.module';
import { AdvertisingPageModule } from 'src/pages/advertising/advertising.module';
import { NoSmokePageModule } from 'src/pages/no-smoke/no-smoke.module';
import { AddictionCounselingPageModule } from 'src/pages/no-smoke/pages/addiction-counseling/addiction-counseling.module';
import { AddictionInformationPageModule } from 'src/pages/no-smoke/pages/addiction-information/addiction-information.module';
import { AddictionMotivationPageModule } from 'src/pages/no-smoke/pages/addiction-motivation/addiction-motivation.module';

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
  {
    path: 'place',
    loadChildren: () => PlacePageModule,
  },
  {
    path: 'advertising',
    loadChildren: () => AdvertisingPageModule,
  },
  {
    path: 'no-smoke',
    loadChildren: () => NoSmokePageModule,
  },
  {
    path: 'addiction-counseling',
    loadChildren: () => AddictionCounselingPageModule,
  },
  {
    path: 'addiction-information',
    loadChildren: () => AddictionInformationPageModule,
  },
  {
    path: 'addiction-motivation',
    loadChildren: () => AddictionMotivationPageModule,
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
