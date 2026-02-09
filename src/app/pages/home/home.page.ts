import { Component, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ButtonComponent } from '../../shared/ui/atoms/button';
import { IconComponent } from '../../shared/ui/atoms/icon';
import { CardComponent } from '../../shared/ui/molecules/card';
import { SelectComponent, SelectOption } from '../../shared/ui/molecules/select';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ButtonComponent, IconComponent, CardComponent, SelectComponent, ButtonComponent],
})
export class HomePage {
  readonly selectedSegment = signal('Person');
  readonly selectedOptionId = signal<string | null>('einstein');

  readonly demoOptions: SelectOption[] = [
    { id: 'einstein', title: 'Albert Einstein', subtitle: 'Theoretical Physicist', iconName: 'person' },
    { id: 'tesla', title: 'Nikola Tesla', subtitle: 'Inventor and Engineer', iconName: 'person' },
    { id: 'philosophy', title: 'Philosophy', subtitle: 'The nature of existence', iconName: 'sparkles' },
    { id: 'literature', title: 'Literature', subtitle: 'Stories and writing', iconName: 'book' },
  ];

  onSegmentChange(segment: string): void {
    this.selectedSegment.set(segment);
  }

  onOptionChange(id: string): void {
    this.selectedOptionId.set(id);
  }
}
