import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrabalhadorRoutingModule } from './trabalhador-routing.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { MatCardModule, MatFormFieldModule, MatTableModule, MatIconModule, MatButtonModule, MatInputModule, MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    TrabalhadorRoutingModule
  ],
  declarations: [ListComponent, EditComponent]
})
export class TrabalhadorModule { }
