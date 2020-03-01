import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EscalaRoutingModule } from './escala-routing.module';
import { EditComponent } from './edit/edit.component';
import { ListaComponent } from './lista/lista.component';
import { ListComponent } from './list/list.component';
import { MatCardModule, MatFormFieldModule, MatTableModule, MatIconModule, MatButtonModule, MatInputModule, MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    EscalaRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
  ],
  declarations: [EditComponent, ListaComponent, ListComponent]
})
export class EscalaModule { }
