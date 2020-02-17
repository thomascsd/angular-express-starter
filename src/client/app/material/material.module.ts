import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CdkTableModule } from '@angular/cdk/table';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  imports: [CommonModule, MatSnackBarModule, CdkTableModule, MatSortModule],
  declarations: [],
  exports: [MatSnackBarModule, CdkTableModule, MatSortModule]
})
export class MaterialModule {}
