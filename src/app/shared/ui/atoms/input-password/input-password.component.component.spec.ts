import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IonInput, IonInputPasswordToggle } from '@ionic/angular/standalone';

import { InputPasswordComponentComponent } from './input-password.component.component';

describe('InputPasswordComponentComponent', () => {
  let component: InputPasswordComponentComponent;
  let fixture: ComponentFixture<InputPasswordComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputPasswordComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputPasswordComponentComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', 'password-input');
    fixture.detectChanges();
  });

  describe('#render', () => {
    it('should create the component', () => {
      // Arrange

      // Act
      const instance = component;

      // Assert
      expect(instance).toBeTruthy();
    });

    it('should render ion-input-password-toggle inside ion-input', () => {
      // Arrange

      // Act
      const toggleElement = fixture.debugElement.query(By.directive(IonInputPasswordToggle));

      // Assert
      expect(toggleElement).toBeTruthy();
    });
  });

  describe('#templateBindings', () => {
    it('should bind input properties into IonInput', () => {
      // Arrange
      const control = new FormControl('my-secret');
      fixture.componentRef.setInput('formField', control);
      fixture.componentRef.setInput('name', 'userPassword');
      fixture.componentRef.setInput('label', 'Password');
      fixture.componentRef.setInput('placeholder', 'Type your password');
      fixture.componentRef.setInput('type', 'password');
      fixture.componentRef.setInput('autofocus', true);
      fixture.detectChanges();
      const ionInput = fixture.debugElement.query(By.directive(IonInput)).componentInstance as IonInput;

      // Act
      const currentName = ionInput.name;
      const currentLabel = ionInput.label;
      const currentPlaceholder = ionInput.placeholder;
      const currentType = ionInput.type;
      const currentAutofocus = ionInput.autofocus;

      // Assert
      expect(currentName).toBe('userPassword');
      expect(currentLabel).toBe('Password');
      expect(currentPlaceholder).toBe('Type your password');
      expect(currentType).toBe('password');
      expect(currentAutofocus).toBeTrue();
    });
  });

  describe('#ngOnInit', () => {
    it('should execute ngOnInit without throwing errors', () => {
      // Arrange

      // Act
      const callNgOnInit = () => component.ngOnInit();

      // Assert
      expect(callNgOnInit).not.toThrow();
    });
  });
});
