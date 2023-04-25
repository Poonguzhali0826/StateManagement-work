import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsyncPipeComponent } from './async-pipe/async-pipe.component';
import { CRUDComponent } from './crud/crud.component';

const routes: Routes = [
  {
    path: '',
    component: CRUDComponent
  },
  {
    path: 'async',
    component: AsyncPipeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
