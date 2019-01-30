import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConferenciaPage } from './conferencia';

@NgModule({
  declarations: [
    ConferenciaPage,
  ],
  imports: [
    IonicPageModule.forChild(ConferenciaPage),
  ],
})
export class ConferenciaPageModule {}
