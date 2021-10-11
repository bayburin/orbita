import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Валидатор проверяет размер файла
 *
 * @param maxSize - максимально допустимый размер файла
 */
export function maxFileSizeValidator(maxSize: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file: File = control.value;

    if (file) {
      return file.size > maxSize ? { valid: false, maxValue: maxSize } : null;
    } else {
      return null;
    }
  };
}
