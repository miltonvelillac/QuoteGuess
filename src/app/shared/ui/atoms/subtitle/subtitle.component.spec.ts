import { ComponentFixture, TestBed } from '@angular/core/testing';

import { getByTestId, textByTestId } from '../../../../../../testing/dom-test-helper/dom-test-helpers';
import { SubtitleComponent } from './subtitle.component';

describe('SubtitleComponent', () => {
  let component: SubtitleComponent;
  let fixture: ComponentFixture<SubtitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubtitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubtitleComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', 'main-subtitle');
    fixture.detectChanges();
  });

  describe('#render', () => {
    it('should render provided subtitle text', () => {
      // Arrange
      fixture.componentRef.setInput('content', 'Choose person or category');
      fixture.detectChanges();

      // Act
      const content = textByTestId(fixture, 'main-subtitle');

      // Assert
      expect(content).toContain('Choose person or category');
    });
  });

  describe('#align', () => {
    it('should apply right alignment class', () => {
      // Arrange
      fixture.componentRef.setInput('align', 'right');
      fixture.detectChanges();

      // Act
      const subtitleElement = getByTestId<HTMLElement>(fixture, 'main-subtitle');

      // Assert
      expect(subtitleElement.classList.contains('app-subtitle--right')).toBeTrue();
    });
  });
});
