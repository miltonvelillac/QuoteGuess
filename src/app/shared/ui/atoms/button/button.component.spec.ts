import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    fixture.componentRef.setInput('id', 'testId');
    component = fixture.componentInstance;
  });

  describe('#fill', () => {
    it('should return "solid" when variant is primary', () => {
      // Arrange
      fixture.componentRef.setInput('variant', 'primary');
      fixture.detectChanges();

      // Act
      const result = component.fill;

      // Assert
      expect(result).toBe('solid');
    });

    it('should return "outline" when variant is secondary', () => {
      // Arrange
      fixture.componentRef.setInput('variant', 'secondary');
      fixture.detectChanges();

      // Act
      const result = component.fill;

      // Assert
      expect(result).toBe('outline');
    });
  });

  describe('#color', () => {
    it('should return "primary" when variant is primary', () => {
      // Arrange
      fixture.componentRef.setInput('variant', 'primary');
      fixture.detectChanges();

      // Act
      const result = component.color;

      // Assert
      expect(result).toBe('primary');
    });

    it('should return "medium" when variant is secondary', () => {
      // Arrange
      fixture.componentRef.setInput('variant', 'secondary');
      fixture.detectChanges();

      // Act
      const result = component.color;

      // Assert
      expect(result).toBe('medium');
    });
  });
});
