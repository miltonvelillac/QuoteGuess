import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';

export type AppButtonVariant = 'primary' | 'secondary';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [
    IonButton,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  id = input.required<string>();
  label = input('');
  arialLabel = input('');
  type = input<'button' | 'submit' | 'reset'>('button');
  variant = input<AppButtonVariant>('primary');  
  disabled = input(false);
  expand = input<'block' | 'full' | undefined>(undefined);
  size = input<'small' | 'default' | 'large'>('default');
  rigthIcon = input('');
  leftIcon = input('');

  onClick = output<Event>();

  get fill(): 'solid' | 'outline' {
    return this.variant() === 'secondary' ? 'outline' : 'solid';
  }

  get color(): 'primary' | 'medium' {
    return this.variant() === 'secondary' ? 'medium' : 'primary';
  }
}
