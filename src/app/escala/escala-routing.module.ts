import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

const routes: Routes = [
  { path: '',component: ListComponent, pathMatch: 'full' },
  { path: 'new', canActivate: [AngularFireAuthGuard], component: EditComponent, pathMatch: 'full' },
  { path: 'edit/:id', canActivate: [AngularFireAuthGuard], component: EditComponent, pathMatch: 'full' },
  // { path: 'view/:id', component: ViewComponent, pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EscalaRoutingModule { }
