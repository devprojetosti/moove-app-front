import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  form: FormGroup;

  @Input() control: string;
  constructor() {}

  ngOnInit() {}

  get getError(): Observable<any> {
    if (!this.form) {
      return of('');
    }
    const formControl = this.form.get(this.control);
    if (
      !formControl ||
      formControl.valid ||
      formControl.disabled ||
      (formControl.pristine && formControl.untouched)
    ) {
      return of('');
    }
    const error = of(formControl.errors.invalid);
    return error.pipe(debounceTime(400));
  }
}
