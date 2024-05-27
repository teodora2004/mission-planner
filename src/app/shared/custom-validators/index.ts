import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function canvasBoundsValidator(maxSize: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (isNaN(value) || value < 0 || value > maxSize) {
      return { outOfBounds: true };
    }
    return null;
  };
}
