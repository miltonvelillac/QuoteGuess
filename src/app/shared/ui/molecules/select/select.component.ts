import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

import { SortPipe } from '../../../pipes';
import { IconComponent } from '../../atoms/icon';
import { IconsEnum } from 'src/app/core/enums/icons.enum';
import { TitleComponent } from '../../atoms/title';
import { SubtitleComponent } from '../../atoms/subtitle';

export interface SelectOption {
  id: string;
  title: string;
  subtitle?: string;
  iconName?: string;
}

@Component({
  selector: 'app-select-component',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  standalone: true,
  imports: [
    IconComponent,
    TitleComponent,
    SubtitleComponent,
    SortPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  readonly icons = IconsEnum;

  readonly id = input.required<string>();
  readonly options = input<SelectOption[]>([]);
  readonly selectedOptionId = input<string | null>(null);
  readonly searchPlaceholder = input('Search...');

  readonly optionChanged = output<string>();

  readonly isOpen = signal(false);
  readonly searchTerm = signal('');

  readonly selectedOption = computed(() =>
    this.options().find((option) => option.id === this.selectedOptionId()) ?? null
  );

  readonly filteredOptions = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const values = this.options();

    if (!term) {
      return values;
    }

    return values.filter((option) => {
      const title = option.title.toLowerCase();
      const subtitle = (option.subtitle ?? '').toLowerCase();

      return title.includes(term) || subtitle.includes(term);
    });
  });

  toggleOpen(): void {
    this.isOpen.update((value) => !value);
  }

  close(): void {
    this.isOpen.set(false);
  }

  onSearchInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement | null)?.value ?? '';
    this.searchTerm.set(inputValue);
  }

  onOptionClick(id: string): void {
    this.optionChanged.emit(id);
    this.searchTerm.set('');
    this.close();
  }
}
