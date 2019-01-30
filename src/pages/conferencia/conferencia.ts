import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    public navParams: NavParams) {



    this.conferencia = navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConferenciaPage');
  }

}
