import { ChangeDetectionStrategy, Component, ElementRef, input, output, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonInput, IonItem } from '@ionic/angular/standalone';

export type InputType = 'text' | 'email' | 'password' | 'search' | 'number';
export type InputColors = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark';

@Component({
  selector: 'app-input-component',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonInput,
    IonItem,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  formField = input(new FormControl());
  id = input.required<string>();
  name = input('');
  label = input('');
  placeholder = input('');
  color = input<InputColors>('danger');
  autocomplete = input('on');
  type = input<InputType>('text');
  readonly = input(false);
  clearInput = input(true);
  helperText = input('');
  errorText = input('');
  counter = input(false);
  maxlength = input(undefined as any);
  trimValue = input(true);
  autoFocus = input(false);
  
  onEnter = output<void>();


  @ViewChild('input') inputRef!: ElementRef<HTMLInputElement>;

  onBlur(): void {
    this.trimText();
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  private trimText(): void {
    if (!this.trimValue()) return;
    const value = this.formField().value?.trim() || ''
    this.formField().setValue(value, { emitEvent: false });
  }

}
