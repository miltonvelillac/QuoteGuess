import { Pipe, PipeTransform } from '@angular/core';

export type SortDirection = 'asc' | 'desc';

@Pipe({
  name: 'sortBy',
  standalone: true,
})
export class SortPipe implements PipeTransform {
  transform<T>(
    value: T[] | null | undefined,
    property: keyof T,
    direction: SortDirection = 'asc'
  ): T[] {
    if (!value || value.length <= 1) {
      return value ?? [];
    }

    const sorted = [...value].sort((a, b) => {
      const first = this.toComparable(a[property]);
      const second = this.toComparable(b[property]);

      if (first < second) {
        return -1;
      }

      if (first > second) {
        return 1;
      }

      return 0;
    });

    return direction === 'desc' ? sorted.reverse() : sorted;
  }

  private toComparable(value: unknown): string | number {
    if (typeof value === 'number') {
      return value;
    }

    return String(value ?? '').toLowerCase();
  }
}
