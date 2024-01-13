# nx-serverless

The complete orchestrator for using Serverless Framework (+v3) with Nx.

## Key Features

**✅ Full support 🚧 Partial support 🗺️ In Roadmap ❌ No support**

- ✅ `serverless offline start` (The Serverless offline plugin) 
- ✅ `serverless print` 
- 🚧 `serverless package`

## Installation

```
// npm
npm install --save-dev nx-serverless
// yarn
yarn add nx-serverless -D -w
// pnpm
pnpm add nx-serverless -D -w
```

## Usage

Run `nx build nx-serverless` to build the library.

## VSCode Nx Debug Setup

TBD

## Roadmap

### Executor (Nx code executor)

- 🗺️ `serverless deploy` 
-  `serverless doctor`

### Generator (Nx code generator)

- 🗺️ Serverless app supporting `serverless.base.ts` on root folder (best for individuals).
- 🗺️ Serverless app supporting internal package to support advanced governance (best for teams).


## Compatibility

Reminder: This is an non-funded funded open-source.

**Legend: 🟢 Tested 🟡 Partially tested 🔴 Not tested**

### Operation Systems

MacOS|Linux|Windows
:-----:|:-----:|:-------:
🟢|🟡|🔴

### Developed with Key Technologies Versions 

Key Technology|Version
:-----:|:-----:
Serverless framework|^3.0.0
Nx|^15.0.0 \| ^16.0.0 \| ^17.0.0
NodeJS|^18.16.1
TypeScript|^4.9.0 \| ^5.0.0 

