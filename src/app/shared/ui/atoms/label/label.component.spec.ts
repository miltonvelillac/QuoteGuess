import { ComponentFixture, TestBed } from '@angular/core/testing';

import { getByTestId, textByTestId } from '../../../../../../testing/dom-test-helper/dom-test-helpers';
import { LabelComponent } from './label.component';

describe('LabelComponent', () => {
  let component: LabelComponent;
  let fixture: ComponentFixture<LabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LabelComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', 'slot-label');
    fixture.detectChanges();
  });

  describe('#render', () => {
    it('should render provided label text', () => {
      // Arrange
      fixture.componentRef.setInput('content', 'Slot A');
      fixture.detectChanges();

      // Act
      const content = textByTestId(fixture, 'slot-label');

      // Assert
      expect(content).toContain('Slot A');
    });
  });

  describe('#forId', () => {
    it('should set for attribute when forId input is provided', () => {
      // Arrange
      fixture.componentRef.setInput('forId', 'user-name-input');
      fixture.detectChanges();

      // Act
      const labelElement = getByTestId<HTMLElement>(fixture, 'slot-label');

      // Assert
      expect(labelElement.getAttribute('for')).toBe('user-name-input');
    });
  });
});
