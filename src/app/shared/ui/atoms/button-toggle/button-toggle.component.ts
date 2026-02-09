import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.scss'],
  standalone: true,
  imports: [IonButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonToggleComponent {
  readonly id = input.required<string>();
  readonly ariaLabel = input('');
  readonly labelOn = input('On');
  readonly labelOff = input('Off');
  readonly checked = input(false);
  readonly disabled = input(false);
  readonly size = input<'small' | 'default' | 'large'>('default');

  readonly toggled = output<boolean>();

  private readonly currentValue = signal(false);

  constructor() {
    effect(() => {
      this.currentValue.set(this.checked());
    });
  }

  get value(): boolean {
    return this.currentValue();
  }

  get label(): string {
    return this.value ? this.labelOn() : this.labelOff();
  }

  get fill(): 'solid' | 'outline' {
    return this.value ? 'solid' : 'outline';
  }

  get color(): 'primary' | 'medium' {
    return this.value ? 'primary' : 'medium';
  }

  onToggle(): void {
    if (this.disabled()) {
      return;
    }

    const nextValue = !this.value;
    this.currentValue.set(nextValue);
    this.toggled.emit(nextValue);
  }
}
