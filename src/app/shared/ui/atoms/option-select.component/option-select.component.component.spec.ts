import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { IconComponent } from '../icon';
import { OptionSelectComponentComponent } from './option-select.component.component';

describe('OptionSelectComponentComponent', () => {
  let component: OptionSelectComponentComponent;
  let fixture: ComponentFixture<OptionSelectComponentComponent>;

  const id = 'answer-option';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionSelectComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OptionSelectComponentComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', id);
    fixture.detectChanges();
  });

  describe('#render', () => {
    it('should render label and optionLabel when status is none', () => {
      // Arrange
      fixture.componentRef.setInput('label', 'A');
      fixture.componentRef.setInput('optionLabel', 'B');
      fixture.detectChanges();
      const nativeElement = fixture.nativeElement as HTMLElement;

      // Act
      const label = nativeElement.querySelector(`#${id}__Label`);
      const option = nativeElement.querySelector(`#${id}__label`);
      const icon = fixture.debugElement.query(By.directive(IconComponent));

      // Assert
      expect(label?.textContent?.trim()).toBe('A');
      expect(option?.textContent?.trim()).toBe('B');
      expect(icon).toBeNull();
    });

    it('should render check icon when status is success', () => {
      // Arrange
      fixture.componentRef.setInput('status', component.statusValues.success);
      fixture.detectChanges();

      // Act
      const iconDebugEl = fixture.debugElement.query(By.directive(IconComponent));
      const icon = iconDebugEl.componentInstance as IconComponent;

      // Assert
      expect(icon.id()).toBe(`${id}__Icon`);
      expect(icon.name()).toBe(component.icons.checkMark);
    });

    it('should render close icon when status is error', () => {
      // Arrange
      fixture.componentRef.setInput('status', component.statusValues.error);
      fixture.detectChanges();

      // Act
      const iconDebugEl = fixture.debugElement.query(By.directive(IconComponent));
      const icon = iconDebugEl.componentInstance as IconComponent;

      // Assert
      expect(icon.id()).toBe(`${id}__Icon`);
      expect(icon.name()).toBe(component.icons.close);
    });
  });

  describe('#classesByStatus', () => {
    it('should apply selected modifier classes when status is selected', () => {
      // Arrange
      fixture.componentRef.setInput('status', component.statusValues.selected);
      fixture.detectChanges();
      const nativeElement = fixture.nativeElement as HTMLElement;

      // Act
      const container = nativeElement.querySelector(`#${id}`);
      const option = nativeElement.querySelector(`#${id}__label`);

      // Assert
      expect(container?.classList.contains('container--selected')).toBeTrue();
      expect(option?.classList.contains('option--selected')).toBeTrue();
    });

    it('should apply success modifier classes when status is success', () => {
      // Arrange
      fixture.componentRef.setInput('status', component.statusValues.success);
      fixture.detectChanges();
      const nativeElement = fixture.nativeElement as HTMLElement;

      // Act
      const container = nativeElement.querySelector(`#${id}`);
      const option = nativeElement.querySelector(`#${id}__label`);

      // Assert
      expect(container?.classList.contains('container--success')).toBeTrue();
      expect(option?.classList.contains('option--success')).toBeTrue();
    });

    it('should apply error modifier classes when status is error', () => {
      // Arrange
      fixture.componentRef.setInput('status', component.statusValues.error);
      fixture.detectChanges();
      const nativeElement = fixture.nativeElement as HTMLElement;

      // Act
      const container = nativeElement.querySelector(`#${id}`);
      const option = nativeElement.querySelector(`#${id}__label`);

      // Assert
      expect(container?.classList.contains('container--error')).toBeTrue();
      expect(option?.classList.contains('option--error')).toBeTrue();
    });
  });

  describe('#onClick', () => {
    it('should emit onClick when container is clicked', () => {
      // Arrange
      spyOn(component.onClick, 'emit');
      const nativeElement = fixture.nativeElement as HTMLElement;
      const button = nativeElement.querySelector(`#${id}`) as HTMLButtonElement | null;

      // Act
      button?.click();

      // Assert
      expect(component.onClick.emit).toHaveBeenCalledTimes(1);
    });
  });
});
