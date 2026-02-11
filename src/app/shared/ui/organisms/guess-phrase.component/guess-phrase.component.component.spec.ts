import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { OptionSelectStatusEnum } from 'src/app/core/enums/option-select-status.enum';
import { OptionSelectComponentComponent } from '../../atoms/option-select.component/option-select.component.component';
import { GuessPhraseComponentComponent, GuessPhraseOptionModel } from './guess-phrase.component.component';

describe('GuessPhraseComponentComponent', () => {
  let component: GuessPhraseComponentComponent;
  let fixture: ComponentFixture<GuessPhraseComponentComponent>;

  const id = 'guess-phrase';
  const options: GuessPhraseOptionModel[] = [
    { id: 'a', label: 'Option A', optionLabel: 'A', status: OptionSelectStatusEnum.none },
    { id: 'b', label: 'Option B', optionLabel: 'B', status: OptionSelectStatusEnum.none },
    { id: 'c', label: 'Option C', optionLabel: 'C', status: OptionSelectStatusEnum.none },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuessPhraseComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GuessPhraseComponentComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', id);
    fixture.detectChanges();
  });

  describe('#render', () => {
    it('should pass id, label, optionLabel and status to each OptionSelect child', () => {
      // Arrange
      const inputOptions: GuessPhraseOptionModel[] = [
        { id: 'x', label: 'First', optionLabel: '1', status: OptionSelectStatusEnum.none },
        { id: 'y', label: 'Second', optionLabel: '2', status: OptionSelectStatusEnum.success },
      ];
      fixture.componentRef.setInput('options', inputOptions);
      fixture.detectChanges();

      // Act
      const childComponents = fixture.debugElement.queryAll(By.directive(OptionSelectComponentComponent));
      const firstChild = childComponents[0].componentInstance as OptionSelectComponentComponent;
      const secondChild = childComponents[1].componentInstance as OptionSelectComponentComponent;

      // Assert
      expect(childComponents.length).toBe(2);
      expect(firstChild.id()).toBe('guess-phrase__x');
      expect(firstChild.label()).toBe('First');
      expect(firstChild.optionLabel()).toBe('1');
      expect(firstChild.status()).toBe(OptionSelectStatusEnum.none);
      expect(secondChild.status()).toBe(OptionSelectStatusEnum.success);
    });
  });

  describe('#selection', () => {
    it('should store selected options from selectedOptionIds input in an array', () => {
      // Arrange
      fixture.componentRef.setInput('allowMultiple', true);
      fixture.componentRef.setInput('options', options);
      fixture.componentRef.setInput('selectedOptionIds', ['a', 'c']);
      fixture.detectChanges();

      // Act
      const selected = component.selectedOptions();
      const selectedIds = selected.map((option) => option.id);

      // Assert
      expect(selectedIds).toEqual(['a', 'c']);
      expect(component.optionsState().find((option) => option.id === 'a')?.status)
        .toBe(OptionSelectStatusEnum.selected);
      expect(component.optionsState().find((option) => option.id === 'c')?.status)
        .toBe(OptionSelectStatusEnum.selected);
    });

    it('should keep only one option selected when allowMultiple is false', () => {
      // Arrange
      fixture.componentRef.setInput('allowMultiple', false);
      fixture.componentRef.setInput('options', options);
      fixture.detectChanges();
      spyOn(component.selectedOptionIdsChange, 'emit');

      // Act
      component.onOptionClick('a');
      component.onOptionClick('b');

      // Assert
      expect(component.selectedOptions().map((option) => option.id)).toEqual(['b']);
      expect(component.optionsState().find((option) => option.id === 'a')?.status)
        .toBe(OptionSelectStatusEnum.none);
      expect(component.optionsState().find((option) => option.id === 'b')?.status)
        .toBe(OptionSelectStatusEnum.selected);
      expect(component.selectedOptionIdsChange.emit).toHaveBeenCalledTimes(2);
      expect(component.selectedOptionIdsChange.emit).toHaveBeenCalledWith(['a']);
      expect(component.selectedOptionIdsChange.emit).toHaveBeenCalledWith(['b']);
    });

    it('should allow selecting multiple options when allowMultiple is true', () => {
      // Arrange
      fixture.componentRef.setInput('allowMultiple', true);
      fixture.componentRef.setInput('options', options);
      fixture.detectChanges();

      // Act
      component.onOptionClick('a');
      component.onOptionClick('b');

      // Assert
      expect(component.selectedOptions().map((option) => option.id)).toEqual(['a', 'b']);
      expect(component.optionsState().find((option) => option.id === 'a')?.status)
        .toBe(OptionSelectStatusEnum.selected);
      expect(component.optionsState().find((option) => option.id === 'b')?.status)
        .toBe(OptionSelectStatusEnum.selected);
    });

    it('should unselect an already selected option in multiple mode', () => {
      // Arrange
      fixture.componentRef.setInput('allowMultiple', true);
      fixture.componentRef.setInput('options', options);
      fixture.detectChanges();
      component.onOptionClick('a');

      // Act
      component.onOptionClick('a');

      // Assert
      expect(component.selectedOptions()).toEqual([]);
      expect(component.optionsState().find((option) => option.id === 'a')?.status)
        .toBe(OptionSelectStatusEnum.none);
    });

    it('should emit selectedOptionsChange with selected models on click', () => {
      // Arrange
      fixture.componentRef.setInput('allowMultiple', true);
      fixture.componentRef.setInput('options', options);
      fixture.detectChanges();
      spyOn(component.selectedOptionsChange, 'emit');

      // Act
      component.onOptionClick('a');
      component.onOptionClick('b');

      // Assert
      expect(component.selectedOptionsChange.emit).toHaveBeenCalledTimes(2);
      expect(component.selectedOptionsChange.emit).toHaveBeenCalledWith([
        { id: 'a', label: 'Option A', optionLabel: 'A', status: OptionSelectStatusEnum.selected },
      ]);
      expect(component.selectedOptionsChange.emit).toHaveBeenCalledWith([
        { id: 'a', label: 'Option A', optionLabel: 'A', status: OptionSelectStatusEnum.selected },
        { id: 'b', label: 'Option B', optionLabel: 'B', status: OptionSelectStatusEnum.selected },
      ]);
    });

    it('should normalize selectedOptionIds to one value when allowMultiple is false', () => {
      // Arrange
      fixture.componentRef.setInput('allowMultiple', false);
      fixture.componentRef.setInput('options', options);
      fixture.componentRef.setInput('selectedOptionIds', ['c', 'a']);
      fixture.detectChanges();

      // Act
      const selectedIds = component.selectedOptions().map((option) => option.id);

      // Assert
      expect(selectedIds).toEqual(['c']);
      expect(component.optionsState().find((option) => option.id === 'c')?.status)
        .toBe(OptionSelectStatusEnum.selected);
      expect(component.optionsState().find((option) => option.id === 'a')?.status)
        .toBe(OptionSelectStatusEnum.none);
    });

    it('should preserve success and error status when selection changes', () => {
      // Arrange
      const optionsWithResultState: GuessPhraseOptionModel[] = [
        { id: 'a', label: 'Option A', optionLabel: 'A', status: OptionSelectStatusEnum.success },
        { id: 'b', label: 'Option B', optionLabel: 'B', status: OptionSelectStatusEnum.error },
        { id: 'c', label: 'Option C', optionLabel: 'C', status: OptionSelectStatusEnum.none },
      ];
      fixture.componentRef.setInput('allowMultiple', true);
      fixture.componentRef.setInput('options', optionsWithResultState);
      fixture.detectChanges();

      // Act
      component.onOptionClick('c');

      // Assert
      expect(component.optionsState().find((option) => option.id === 'a')?.status)
        .toBe(OptionSelectStatusEnum.success);
      expect(component.optionsState().find((option) => option.id === 'b')?.status)
        .toBe(OptionSelectStatusEnum.error);
      expect(component.optionsState().find((option) => option.id === 'c')?.status)
        .toBe(OptionSelectStatusEnum.selected);
    });
  });
});
