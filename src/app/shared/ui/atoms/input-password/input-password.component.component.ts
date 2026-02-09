import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonInput, IonInputPasswordToggle, IonItem } from '@ionic/angular/standalone';


@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.component.html',
  styleUrls: ['./input-password.component.component.scss'],
  imports: [
    ReactiveFormsModule,
    IonItem,
    IonInput,
    IonInputPasswordToggle
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputPasswordComponentComponent implements OnInit {
  id = input.required<string>();
  formField = input(new FormControl());
  name = input('');
  label = input('');
  placeholder = input('');
  type = input('password');
  slot = input('end');
  autofocus = input(false);

  constructor() { }

  ngOnInit() { }

}
