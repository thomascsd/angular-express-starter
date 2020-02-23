import {
  Directive,
  OnInit,
  Optional,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentRef
} from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { NgControl } from '@angular/forms';
import { merge } from 'rxjs';
import { FormSubmitDirective } from './form-submit.directive';
import { ControlErrorsComponent } from './control-errors/control-errors.component';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[formControl], [formControlName]'
})
export class ControlErrorsDirective implements OnInit {
  ref: ComponentRef<ControlErrorsComponent>;

  constructor(
    private control: NgControl,
    @Optional() private formSubmit: FormSubmitDirective,
    private resolver: ComponentFactoryResolver,
    private vcf: ViewContainerRef
  ) {}

  ngOnInit(): void {
    merge(this.control.valueChanges, this.formSubmit.submit$)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        const errors = this.control.errors;
        console.log(errors);
        if (errors) {
        } else if (this.ref) {
          this.setError(null);
        }
      });
  }

  private setError(message: string) {
    const factory = this.resolver.resolveComponentFactory(ControlErrorsComponent);
    this.ref = this.vcf.createComponent(factory);
    this.ref.instance.text = message;
  }
}
