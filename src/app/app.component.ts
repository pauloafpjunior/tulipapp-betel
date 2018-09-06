import { Deeplinks } from '@ionic-native/deeplinks';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { ContactPage } from '../pages/contact/contact';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  @ViewChild(Nav) navChild: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private deeplinks: Deeplinks) {
    platform.ready().then(() => {
      this.deeplinks.routeWithNavController(this.navChild, {
        '/bulletins/:bul_id': ContactPage
      }).subscribe((match) => {
        console.log('Successfully routed', match);
      }, (nomatch) => {
        console.warn('Unmatched Route', nomatch);
      });

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
