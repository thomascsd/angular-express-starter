import { Component, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-control-errors',
  templateUrl: './control-errors.component.html',
  styleUrls: ['./control-errors.component.scss']
})
export class ControlErrorsComponent {
  displayText: string;
  displayHide = true;

  @Input() set text(value) {
    if (value !== this.displayText) {
      this.displayText = value;
      this.displayHide = !value;
      this.cdr.detectChanges();
    }
  }

  constructor(private cdr: ChangeDetectorRef) {}
}
