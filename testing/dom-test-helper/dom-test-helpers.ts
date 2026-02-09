import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

type Maybe<T> = T | null;

export function getByTestId<T extends Element>(
  fixture: ComponentFixture<unknown>,
  testId: string
): T {
  const debugEl = fixture.debugElement.query(By.css(`[data-testid="${testId}"]`));

  if (!debugEl) {
    throw new Error(`Element with data-testid="${testId}" was not found.`);
  }

  return debugEl.nativeElement as T;
}

export function queryByTestId<T extends Element>(
  fixture: ComponentFixture<unknown>,
  testId: string
): Maybe<T> {
  const debugEl = fixture.debugElement.query(By.css(`[data-testid="${testId}"]`));
  return debugEl ? (debugEl.nativeElement as T) : null;
}

export function getAllByTestId<T extends Element>(
  fixture: ComponentFixture<unknown>,
  testId: string
): T[] {
  return fixture.debugElement
    .queryAll(By.css(`[data-testid="${testId}"]`))
    .map((debugEl) => debugEl.nativeElement as T);
}

export function clickByTestId(
  fixture: ComponentFixture<unknown>,
  testId: string,
  detectChanges = true
): void {
  const element = getByTestId<HTMLElement>(fixture, testId);
  element.click();

  if (detectChanges) {
    fixture.detectChanges();
  }
}

export function typeByTestId(
  fixture: ComponentFixture<unknown>,
  testId: string,
  value: string,
  detectChanges = true
): void {
  const element = getByTestId<HTMLInputElement | HTMLTextAreaElement>(fixture, testId);
  element.value = value;
  element.dispatchEvent(new Event('input'));

  if (detectChanges) {
    fixture.detectChanges();
  }
}

export function textByTestId(
  fixture: ComponentFixture<unknown>,
  testId: string
): string {
  return getByTestId<HTMLElement>(fixture, testId).textContent?.trim() ?? '';
}
