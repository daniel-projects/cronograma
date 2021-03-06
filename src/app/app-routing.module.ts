import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: '', loadChildren: () => import('./escala/escala.module').then( m => m.EscalaModule)},
  { path: 'trabalhador' ,loadChildren: () => import('./trabalhador/trabalhador.module').then( m => m.TrabalhadorModule)},
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'atividade', loadChildren: () => import('./atividade/atividade.module').then( m => m.AtividadeModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}