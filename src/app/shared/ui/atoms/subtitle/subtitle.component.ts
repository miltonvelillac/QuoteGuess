import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

import { AppTextAlign } from '../title/title.component';

@Component({
  selector: 'app-subtitle-component',
  templateUrl: './subtitle.component.html',
  styleUrls: ['./subtitle.component.scss'],
  standalone: true,
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubtitleComponent {
  readonly id = input.required<string>();
  readonly label = input('');
  readonly align = input<AppTextAlign>('left');
}
