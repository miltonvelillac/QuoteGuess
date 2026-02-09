import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconComponent } from './icon.component';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', 'icon-test');
    fixture.componentRef.setInput('name', 'star');
    fixture.detectChanges();
  });

  describe('#inputs', () => {
    it('should use "dark" as default color', () => {
      // Arrange

      // Act
      const result = component.color();

      // Assert
      expect(result).toBe('dark');
    });

    it('should use false as default clickable value', () => {
      // Arrange

      // Act
      const result = component.clickable();

      // Assert
      expect(result).toBeFalse();
    });
  });

  describe('#onClick', () => {
    it('should emit pressed event when clickable is true', () => {
      // Arrange
      const event = new MouseEvent('click');
      fixture.componentRef.setInput('clickable', true);
      fixture.detectChanges();
      spyOn(component.pressed, 'emit');

      // Act
      component.onClick(event);

      // Assert
      expect(component.pressed.emit).toHaveBeenCalledOnceWith(event);
    });

    it('should not emit pressed event when clickable is false', () => {
      // Arrange
      const event = new MouseEvent('click');
      fixture.componentRef.setInput('clickable', false);
      fixture.detectChanges();
      spyOn(component.pressed, 'emit');

      // Act
      component.onClick(event);

      // Assert
      expect(component.pressed.emit).not.toHaveBeenCalled();
    });
  });
});
