import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-icon-component',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  standalone: true,
  imports: [IonIcon],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
  readonly id = input.required<string>();
  readonly name = input.required<string>();
  readonly color = input<'primary' | 'secondary' | 'medium' | 'dark'>('dark');
  readonly size = input<'small' | 'large' | undefined>(undefined);
  readonly clickable = input(false);

  readonly pressed = output<Event>();

  onClick(event: Event): void {
    if (!this.clickable()) {
      return;
    }
    this.pressed.emit(event);
  }
}
