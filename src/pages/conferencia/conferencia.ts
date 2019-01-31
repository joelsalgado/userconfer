import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';

/**
 * Generated class for the ConferenciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conferencia',
  templateUrl: 'conferencia.html',
})
export class ConferenciaPage {

  conferencia : Object;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localNotification: PhonegapLocalNotification) {

    this.localNotification.requestPermission().then(
      (permission) => {
        if (permission === 'granted') {

          // Create the notification
          this.localNotification.create('Asiste a Tu conferencia', {
            tag: 'message1',
            body: 'Notificacion Conferencia',
            icon: 'assets/icon/favicon.ico'
          });

        }
      }
    );


    this.conferencia = navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConferenciaPage');
  }

}
