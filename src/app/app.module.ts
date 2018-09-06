import { Deeplinks } from '@ionic-native/deeplinks';
import { FavoritesPage } from './../pages/favorites/favorites';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { RestProvider } from '../providers/rest/rest';
import {TimeAgoPipe} from 'time-ago-pipe';
import { LocalProvider } from '../providers/local/local';
import { IonicStorageModule } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SharingProvider } from '../providers/sharing/sharing';
import { Push } from '@ionic-native/push';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    FavoritesPage,
    HomePage,
    TabsPage,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    FavoritesPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Deeplinks,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    LocalProvider,
    Push,
    SharingProvider
  ]
})
export class AppModule {}
