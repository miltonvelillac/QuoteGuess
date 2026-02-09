import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

import { AppTextAlign } from '../title/title.component';

@Component({
  selector: 'app-text-component',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  standalone: true,
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent {
  readonly id = input.required<string>();
  readonly content = input('');
  readonly align = input<AppTextAlign>('left');
  readonly muted = input(false);
}
