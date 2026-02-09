import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ButtonComponent } from '../../shared/ui/atoms/button';
import { IconComponent } from '../../shared/ui/atoms/icon';
import { CardComponent } from '../../shared/ui/molecules/card';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ButtonComponent, IconComponent, CardComponent],
})
export class HomePage {
  constructor() {}
}
