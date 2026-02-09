import { ComponentFixture, TestBed } from '@angular/core/testing';

import { getByTestId, textByTestId } from '../../../../../../testing/dom-test-helper/dom-test-helpers';
import { TitleComponent } from './title.component';

describe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TitleComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', 'main-title');
    fixture.detectChanges();
  });

  describe('#render', () => {
    it('should render provided content', () => {
      // Arrange
      fixture.componentRef.setInput('content', 'Duel Configuration');
      fixture.detectChanges();

      // Act
      const content = textByTestId(fixture, 'main-title');

      // Assert
      expect(content).toContain('Duel Configuration');
    });

    it('should render h1 when level is 1', () => {
      // Arrange
      fixture.componentRef.setInput('content', 'Main');
      fixture.componentRef.setInput('level', 1);
      fixture.detectChanges();

      // Act
      const titleElement = getByTestId<HTMLElement>(fixture, 'main-title');

      // Assert
      expect(titleElement.tagName).toBe('H1');
    });
  });

  describe('#align', () => {
    it('should apply center alignment class', () => {
      // Arrange
      fixture.componentRef.setInput('align', 'center');
      fixture.detectChanges();

      // Act
      const titleElement = getByTestId<HTMLElement>(fixture, 'main-title');

      // Assert
      expect(titleElement.classList.contains('app-title--center')).toBeTrue();
    });
  });
});
