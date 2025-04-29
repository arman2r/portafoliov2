import { Directive, ElementRef, HostListener, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[appSingleCharInput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SingleChartInputDirective),
      multi: true
    }
  ]
})
export class SingleChartInputDirective implements ControlValueAccessor {
  private onChange!: (val: string) => void;
  private onTouched!: () => void;

  constructor(private el: ElementRef<HTMLInputElement>) { }

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Limitar a un solo carácter
    if (value.length > 1) {
      input.value = value.charAt(0);
      this.onChange(input.value);
    }
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;

    // Manejar tecla backspace
    if (event.key === 'Backspace' && input.value === '') {
      this.moveToPrevious(input);
    }
  }

  private moveToPrevious(currentInput: HTMLInputElement): void {
    const previousInput = this.findPreviousInput(currentInput);
    if (previousInput) {
      previousInput.focus();
      previousInput.select();
    }
  }

  private findPreviousInput(currentInput: HTMLInputElement): HTMLInputElement | null {
    const inputs = Array.from(document.querySelectorAll('input[appSingleCharInput]'));
    const currentIndex = inputs.indexOf(currentInput);
    return currentIndex > 0 ? inputs[currentIndex - 1] as HTMLInputElement : null;
  }

  writeValue(value: string): void {
    this.el.nativeElement.value = value || '';
  }

  registerOnChange(fn: (val: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
