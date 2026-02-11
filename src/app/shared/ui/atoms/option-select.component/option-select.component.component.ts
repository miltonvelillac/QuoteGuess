import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { IconsEnum } from 'src/app/core/enums/icons.enum';
import { IconComponent } from '../icon';

enum OptionSelectStatusEnum {
  none = 'none',
  selected = 'selected',
  success = 'success',
  error = 'error'
}

@Component({
  selector: 'app-option-select',
  templateUrl: './option-select.component.component.html',
  styleUrls: ['./option-select.component.component.scss'],
  imports: [
    IconComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionSelectComponentComponent {
  readonly statusValues = OptionSelectStatusEnum;
  readonly icons = IconsEnum;

  id = input.required<string>();
  label = input('');
  optionLabel = input('');
  status = input<OptionSelectStatusEnum>(this.statusValues.none);

  onClick = output<void>();

  icon = computed(() => {
    switch (this.status()) {
      case this.statusValues.error:
        return this.icons.close;
      case this.statusValues.success:
        return this.icons.checkMark;    
      default:
        return '';
    }
  });

  isSelected = computed(() => this.status() === this.statusValues.selected);
  isSuccess = computed(() => this.status() === this.statusValues.success);
  isError = computed(() => this.status() === this.statusValues.error);

}
