# eslint-plugin

An eslint plugin that inspired and based on `@nx/eslint-plugin` with extra rules of flavour for each of the nx supported environments.

![NPM Downloads](https://img.shields.io/npm/dy/%40thyself%2Feslint-plugin)
![Dependents (via libraries.io)](https://img.shields.io/librariesio/dependents/npm/%40thyself%2Feslint-plugin)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/%40thyself/eslint-plugin)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/%40thyself/eslint-plugin)


## Features

* Supports the following environments: `typescript`, `javascript`.

## Install

```bash
# npm
npm i -D @thyself/eslint-plugin@latest
# yarn
yarn add @thyself/eslint-plugin@latest -D
# pnpm
pnpm add @thyself/eslint-plugin@latest -D
```

## Usage

Configure in your `eslint` config:

```json
{
  // ...more options
  "plugins": ["@thyself"],
  // global
  "extends": ["plugin:@thyself/typescript"],
  // OR use in overrides, for mixed environments and/or better control
  "overrides": [
    {
      "files": ["*.ts", "*.tsx"],
      "extends": ["plugin:@thyself/typescript"],
      "rules": {
        // ...more typescript custom rules
      }
    },
    {
      "files": ["*.js", "*.jsx"],
      "extends": ["plugin:@thyself/javascript"],
      "rules": {
        // ...more javascript custom rules
      }
    }
  ]
}
```