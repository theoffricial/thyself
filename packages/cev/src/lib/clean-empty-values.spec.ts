import { cleanEmptyValues } from './clean-empty-values';

describe('cleanEmptyValues', () => {
  it('should clean null values when "null" option is true', () => {
    expect(cleanEmptyValues({ x: null, y: '' }, { null: true })).toEqual(
      { y: '' }
    );
  });

  it('should clean NaN values when "nan" option is true', () => {
    expect(cleanEmptyValues({ x: NaN, y: '' }, { nan: true })).toEqual({
      y: '',
    });
  });

  it('should clean empty strings when "emptyStrings" option is true', () => {
    expect(
      cleanEmptyValues<{ abc: 123 }>({ x: '', y: null }, { emptyStrings: true })
    ).toEqual({ y: null });
  });

  it('should clean empty objects when "emptyObjects" option is true', () => {
    expect(
      cleanEmptyValues({ x: {}, y: null }, { emptyObjects: true })
    ).toEqual({ y: null });
  });

  it('should clean empty arrays when "emptyArrays" option is true', () => {
    expect(cleanEmptyValues({ x: [], y: null }, { emptyArrays: true })).toEqual(
      { y: null }
    );
  });

  it('should clean empty values when multiple options are true', () => {
    expect(
      cleanEmptyValues(
        { x: [], y: null, z: '', a: NaN, b: {} },
        {
          emptyArrays: true,
          emptyObjects: true,
          emptyStrings: true,
          nan: true,
          null: true,
        }
      )
    ).toEqual({});
  });

  it('should clean empty values from nested objects when recursive is true', () => {
    expect(
      cleanEmptyValues(
        { a: { b: { c: [{ d: undefined }] } } },
        { emptyObjects: true, nan: true, emptyArrays: true }
      )
    ).toEqual({});
  });

  describe('cleanInPlace', () => {
    it('should clean null values when "null" option is true and clean in place is true', () => {
      expect(
        cleanEmptyValues(
          { x: null, y: '' },
          { null: true, cleanInPlace: true }
        )
      ).toEqual({ y: '' });
    });

    it('should clean NaN values when "nan" option is true and clean in place is true', () => {
      expect(
        cleanEmptyValues(
          { x: NaN, y: '' },
          { nan: true, cleanInPlace: true }
        )
      ).toEqual({ y: '' });
    });

    it('should clean empty strings when emptyStrings option is true and clean in place is true', () => {
      expect(
        cleanEmptyValues(
          { x: '', y: null },
          { emptyStrings: true, cleanInPlace: true, }
        )
      ).toEqual({ y: null });
    });

    it('should clean empty strings only recursively', () => {
      expect(
        cleanEmptyValues(
          { x: '', y: { z: null, abc: '', zyx: undefined } },
          { emptyStrings: true }
        )
      ).toEqual({ y: { z: null, zyx: undefined } });
    });

    it('should clean empty objects when emptyObjects option is true and clean in place is true', () => {
      expect(
        cleanEmptyValues(
          { x: {}, y: null },
          { emptyObjects: true, cleanInPlace: true }
        )
      ).toEqual({ y: null });
    });

    it('should clean empty arrays when emptyArrays option is true and clean in place is true', () => {
      expect(
        cleanEmptyValues(
          { x: [], y: null },
          { emptyArrays: true, cleanInPlace: true }
        )
      ).toEqual({ y: null });
    });

    it('should clean empty values when multiple options are true and clean in place is true', () => {
      expect(
        cleanEmptyValues(
          { x: [], y: null, z: '', a: NaN, b: {} },
          {
            emptyArrays: true,
            emptyObjects: true,
            emptyStrings: true,
            nan: true,
            null: true,
            cleanInPlace: true,
          }
        )
      ).toEqual({});
    });

    it('should clean empty values from nested objects with nested objects', () => {
      const now = new Date();
      const data = { a: { b: { c: [{ d: undefined }] } }, z: now };
      cleanEmptyValues(data, {
        emptyObjects: true,
        nan: true,
        emptyArrays: true,
        cleanInPlace: true,
      });
      expect(data).toEqual({ z: now });
    });
  });
});
