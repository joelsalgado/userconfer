import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TodosProvider} from "../../providers/todos/todos";

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
  activity: '';
  bandera: Number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public todoService: TodosProvider
    ) {
    this.activity = navParams.get('activity');
    this.cargar();
    //console.log(this.activity);
  }

  cargar() {
    this.todoService.findConferencias(this.activity).then((data) => {
      this.bandera = 1;
      this.conferencia = data[0];
    });
  }

}
