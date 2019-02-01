import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BackgroundMode } from '@ionic-native/background-mode'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {TodosProvider} from "../providers/todos/todos";
import {ListPageModule} from "../pages/list/list.module";
import {ConferenciaPageModule} from "../pages/conferencia/conferencia.module";
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';
import { LocalNotifications } from '@ionic-native/local-notifications';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ListPageModule,
    ConferenciaPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PhonegapLocalNotification,
    BackgroundMode,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TodosProvider
  ]
})
export class AppModule {}
