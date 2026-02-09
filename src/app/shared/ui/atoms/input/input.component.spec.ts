import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { IonInput } from '@ionic/angular/standalone';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', 'search-input');
    fixture.detectChanges();
  });

  describe('#customCounterFormatter', () => {
    it('should return remaining character count text', () => {
      // Arrange

      // Act
      const result = component.customCounterFormatter(4, 10);

      // Assert
      expect(result).toBe('6 characters remaining');
    });
  });

  describe('#onBlur', () => {
    it('should trim the form control value when trimValue is true', () => {
      // Arrange
      const control = new FormControl('  Einstein  ');
      fixture.componentRef.setInput('formField', control);
      fixture.componentRef.setInput('trimValue', true);
      fixture.detectChanges();

      // Act
      component.onBlur();

      // Assert
      expect(control.value).toBe('Einstein');
    });

    it('should not trim the form control value when trimValue is false', () => {
      // Arrange
      const control = new FormControl('  Einstein  ');
      fixture.componentRef.setInput('formField', control);
      fixture.componentRef.setInput('trimValue', false);
      fixture.detectChanges();

      // Act
      component.onBlur();

      // Assert
      expect(control.value).toBe('  Einstein  ');
    });
  });

  describe('#onEnter', () => {
    it('should emit onEnter when enter key event is triggered on ion-input', () => {
      // Arrange
      spyOn(component.onEnter, 'emit');
      const ionInputDebug = fixture.debugElement.query(By.css('ion-input'));

      // Act
      ionInputDebug.triggerEventHandler(
        'keydown.enter',
        new KeyboardEvent('keydown', { key: 'Enter' })
      );

      // Assert
      expect(component.onEnter.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe('#templateBindings', () => {
    it('should bind key inputs into ion-input instance', () => {
      // Arrange
      fixture.componentRef.setInput('label', 'Search');
      fixture.componentRef.setInput('placeholder', 'Type value');
      fixture.componentRef.setInput('type', 'search');
      fixture.componentRef.setInput('readonly', true);
      fixture.componentRef.setInput('counter', true);
      fixture.componentRef.setInput('maxlength', 40);
      fixture.detectChanges();
      const ionInput = fixture.debugElement.query(By.directive(IonInput)).componentInstance as IonInput;

      // Act
      const currentLabel = ionInput.label;
      const currentPlaceholder = ionInput.placeholder;
      const currentType = ionInput.type;
      const currentReadonly = ionInput.readonly;
      const currentCounter = ionInput.counter;
      const currentMaxlength = ionInput.maxlength;

      // Assert
      expect(currentLabel).toBe('Search');
      expect(currentPlaceholder).toBe('Type value');
      expect(currentType).toBe('search');
      expect(currentReadonly).toBeTrue();
      expect(currentCounter).toBeTrue();
      expect(currentMaxlength).toBe(40);
    });
  });
});
