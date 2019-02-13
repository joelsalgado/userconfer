import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {BackgroundMode} from "@ionic-native/background-mode";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {TodosProvider} from "../providers/todos/todos";
import moment from 'moment';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  id: String;
  todo: any;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              backgroundMode: BackgroundMode,
              localNotifications: LocalNotifications,
              todoService: TodosProvider,) {
    if (localStorage.getItem("user_id") === null) {
      console.log('No');
    }else{
      this.id = localStorage.getItem("user_id");
      todoService.findUser(this.id).then((data) => {
        this.todo = data;
        for (let day of this.todo)
        {
          if(day.fecha == '2019-01-25 00:00:00.000') {
            let hora = parseInt(day.inicio.substring(0, 2), 10);
            let minutos = parseInt(day.inicio.substring(3, 5), 10);
            let date  = new Date(Date.UTC(2019,2,13,hora, minutos,0,0));
            let olderDate = moment(date).subtract(10, 'minutes').toDate();
            let hours10 = olderDate.getUTCHours();
            let minutes10 = olderDate.getMinutes();

            localNotifications.schedule({
              id: day.id,
              title: 'Asiste a tu conferencia',
              text: 'Tu conferencia '+day.descripcion+' Iniciara en 10 Minutos, En:'+day.salon,
              trigger: {count: 1},
              every: {month: 2, day: 13, hour: hours10, minute: minutes10, second: 0, ms: 0},
            });
          }
        }
      });
    }


    platform.ready().then(() => {
      if (platform.is('android')) {
        backgroundMode.on('activate').subscribe(() => {
          if (localStorage.getItem("user_id") === null) {
            console.log('No');
          }else{
            this.id = localStorage.getItem("user_id");
            todoService.findUser(this.id).then((data) => {
              this.todo = data;
              for (let day of this.todo)
              {
                if(day.fecha == '2019-01-25 00:00:00.000') {
                  let hora = parseInt(day.inicio.substring(0, 2), 10);
                  let minutos = parseInt(day.inicio.substring(3, 5), 10);
                  let date  = new Date(Date.UTC(2019,2,13,hora, minutos,0,0));
                  let olderDate = moment(date).subtract(10, 'minutes').toDate();
                  let hours10 = olderDate.getUTCHours();
                  let minutes10 = olderDate.getMinutes();
                  localNotifications.schedule({
                    id: day.id,
                    title: 'Asiste a tu conferencia',
                    text: 'Tu conferencia '+day.descripcion+' Iniciara en 10 minutos, En:'+day.salon,
                    trigger: {count: 1},
                    every: {month: 2, day: 13, hour: hours10, minute: minutes10, second: 0, ms: 0},
                  });
                }
              }
            });
          }
          console.log('activated');
        });
      }
      backgroundMode.enable();


      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

