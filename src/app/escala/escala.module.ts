import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EscalaRoutingModule } from './escala-routing.module';
import { EditComponent } from './edit/edit.component';
import { ListaComponent } from './lista/lista.component';
import { ListComponent } from './list/list.component';
import { MatCardModule, MatFormFieldModule, MatTableModule, MatIconModule, MatButtonModule, MatInputModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatGridListModule, MatListModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  imports: [
    CommonModule,
    EscalaRoutingModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatListModule,
  ],
  declarations: [EditComponent, ListaComponent, ListComponent]
})
export class EscalaModule { }
