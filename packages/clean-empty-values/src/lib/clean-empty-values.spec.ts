import { cleanEmptyValues } from './clean-empty-values';

describe('cleanEmptyValues', () => {
  it('should clean null values when nullCleaner option is true', () => {
    expect(cleanEmptyValues({ x: null, y: '' }, { nullCleaner: true })).toEqual({ y: '' });
  });

  it('should clean NaN values when nanCleaner option is true', () => {
    expect(cleanEmptyValues({ x: NaN, y: '' }, { nanCleaner: true })).toEqual({ y: '' });
  });

  it('should clean empty strings when emptyStringsCleaner option is true', () => {
    expect(cleanEmptyValues<{ abc: 123 }>({ x: '', y: null }, { emptyStrings: true })).toEqual({ y: null });
  });

  it('should clean empty objects when emptyObjectsCleaner option is true', () => {
    expect(cleanEmptyValues({ x: {}, y: null }, { emptyObjects: true })).toEqual({ y: null });
  });

  it('should clean empty arrays when emptyArraysCleaner option is true', () => {
    expect(cleanEmptyValues({ x: [], y: null }, { emptyArrays: true })).toEqual({ y: null });
  });

  it('should clean empty values when multiple options are true', () => {
    expect(cleanEmptyValues({ x: [], y: null, z: '', a: NaN, b: {} }, { emptyArrays: true, emptyObjects: true, emptyStrings: true, nanCleaner: true, nullCleaner: true })).toEqual({});
  });

  it('should clean empty values from nested objects when recursive is true', () => {
    expect(cleanEmptyValues({ a: { b: { c: [{ d: undefined }] } } }, { emptyObjects: true, nanCleaner: true, emptyArrays: true })).toEqual({});
  });

  describe('cleanInPlace', () => {

    it('should clean null values when nullCleaner option is true and clean in place is true', () => {
      expect(cleanEmptyValues({ x: null, y: '' }, { nullCleaner: true, cleanInPlace: true })).toEqual({ y: '' });
    });

    it('should clean NaN values when nanCleaner option is true and clean in place is true', () => {
      expect(cleanEmptyValues({ x: NaN, y: '' }, { nanCleaner: true, cleanInPlace: true })).toEqual({ y: '' });
    });

    it('should clean empty strings when emptyStringsCleaner option is true and clean in place is true', () => {
      expect(cleanEmptyValues({ x: '', y: null }, { emptyStrings: true, cleanInPlace: true })).toEqual({ y: null });
    });

    it('should clean empty objects when emptyObjectsCleaner option is true and clean in place is true', () => {
      expect(cleanEmptyValues({ x: {}, y: null }, { emptyObjects: true, cleanInPlace: true })).toEqual({ y: null });
    });

    it('should clean empty arrays when emptyArraysCleaner option is true and clean in place is true', () => {
      expect(cleanEmptyValues({ x: [], y: null }, { emptyArrays: true, cleanInPlace: true })).toEqual({ y: null });
    });

    it('should clean empty values when multiple options are true and clean in place is true', () => {
      expect(cleanEmptyValues({ x: [], y: null, z: '', a: NaN, b: {} }, { emptyArrays: true, emptyObjects: true, emptyStrings: true, nanCleaner: true, nullCleaner: true, cleanInPlace: true })).toEqual({});
    });

    it('should clean empty values from nested objects with nested objects', () => {
      const now = new Date();
      const data = { a: { b: { c: [{ d: undefined }] } }, z: now };
      cleanEmptyValues(data, { emptyObjects: true, nanCleaner: true, emptyArrays: true, cleanInPlace: true });
      expect(data).toEqual({ z: now });
    });
  });


});
