import { NgModule } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'


@NgModule({
  declarations: [

  ],
  imports: [
    MatTreeModule,
    MatButtonModule, 
    MatIconModule,
  ],

  exports: [
    [
      MatTreeModule,
      MatButtonModule,
      MatIconModule
    ]
  ]
})
export class MaterialModule { }
