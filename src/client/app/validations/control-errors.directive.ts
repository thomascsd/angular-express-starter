import {
  Directive,
  OnInit,
  Optional,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentRef,
  OnDestroy
} from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { NgControl, FormGroupDirective } from '@angular/forms';
import { ShortValidationErrors } from 'ngx-dynamic-form-builder';
import { merge, BehaviorSubject } from 'rxjs';
import { FormSubmitDirective } from './form-submit.directive';
import { ControlErrorsComponent } from './control-errors/control-errors.component';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[formControl], [formControlName]'
})
export class ControlErrorsDirective implements OnInit, OnDestroy {
  ref: ComponentRef<ControlErrorsComponent>;

  constructor(
    private control: NgControl,
    @Optional() private formSubmit: FormSubmitDirective,
    @Optional() private formGroup: FormGroupDirective,
    private resolver: ComponentFactoryResolver,
    private vcf: ViewContainerRef
  ) {}

  ngOnInit(): void {
    merge(this.control.valueChanges, this.formSubmit.submit$)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        const key = this.control.name;
        const formGroup = this.formGroup.control;

        console.log(this.control);

        const errors = formGroup['customValidateErrors'] as BehaviorSubject<ShortValidationErrors>;
        console.log(errors);

        errors.subscribe((shortError: ShortValidationErrors) => {
          const obj = shortError[key];

          console.log(shortError);

          if (obj) {
            console.log(obj[0]);
            this.setError(obj[0]);
          } else if (this.ref) {
            this.setError(null);
          }
        });
      });
  }

  private setError(message: string) {
    const factory = this.resolver.resolveComponentFactory(ControlErrorsComponent);
    this.ref = this.vcf.createComponent(factory);
    this.ref.instance.text = message;
  }

  ngOnDestroy(): void {}
}
