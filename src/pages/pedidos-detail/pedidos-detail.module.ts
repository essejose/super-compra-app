import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidosDetailPage } from './pedidos-detail';

@NgModule({
  declarations: [
    PedidosDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidosDetailPage),
  ],
})
export class PedidosDetailPageModule {}
