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
import { filter, first, map } from 'rxjs/operators';
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
        const errors = formGroup['customValidateErrors'] as BehaviorSubject<ShortValidationErrors>;
        // console.log(errors);

        errors
          .asObservable()
          .pipe(
            map(shortErrors => shortErrors[key]),
            first()
          )
          .subscribe(value => {
            console.log(value);

            if (value) {
              this.setError(value);
            } else {
              this.setError(null);
            }
          });
      });
  }

  private setError(message: string) {
    const factory = this.resolver.resolveComponentFactory(ControlErrorsComponent);
    this.vcf.clear();
    this.ref = this.vcf.createComponent(factory);
    this.ref.instance.text = message;
  }

  ngOnDestroy(): void {}
}
