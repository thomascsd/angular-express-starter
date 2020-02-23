import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControlErrorsDirective } from './control-errors.directive';
import { FormSubmitDirective } from './form-submit.directive';
import { ControlErrorsComponent } from './control-errors/control-errors.component';

@NgModule({
  declarations: [ControlErrorsDirective, FormSubmitDirective, ControlErrorsComponent],
  imports: [CommonModule, FormsModule],
  exports: [ControlErrorsDirective, FormSubmitDirective, ControlErrorsComponent]
})
export class ValidationsModule {}
