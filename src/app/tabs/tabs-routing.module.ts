import { ReviewsPageModule } from 'src/pages/reviews/reviews.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdSavedPageModule } from 'src/pages/ad-saved/ad-saved.module';
import { DashboardPageModule } from 'src/pages/dashboard/dashboard.module';
import { FriendsListPageModule } from 'src/pages/friends-list/friends-list.module';
import { MapPageModule } from 'src/pages/map/map.module';
import { SettingsPageModule } from 'src/pages/settings/settings.module';
import { TabsPage } from './tabs.page';
import { AdvertisingPageModule } from 'src/pages/advertising/advertising.module';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => DashboardPageModule,
      },
      {
        path: 'map',
        children: [
          {
            path: '',
            loadChildren: () => MapPageModule,
          }
        ]
      },
      {
        path: 'saved',
        loadChildren: () => AdSavedPageModule,
      },
      {
        path: 'friends',
        loadChildren: () => FriendsListPageModule,
      },
      {
        path: 'advertising',
        children: [
          {
            path: '',
            loadChildren: () => AdvertisingPageModule,
          },

        ],
      },
      {
        path: 'reviews',
        loadChildren: () => ReviewsPageModule,
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () => SettingsPageModule,
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
