import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {TodosProvider} from "../../providers/todos/todos";
import {ConferenciaPage} from "../conferencia/conferencia";
import {HomePage} from "../home/home";

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

  constructor(public navCtrl: NavController,
              public todoService: TodosProvider) {

    if (localStorage.getItem("user_id") === null) {
      this.navCtrl.setRoot(HomePage);
    }else{
      console.log(localStorage.getItem("user_id"));
    }

    this.user = localStorage.getItem("user_id");
    this.actualizar(this.user);
  }

  actualizar(data2){
    this.todoService.findUser(data2).then((data) => {
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

  salir(){
    localStorage.removeItem('user_id');
    this.navCtrl.setRoot(HomePage);
  }

}
