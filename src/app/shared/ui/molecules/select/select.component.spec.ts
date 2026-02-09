import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  clickByTestId,
  queryByTestId,
  textByTestId,
  typeByTestId,
} from '../../../../../../testing/dom-test-helper/dom-test-helpers';
import { SelectComponent, SelectOption } from './select.component';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  const options: SelectOption[] = [
    { id: 'tesla', title: 'Nikola Tesla', subtitle: 'Inventor' },
    { id: 'einstein', title: 'Albert Einstein', subtitle: 'Theoretical Physicist' },
    { id: 'philosophy', title: 'Philosophy', subtitle: 'The nature of existence' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', 'duel-select');
    fixture.componentRef.setInput('segments', ['Person', 'Category']);
    fixture.componentRef.setInput('selectedSegment', 'Person');
    fixture.componentRef.setInput('options', options);
    fixture.componentRef.setInput('selectedOptionId', 'einstein');
    fixture.detectChanges();
  });

  describe('#render', () => {
    it('should render selected option title and subtitle', () => {
      // Arrange

      // Act
      const content = textByTestId(fixture, 'duel-select-selected');

      // Assert
      expect(content).toContain('Albert Einstein');
      expect(content).toContain('Theoretical Physicist');
    });
  });

  describe('#toggleOpen', () => {
    it('should open dropdown when selected area is clicked', () => {
      // Arrange

      // Act
      clickByTestId(fixture, 'duel-select-selected');

      // Assert
      expect(queryByTestId(fixture, 'duel-select-dropdown')).not.toBeNull();
    });
  });

  describe('#onSearchInput', () => {
    it('should filter options by title and subtitle', () => {
      // Arrange
      clickByTestId(fixture, 'duel-select-selected');

      // Act
      typeByTestId(fixture, 'duel-select-search', 'nature');

      // Assert
      expect(queryByTestId(fixture, 'duel-select-option-philosophy')).not.toBeNull();
      expect(queryByTestId(fixture, 'duel-select-option-einstein')).toBeNull();
      expect(queryByTestId(fixture, 'duel-select-option-tesla')).toBeNull();
    });

    it('should show empty state when there are no search results', () => {
      // Arrange
      clickByTestId(fixture, 'duel-select-selected');

      // Act
      typeByTestId(fixture, 'duel-select-search', 'missing-value');

      // Assert
      expect(textByTestId(fixture, 'duel-select-empty')).toContain('No results');
    });
  });

  describe('#onOptionClick', () => {
    it('should emit optionChanged and close dropdown after selecting an option', () => {
      // Arrange
      clickByTestId(fixture, 'duel-select-selected');
      spyOn(component.optionChanged, 'emit');

      // Act
      clickByTestId(fixture, 'duel-select-option-tesla');

      // Assert
      expect(component.optionChanged.emit).toHaveBeenCalledOnceWith('tesla');
      expect(queryByTestId(fixture, 'duel-select-dropdown')).toBeNull();
    });
  });
});
