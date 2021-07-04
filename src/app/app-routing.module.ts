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
import { AgeValidationPageModule } from 'src/pages/age-validation/age-validation.module';
import { StartSessionPageModule } from 'src/pages/start-session/start-session.module';
import { OnBoardingPageModule } from 'src/pages/on-boarding/on-boarding.module';
import { AdPageModule } from 'src/pages/advertising/pages/ad/ad.module';
import { FriendsAddPageModule } from 'src/pages/friends-add/friends-add.module';
import { IdeaPageModule } from 'src/pages/idea/idea.module';
import { AuthGuard } from 'src/common/auth/_guards/auth.guard';
import { SelectLocationPageModule } from 'src/pages/select-location/select-location.module';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    loadChildren: () => TabsPageModule,
    canActivate: [AuthGuard],
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
    canActivate: [AuthGuard],
  },
  {
    path: 'map',
    loadChildren: () => MapPageModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'friends-list',
    loadChildren: () => FriendsListPageModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/:id',
    loadChildren: () => ProfilePageModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'history',
    loadChildren: () => HistoryPageModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    loadChildren: () => SettingsPageModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile-edit',
    loadChildren: () => ProfileEditPageModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'chat/:id',
    loadChildren: () => ChatPageModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'image-share',
    loadChildren: () => ImageSharePageModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'place',
    loadChildren: () => PlacePageModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'advertising',
    loadChildren: () => AdvertisingPageModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'no-smoke',
    loadChildren: () => NoSmokePageModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'addiction-counseling',
    loadChildren: () => AddictionCounselingPageModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'addiction-information',
    loadChildren: () => AddictionInformationPageModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'addiction-motivation',
    loadChildren: () => AddictionMotivationPageModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'age-validation',
    loadChildren: () => AgeValidationPageModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'start-session',
    loadChildren: () => StartSessionPageModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'on-boarding',
    loadChildren: () => OnBoardingPageModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'advertising/:id',
    loadChildren: () => AdPageModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'friends-add',
    loadChildren: () => FriendsAddPageModule,
    canActivate: [AuthGuard],
  },

  {
    path: 'friends',
    loadChildren: () => FriendsListPageModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'idea',
    loadChildren: () => IdeaPageModule,
  },
  {
    path: 'select-location',
    loadChildren: () => SelectLocationPageModule,
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
