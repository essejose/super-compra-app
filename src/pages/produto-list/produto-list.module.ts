import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdutoListPage } from './produto-list';

@NgModule({
  declarations: [
    ProdutoListPage,
  ],
  imports: [
    IonicPageModule.forChild(ProdutoListPage),
  ],
})
export class ProdutoListPageModule {}
