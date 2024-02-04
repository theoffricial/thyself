# clean-empty-values, or "cev"

Fast object empty values cleaner.

## Features

* Dependency-free, super small and efficient package.
* Supports the following clean-ups: `undefined`, `null`, `NaN`, `empty-strings`, `emptyObjects`, `emptyArrays`.
* Supports a "clean in place" strategy that reduces memory consumption, with the `cleanInPlace` option.
* Supports nested-objects clean-up.
* Advanced TypeScript support for maximum flexibility on development time.
* Both CommonJS and ESM support.

## Install

```bash
# npm
npm i -D @thyself/clean-empty-values
# yarn
yarn add -D @thyself/clean-empty-values
# pnpm
pnpm add @thyself/clean-empty-values -D
```

## Usage

usage examples presented as jest tests for convenience

Simple usage

```ts
// value will be `{ y: null }`.
const value = cleanEmptyValues({ x: '', y: null }, { emptyStrings: true });
// value will be `{ x: '' }`.
const value = cleanEmptyValues({ x: '', y: null }, { null: true });
// value will be `{}`.
const value = cleanEmptyValues({ x: '', y: null }, { null: true, emptyStrings: true }); 

// value will be `{ y: { z: null, zyx: undefined } }`
const value = cleanEmptyValues(
          { x: '', y: { z: null, abc: '', zyx: undefined } },
          { emptyStrings: true }
        );

// value will be `{}`. Using "replaceInPlace" which optimizes memory usage.
const value = cleanEmptyValues({ x: '', y: null }, { null: true, emptyStrings: true, replaceInPlace: true }); 
```

See more examples by reviewing the [unit tests](https://github.com/theoffricial/thyself/blob/main/packages/cev/src/lib/clean-empty-values.spec.ts).


### Advanced TypeScript Support
Provides maximum flexibility and strongly-typed code.

```ts
type MyType = { y: { z: null | number } };
const myValue = cleanEmptyValues<MyType>(
    { x: '', y: { z: null, abc: '' } }, 
    { emptyStrings: true });

myValue.abc // ❌ Type error, `"myValue.abc` is NOT known by the Typescript compiler (tsc)
myValue.z // ✅ "myValue.z" is known by the Typescript compiler (tsc)
myValue.z = 7 // ✅ "myValue.z" can be assigned to number.
myValue.z = "7" // ❌ Type error, "myValue.z" must be assigned to `null | number`
```

## "replaceInPlace" option

This option is considered more advanced, that's why its default value is false.

"replace in place" meaning that instead of creating new helper objects and variables building the "cleaned" object, it does the replace over the original object reference and by that save memory and improves performance.

🚧 _WARNING! If you utilize the original object reference in other places in your code using this option might affect your code, so ensure you know what you're doing._ 🚧