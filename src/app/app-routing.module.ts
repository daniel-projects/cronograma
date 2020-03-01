import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { HomeComponent }   from './home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'trabalhador', loadChildren: () => import('./trabalhador/trabalhador.module').then( m => m.TrabalhadorModule)},
  { path: 'escala', loadChildren: () => import('./escala/escala.module').then( m => m.EscalaModule)},
  { path: 'atividade', loadChildren: () => import('./atividade/atividade.module').then( m => m.AtividadeModule)},
  { path: 'semana', loadChildren: () => import('./semana/semana.module').then( m => m.SemanaModule)}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}