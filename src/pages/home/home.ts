import { Component } from '@angular/core';
import {NavController, NavParams, ToastController, ToastOptions} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TodosProvider} from "../../providers/todos/todos";
import {ListPage} from "../list/list";

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fb: FormBuilder,
              public todoService: TodosProvider,
              private toast: ToastController) {

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
