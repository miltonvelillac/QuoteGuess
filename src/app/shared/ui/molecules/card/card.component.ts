import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-card-component',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  readonly id = input.required<string>();
  readonly title = input('');
  readonly subtitle = input('');
  readonly clickable = input(false);

  readonly pressed = output<Event>();

  onCardClick(event: Event): void {
    if (!this.clickable()) {
      return;
    }

    this.pressed.emit(event);
  }
}
