import { Component } from '@angular/core';
import {NavController, NavParams, Platform, ToastController, ToastOptions} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TodosProvider} from "../../providers/todos/todos";
import {ListPage} from "../list/list";
import {BackgroundMode} from "@ionic-native/background-mode";
import {LocalNotifications} from "@ionic-native/local-notifications";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myForm: FormGroup;
  username: '';
  password: '';
  users: any;
  toastOpcion: ToastOptions;
  notificationAlreadyReceived = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fb: FormBuilder,
              public todoService: TodosProvider,
              public localNotifications: LocalNotifications,
              private toast: ToastController,
              public backgroundMode: BackgroundMode,
              public platform: Platform) {


    platform.ready().then(() => {




      this.notificationAlreadyReceived = true;

      this.backgroundMode.enable();
    });

    this.myForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

  }

  changeView(){
    this.username  = this.myForm.value.username;
    this.password  = this.myForm.value.password;

    this.todoService.loginUser(this.username,this.password).then((data) => {
      if(data != 0){
        this.navCtrl.setRoot(ListPage, {user:data[0]});
        console.log(data);
      }else{
        this.toastOpcion = {
          message: 'Usuario o contraseña incorrecta',
          duration: 3000
        };

        this.toast.create(this.toastOpcion).present();

      }
    });


  }



}
