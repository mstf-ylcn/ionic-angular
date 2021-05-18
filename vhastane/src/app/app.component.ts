import { Component } from '@angular/core';
import { LottieSplashScreen } from '@ionic-native/lottie-splash-screen/ngx';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform:Platform,
    private statusbar:StatusBar,
    private lottie:LottieSplashScreen) {
   this.initializeApp();
    }

    initializeApp()
    {
      this.lottie.show();
      this.platform.ready().then(()=>
      {
        this.statusbar.styleDefault();
        setTimeout(()=>
        {
          this.lottie.hide();
        },2500)
      })
}
}
