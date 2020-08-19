import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EscalaRoutingModule } from './escala-routing.module';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { MatCardModule, MatFormFieldModule, MatTableModule, MatIconModule, MatButtonModule, MatInputModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatGridListModule, MatListModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ViewComponent } from './view/view.component';

@NgModule({
  imports: [
    CommonModule,
    EscalaRoutingModule,
    AngularFireAuthModule,
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
  declarations: [EditComponent, ListComponent, ViewComponent]
})
export class EscalaModule { }
