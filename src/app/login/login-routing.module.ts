import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { login } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: login
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
