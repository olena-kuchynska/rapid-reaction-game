import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { isNil } from 'lodash-es';

export function boundariesValidation(minValue: number, maxValue: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const controlValue = control.value;
    const isNotValidMax = !isNil(maxValue) && controlValue > maxValue;
    const isNotValidMin = !isNil(minValue) && controlValue < minValue;

    return isNotValidMax || isNotValidMin ? { minMax: true } : null;
  };
}
