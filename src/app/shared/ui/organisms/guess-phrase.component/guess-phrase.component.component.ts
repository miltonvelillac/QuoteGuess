import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { OptionSelectStatusEnum } from 'src/app/core/enums/option-select-status.enum';
import { OptionSelectComponentComponent } from '../../atoms/option-select.component/option-select.component.component';

export interface GuessPhraseOptionModel {
  id: string;
  label: string;
  optionLabel?: string;
  status: OptionSelectStatusEnum;
}

@Component({
  selector: 'app-guess-phrase.component',
  templateUrl: './guess-phrase.component.component.html',
  styleUrls: ['./guess-phrase.component.component.scss'],
  standalone: true,
  imports: [OptionSelectComponentComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuessPhraseComponentComponent {
  readonly statusValues = OptionSelectStatusEnum;

  readonly id = input.required<string>();
  readonly allowMultiple = input(false);
  readonly options = input<GuessPhraseOptionModel[]>([]);
  readonly selectedOptionIds = input<string[]>([]);

  readonly selectedOptionIdsChange = output<string[]>();
  readonly selectedOptionsChange = output<GuessPhraseOptionModel[]>();

  readonly optionsState = signal<GuessPhraseOptionModel[]>([]);
  readonly selectedOptions = signal<GuessPhraseOptionModel[]>([]);

  private readonly selectedIdsState = signal<string[]>([]);

  constructor() {
    effect(
      () => this.syncSelectionStateFromInputs(),
      { allowSignalWrites: true }
    );
  }

  onOptionClick(id: string): void {
    const currentSelection = this.selectedIdsState();
    const isSelected = currentSelection.includes(id);

    const nextSelectedIds = this.allowMultiple()
      ? (isSelected
          ? currentSelection.filter((selectedId) => selectedId !== id)
          : [...currentSelection, id])
      : (isSelected ? [] : [id]);

    this.selectedIdsState.set(nextSelectedIds);

    const nextOptions = this.applySelectionStatus(this.options(), nextSelectedIds);
    this.optionsState.set(nextOptions);
    this.updateSelectedOptions(nextOptions, nextSelectedIds);

    this.selectedOptionIdsChange.emit(nextSelectedIds);
    this.selectedOptionsChange.emit(this.selectedOptions());
  }

  private normalizeSelectedIds(selectedIds: string[]): string[] {
    const uniqueIds = [...new Set(selectedIds)];

    if (!this.allowMultiple()) {
      return uniqueIds.length > 0 ? [uniqueIds[0]] : [];
    }

    return uniqueIds;
  }

  private syncSelectionStateFromInputs(): void {
    const sourceOptions = this.options();
    const selectedFromInput = this.selectedOptionIds();
    const selectedFromStatus = sourceOptions
      .filter((option) => option.status === this.statusValues.selected)
      .map((option) => option.id);

    const normalizedSelectedIds = this.normalizeSelectedIds([
      ...selectedFromInput,
      ...selectedFromStatus,
    ]);

    this.selectedIdsState.set(normalizedSelectedIds);

    const nextOptions = this.applySelectionStatus(sourceOptions, normalizedSelectedIds);
    this.optionsState.set(nextOptions);
    this.updateSelectedOptions(nextOptions, normalizedSelectedIds);
  }

  private applySelectionStatus(
    options: GuessPhraseOptionModel[],
    selectedIds: string[]
  ): GuessPhraseOptionModel[] {
    return options.map((option) => {
      if (option.status === this.statusValues.success || option.status === this.statusValues.error) {
        return option;
      }

      return {
        ...option,
        status: selectedIds.includes(option.id) ? this.statusValues.selected : this.statusValues.none,
      };
    });
  }

  private updateSelectedOptions(options: GuessPhraseOptionModel[], selectedIds: string[]): void {
    const values = options.filter((option) => selectedIds.includes(option.id));
    this.selectedOptions.set(values);
  }

}
