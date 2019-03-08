import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {TodosProvider} from "../../providers/todos/todos";
import {ConferenciaPage} from "../conferencia/conferencia";
import {HomePage} from "../home/home";
import moment from 'moment';

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
    //this.actualizar(this.user);
    this.navCtrl.push(ConferenciaPage, {activity :todos.activity_id});

  }

  salir(){
    localStorage.removeItem('user_id');
    this.navCtrl.setRoot(HomePage);
  }

  despues(value, fecha){
    let myDate = new Date().toLocaleString('en-ZA', { timeZone: 'America/Mexico_City'}).substring(0, 10);

    var date1 = new Date(myDate);
    var date2 = new Date(fecha);

    if(date2 > date1){
      let x = this.hora()+'';
      let diff = moment(x, 'HH:mm').diff(moment(value, 'HH:mm'));
      let d = moment.duration(diff);
      return(Number(Math.floor(d.asHours()) + moment.utc(diff).format("mm")));
    }
    else{
      return 16;
    }

  }

  hora(){
    return new Date().toLocaleString('en-ZA', { timeZone: 'America/Mexico_City'}).substring(12, 17);
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.user = localStorage.getItem("user_id");
      this.actualizar(this.user);
      console.log('Async operation has ended');
      event.complete();
      return true;
    }, 1000);
  }

}
