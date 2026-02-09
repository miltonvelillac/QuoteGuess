import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

import { AppTextAlign } from '../title/title.component';

@Component({
  selector: 'app-label-component',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  standalone: true,
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent {
  readonly id = input.required<string>();
  readonly content = input('');
  readonly forId = input('');
  readonly align = input<AppTextAlign>('left');
}
