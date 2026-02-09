import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

export type AppTextAlign = 'left' | 'center' | 'right';

@Component({
  selector: 'app-title-component',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  standalone: true,
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent {
  readonly id = input.required<string>();
  readonly label = input('');
  readonly level = input<1 | 2 | 3>(2);
  readonly align = input<AppTextAlign>('left');
}
