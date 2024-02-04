export interface CleanerOptions {
  /**
   * Mutate the passed object and clean in place to save memory. (defaults to false)
   * @default false
   */
  cleanInPlace?: boolean;
  /**
   * If true, empty arrays will be removed from the object
   */
  emptyArrays?: boolean;
  /**
   * If true, empty objects will be removed from the object
   * @default false
   */
  emptyObjects?: boolean;
  /**
   * If true, empty strings will be removed from the object
   * @default false
   */
  emptyStrings?: boolean;
  /**
   * If true, NaN values will be removed from the object
   * @default false
   */
  nan?: boolean;
  /**
   * If true, null values will be removed from the object
   * @default false
   */
  null?: boolean;
  /**
   * If true, undefined values will be removed from the object.
   * @default true
   */
  undefined?: boolean;
}

class Cleaner {
  options: Required<CleanerOptions>;
  constructor(options: CleanerOptions) {
    this.options = {
      cleanInPlace: false,
      emptyArrays: false,
      emptyObjects: false,
      emptyStrings: false,
      nan: false,
      null: false,
      undefined: true,
      ...options,
    };
  }

  clean<T extends Record<string, unknown> | unknown | unknown[]>(
    data: T
  ): Partial<T> | T {
    if (!data) {
      return data;
    }

    if (Array.isArray(data)) {
      return this._cleanArray(data) as T;
    }

    if (this._isObject(data)) {
      return (
        this.options.cleanInPlace
          ? this._cleanObjectInPlace(data)
          : this._cleanObject(data)
      ) as Partial<T>;
    }

    return data;
  }

  private _cleanArray(arr: unknown[]): unknown[] {
    return this.options.cleanInPlace
      ? this._getFilteredArrayInPlace(arr)
      : this._getFilteredArray(arr);
  }

  private _cleanObjectInPlace<T extends Record<string, unknown>>(
    object: T
  ): Partial<T> {
    Object.keys(object).forEach((key) => {
      const value = object[key];

      if (Array.isArray(value)) {
        const mappedArr = this._cleanArray(value);
        if (this._shouldReturnArray(mappedArr))
          (object as Record<string, unknown>)[key] = mappedArr;
        else delete object[key];
      } else if (this._isObject(value)) {
        const subFiltered = this.clean(value);
        if (this._shouldReturnObject(subFiltered)) {
          (object as Record<string, unknown>)[key] = subFiltered;
        } else delete object[key];
      } else {
        if (this._shouldRemoveValue(value)) delete object[key];
      }
    });

    return object;
  }

  private _cleanObject<T extends Record<string, unknown>>(
    object: T
  ): Record<string, unknown> {
    const filtered: Record<string, unknown> = {};

    Object.keys(object).forEach((key) => {
      const value = object[key];

      if (Array.isArray(value)) {
        const mappedArr = this._cleanArray(value);
        if (this._shouldReturnArray(mappedArr)) filtered[key] = mappedArr;
      } else if (this._isObject(value)) {
        const subFiltered = this.clean(value);
        if (this._shouldReturnObject(subFiltered)) filtered[key] = subFiltered;
      } else {
        if (!this._shouldRemoveValue(value)) filtered[key] = value;
      }
    });

    return filtered;
  }

  private _getFilteredArrayInPlace(arr: unknown[]): unknown[] {
    for (let i = arr.length - 1; i >= 0; i--) {
      const item = arr[i];
      const filteredItem = this.clean(item);

      if (this._isObject(filteredItem)) {
        if (this._shouldReturnObject(filteredItem)) arr[i] = filteredItem;
        else arr.splice(i, 1);
      } else if (Array.isArray(filteredItem)) {
        if (this._shouldReturnArray(filteredItem)) arr[i] = filteredItem;
        else arr.splice(i, 1);
      } else if (this._shouldRemoveValue(filteredItem)) arr.splice(i, 1);
    }

    return arr;
  }

  private _getFilteredArray(arr: unknown[]): unknown[] {
    const filteredArr: unknown[] = [];
    arr.forEach((item) => {
      const filteredItem = this.clean(item);
      if (this._isObject(filteredItem)) {
        if (this._shouldReturnObject(filteredItem))
          filteredArr.push(filteredItem);
      } else if (Array.isArray(filteredItem)) {
        if (this._shouldReturnArray(filteredItem))
          filteredArr.push(filteredItem);
      } else if (!this._shouldRemoveValue(filteredItem))
        filteredArr.push(filteredItem);
    });

    return filteredArr;
  }

  private _isObject(value: unknown): value is Record<string, unknown> {
    return Object.prototype.toString.call(value) === '[object Object]';
  }

  private _shouldReturnArray(arr: unknown[]): boolean {
    return !this.options.emptyArrays || arr.length !== 0;
  }

  private _shouldReturnObject(object: Record<string, unknown>): boolean {
    return !this.options.emptyObjects || Object.keys(object).length !== 0;
  }

  private _shouldRemoveValue(value: unknown): boolean {
    if (value === null) {
      return this.options.null;
    }

    if (value === '') {
      return this.options.emptyStrings;
    }

    if (typeof value === 'number' && isNaN(value)) {
      return this.options.nan;
    }

    if (value === undefined) {
      return this.options.undefined;
    }

    return false;
  }
}

export function cleanEmptyValues<
  Explicit = 'no_explicit_defined',
  Inferred = unknown
>(object: Inferred, options: CleanerOptions) {
  return new Cleaner(options).clean(
    object
  ) as Explicit extends 'no_explicit_defined' ? Partial<Inferred> : Explicit;
}
