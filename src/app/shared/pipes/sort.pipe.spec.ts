import { SortPipe } from './sort.pipe';

describe('SortPipe', () => {
  let pipe: SortPipe;

  beforeEach(() => {
    pipe = new SortPipe();
  });

  describe('#transform', () => {
    it('should return an empty array when value is undefined', () => {
      // Arrange

      // Act
      const result = pipe.transform(undefined, 'title');

      // Assert
      expect(result).toEqual([]);
    });

    it('should sort string values ascending ignoring case', () => {
      // Arrange
      const values = [
        { id: '2', title: 'zeta' },
        { id: '1', title: 'Alpha' },
        { id: '3', title: 'beta' },
      ];

      // Act
      const result = pipe.transform(values, 'title', 'asc');

      // Assert
      expect(result.map((item) => item.title)).toEqual(['Alpha', 'beta', 'zeta']);
    });

    it('should sort number values descending', () => {
      // Arrange
      const values = [
        { id: '2', rank: 2 },
        { id: '3', rank: 3 },
        { id: '1', rank: 1 },
      ];

      // Act
      const result = pipe.transform(values, 'rank', 'desc');

      // Assert
      expect(result.map((item) => item.rank)).toEqual([3, 2, 1]);
    });

    it('should not mutate the original array', () => {
      // Arrange
      const values = [
        { id: '2', title: 'zeta' },
        { id: '1', title: 'alpha' },
      ];
      const originalSnapshot = [...values];

      // Act
      pipe.transform(values, 'title', 'asc');

      // Assert
      expect(values).toEqual(originalSnapshot);
    });
  });
});
