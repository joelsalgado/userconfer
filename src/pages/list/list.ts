import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TodosProvider} from "../../providers/todos/todos";
import {ConferenciaPage} from "../conferencia/conferencia";

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  user : Object;
  todo: any;
  name: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public todoService: TodosProvider) {
    this.user = navParams.get('user');
    this.actualizar(this.user);
  }

  actualizar(data2){
    this.todoService.findUser(data2.clave).then((data) => {
      this.todo = data;
      this.name = data[0].nombre;
    });

  }

  changeView(todos){
    this.actualizar(this.user);

    this.todoService.findConferencias(todos.activity_id).then((data) => {
      console.log(data[0]);
      this.navCtrl.push(ConferenciaPage, {data:data[0]});
    });


  }

}
