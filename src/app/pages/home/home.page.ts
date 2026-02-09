import { Component, signal } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ButtonComponent } from '../../shared/ui/atoms/button';
import { IconComponent } from '../../shared/ui/atoms/icon';
import { CardComponent } from '../../shared/ui/molecules/card';
import { SelectComponent, SelectOption } from '../../shared/ui/molecules/select';
import { InputComponent } from 'src/app/shared/ui/atoms/input';
import { InputPasswordComponentComponent } from 'src/app/shared/ui/atoms/input-password/input-password.component.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ButtonComponent,
    IconComponent,
    CardComponent,
    SelectComponent,
    InputComponent,
    InputPasswordComponentComponent
  ],
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
